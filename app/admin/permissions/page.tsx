'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PermissionManagement from '@/components/admin/PermissionManagement'

interface UserInfo {
  id: string
  email: string
  name: string | null
  isAdmin: boolean
  isActive: boolean
  createdAt: string
}

export default function AdminPermissionsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    // ユーザー情報（管理者フラグ含む）を取得
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (!response.ok) {
          throw new Error('ユーザー情報の取得に失敗しました')
        }
        
        const data = await response.json()
        setUserInfo(data.user)
        
        // 管理者でない場合はトップページにリダイレクト
        if (!data.user.isAdmin) {
          router.push('/')
          return
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [session, status, router])

  // セッション読み込み中
  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">認証情報を確認中...</div>
      </div>
    )
  }

  // 管理者でない場合（リダイレクト処理中）
  if (!userInfo?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">アクセス権限を確認中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                トップページに戻る
              </Button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  管理者メニュー
                </h1>
                <p className="text-sm text-gray-600">
                  {userInfo.name || userInfo.email} (管理者)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PermissionManagement />
        </div>
      </main>
    </div>
  )
}