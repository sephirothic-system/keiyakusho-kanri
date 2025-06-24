'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Shield, 
  Home, 
  FolderOpen, 
  Users, 
  Plus,
  Trash2,
  Edit,
  Key
} from 'lucide-react'

interface Directory {
  id: string
  name: string
  path: string
  description?: string | null
}

interface Group {
  id: string
  name: string
  description?: string | null
  _count?: {
    userGroups: number
  }
}

interface DirectoryAccess {
  id: string
  permission: 'READ' | 'WRITE'
  createdAt: string
  directory: Directory
  group: Group
}

interface User {
  id: string
  name?: string | null
  email: string
  isActive: boolean
}

interface GroupMember {
  id: string
  joinedAt: string
  user: User
}

interface GroupWithMembers extends Group {
  userGroups?: GroupMember[]
}

export default function PermissionsPage() {
  const router = useRouter()
  const [directories, setDirectories] = useState<Directory[]>([])
  const [groups, setGroups] = useState<GroupWithMembers[]>([])
  const [directoryAccess, setDirectoryAccess] = useState<DirectoryAccess[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDirectory, setSelectedDirectory] = useState<string>('')
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [selectedPermission, setSelectedPermission] = useState<'READ' | 'WRITE'>('READ')

  // データを取得
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [dirResponse, groupResponse, accessResponse] = await Promise.all([
        fetch('/api/directories'),
        fetch('/api/groups'),
        fetch('/api/permissions/directory-access')
      ])

      if (!dirResponse.ok || !groupResponse.ok || !accessResponse.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const [dirData, groupData, accessData] = await Promise.all([
        dirResponse.json(),
        groupResponse.json(),
        accessResponse.json()
      ])

      setDirectories(dirData.directories || [])
      setGroups(groupData.groups || [])
      setDirectoryAccess(accessData.directoryAccess || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // アクセス権限を追加
  const handleAddAccess = async () => {
    if (!selectedDirectory || !selectedGroup) {
      toast.error('ディレクトリとグループを選択してください')
      return
    }

    try {
      const response = await fetch('/api/permissions/directory-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directoryId: selectedDirectory,
          groupId: selectedGroup,
          permission: selectedPermission.toUpperCase()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'アクセス権限の追加に失敗しました')
      }

      toast.success('アクセス権限を追加しました')
      await fetchData()
      
      // フォームをリセット
      setSelectedDirectory('')
      setSelectedGroup('')
      setSelectedPermission('READ')
    } catch (error) {
      console.error('Error adding access:', error)
      toast.error(error instanceof Error ? error.message : 'アクセス権限の追加に失敗しました')
    }
  }

  // アクセス権限を削除
  const handleRemoveAccess = async (accessId: string) => {
    if (!confirm('このアクセス権限を削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/permissions/directory-access/${accessId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'アクセス権限の削除に失敗しました')
      }

      toast.success('アクセス権限を削除しました')
      await fetchData()
    } catch (error) {
      console.error('Error removing access:', error)
      toast.error(error instanceof Error ? error.message : 'アクセス権限の削除に失敗しました')
    }
  }

  // アクセス権限を更新
  const handleUpdateAccess = async (accessId: string, newPermission: 'READ' | 'WRITE') => {
    try {
      const response = await fetch(`/api/permissions/directory-access/${accessId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          permission: newPermission.toUpperCase()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'アクセス権限の更新に失敗しました')
      }

      toast.success('アクセス権限を更新しました')
      await fetchData()
    } catch (error) {
      console.error('Error updating access:', error)
      toast.error(error instanceof Error ? error.message : 'アクセス権限の更新に失敗しました')
    }
  }

  // 権限バッジの色を取得
  const getPermissionBadgeColor = (permission: string) => {
    return permission === 'WRITE' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

  // 権限の日本語表示
  const getPermissionLabel = (permission: string) => {
    return permission === 'WRITE' ? '書き込み' : '読み取り'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            ホーム
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">権限管理</h1>
            <p className="text-muted-foreground">
              ディレクトリのアクセス権限とグループの権限を管理します
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/groups')}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            グループ管理
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/directories')}
            className="gap-2"
          >
            <FolderOpen className="h-4 w-4" />
            ディレクトリ管理
          </Button>
        </div>
      </div>

      {/* アクセス権限追加フォーム */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            新しいアクセス権限を追加
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">ディレクトリ</label>
              <Select value={selectedDirectory} onValueChange={setSelectedDirectory}>
                <SelectTrigger>
                  <SelectValue placeholder="ディレクトリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {directories.map((dir) => (
                    <SelectItem key={dir.id} value={dir.id}>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4" />
                        {dir.name} ({dir.path})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">グループ</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="グループを選択" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {group.name}
                        {group._count && (
                          <span className="text-xs text-muted-foreground">
                            ({group._count.userGroups}人)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">権限</label>
              <Select value={selectedPermission} onValueChange={(value) => setSelectedPermission(value as 'READ' | 'WRITE')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="READ">読み取り</SelectItem>
                  <SelectItem value="WRITE">書き込み</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddAccess} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                追加
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 現在のアクセス権限一覧 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            現在のアクセス権限
            <span className="text-sm font-normal text-muted-foreground">
              （{directoryAccess.length}件）
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {directoryAccess.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                アクセス権限が設定されていません
              </h3>
              <p className="text-muted-foreground mb-4">
                上記のフォームから新しいアクセス権限を追加してください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {directoryAccess.map((access) => (
                <div
                  key={access.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{access.directory.name}</span>
                          <span className="text-sm text-muted-foreground">({access.directory.path})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{access.group.name}</span>
                        </div>
                        <Badge className={getPermissionBadgeColor(access.permission)}>
                          {getPermissionLabel(access.permission)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        作成日時: {new Date(access.createdAt).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={access.permission}
                        onValueChange={(value) => handleUpdateAccess(access.id, value as 'READ' | 'WRITE')}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="READ">読み取り</SelectItem>
                          <SelectItem value="WRITE">書き込み</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveAccess(access.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* グループ概要 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            グループ概要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="cursor-pointer hover:bg-accent/50" onClick={() => router.push('/groups')}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">メンバー</div>
                      <div className="text-lg font-semibold">
                        {group._count?.userGroups || 0}人
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}