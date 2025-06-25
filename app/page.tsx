'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FolderOpen, Plus, Shield } from 'lucide-react'
import StatsCards from '@/components/dashboard/StatsCards'
import RecentContractsList from '@/components/contracts/RecentContractsList'

interface UserInfo {
  id: string
  email: string
  name: string | null
  isAdmin: boolean
  isActive: boolean
  createdAt: string
}

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  // ユーザー情報を取得（管理者フラグ含む）
  useEffect(() => {
    if (status === 'loading' || !session) return

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUserInfo(data.user)
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    fetchUserInfo()
  }, [session, status])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  const handleCreateContract = () => {
    router.push('/contracts/new')
  }

  const handleManageDirectories = () => {
    router.push('/directories')
  }

  const handleManageGroups = () => {
    router.push('/groups')
  }
  

  const handleManagePermissions = () => {
    router.push('/admin/permissions')
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                契約書管理システム
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                ようこそ、{session?.user?.name || session?.user?.email}さん
              </p>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="text-gray-700 hover:text-gray-900"
            >
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* 統計カード */}
          <div className="mb-8">
            <StatsCards />
          </div>

          {/* クイックアクション */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">クイックアクション</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card 
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={handleCreateContract}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Plus className="mr-2 h-5 w-5" />
                    新しい契約書を作成
                  </CardTitle>
                  <CardDescription>新しい契約書を作成して管理を開始</CardDescription>
                </CardHeader>
              </Card>
              <Card 
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={handleManageDirectories}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <FolderOpen className="mr-2 h-5 w-5" />
                    ディレクトリを管理
                  </CardTitle>
                  <CardDescription>契約書を整理するためのフォルダを管理</CardDescription>
                </CardHeader>
              </Card>
              <Card 
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={handleManageGroups}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Users className="mr-2 h-5 w-5" />
                    グループを管理
                  </CardTitle>
                  <CardDescription>チームメンバーとアクセス権限を管理</CardDescription>
                </CardHeader>
              </Card>
              {/* 管理者のみ表示 */}
              {userInfo?.isAdmin && (
                <Card 
                  className="cursor-pointer transition-colors hover:bg-gray-50 border-orange-200 bg-orange-50"
                  onClick={handleManagePermissions}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-base text-orange-800">
                      <Shield className="mr-2 h-5 w-5" />
                      権限管理
                    </CardTitle>
                    <CardDescription className="text-orange-700">
                      グループごとのディレクトリアクセス権限を管理 (管理者のみ)
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

            </div>
          </div>

          {/* 直近編集した契約書 */}
          <div>
            <RecentContractsList />
          </div>
        </div>
      </main>
    </div>
  )
}
