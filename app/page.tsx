'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, FolderOpen, Plus } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
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
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総契約書数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">前月比 +0%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">アクティブ契約</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">現在有効な契約書</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ディレクトリ数</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">整理されたフォルダ</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">参加グループ</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">アクセス可能なグループ</p>
              </CardContent>
            </Card>
          </div>

          {/* クイックアクション */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">クイックアクション</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="cursor-pointer transition-colors hover:bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Plus className="mr-2 h-5 w-5" />
                    新しい契約書を作成
                  </CardTitle>
                  <CardDescription>新しい契約書を作成して管理を開始</CardDescription>
                </CardHeader>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <FolderOpen className="mr-2 h-5 w-5" />
                    ディレクトリを管理
                  </CardTitle>
                  <CardDescription>契約書を整理するためのフォルダを管理</CardDescription>
                </CardHeader>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-base">
                    <Users className="mr-2 h-5 w-5" />
                    グループを管理
                  </CardTitle>
                  <CardDescription>チームメンバーとアクセス権限を管理</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* 最近の活動 */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">最近の活動</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">アクティビティがありません</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    契約書を作成すると、ここに最近の活動が表示されます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
