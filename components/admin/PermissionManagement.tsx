'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Trash2, Plus, Shield, Users, FolderOpen } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface DirectoryAccess {
  id: string
  directoryId: string
  groupId: string
  permission: 'READ' | 'WRITE'
  directory: {
    id: string
    name: string
    path: string
  }
  group: {
    id: string
    name: string
    _count: {
      userGroups: number
    }
  }
}

interface Directory {
  id: string
  name: string
  path: string
}

interface Group {
  id: string
  name: string
  _count: {
    userGroups: number
  }
}

export default function PermissionManagement() {
  const [directoryAccesses, setDirectoryAccesses] = useState<DirectoryAccess[]>([])
  const [directories, setDirectories] = useState<Directory[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // 新規権限付与フォーム
  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedPermission, setSelectedPermission] = useState<'READ' | 'WRITE'>('READ')
  
  const { toast } = useToast()

  // データの読み込み
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // 並列でデータを取得
      const [accessesRes, directoriesRes, groupsRes] = await Promise.all([
        fetch('/api/admin/directory-access'),
        fetch('/api/directories'),
        fetch('/api/groups'),
      ])

      if (!accessesRes.ok || !directoriesRes.ok || !groupsRes.ok) {
        throw new Error('データの取得に失敗しました')
      }

      const [accessesData, directoriesData, groupsData] = await Promise.all([
        accessesRes.json(),
        directoriesRes.json(),
        groupsRes.json(),
      ])

      setDirectoryAccesses(accessesData.directoryAccesses || [])
      setDirectories(directoriesData.directories || [])
      setGroups(groupsData.groups || [])
    } catch (error) {
      console.error('Data loading error:', error)
      toast({
        title: 'エラー',
        description: 'データの読み込みに失敗しました',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // 権限付与
  const handleGrantPermission = async () => {
    if (!selectedDirectory || !selectedGroup) {
      toast({
        title: 'エラー',
        description: 'ディレクトリとグループを選択してください',
        variant: 'destructive',
      })
      return
    }

    try {
      setSaving(true)
      
      const response = await fetch('/api/admin/directory-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directoryId: selectedDirectory,
          groupId: selectedGroup,
          permission: selectedPermission.toUpperCase(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '権限の付与に失敗しました')
      }

      toast({
        title: '成功',
        description: '権限を付与しました',
      })

      // フォームをリセット
      setSelectedDirectory('')
      setSelectedGroup('')
      setSelectedPermission('READ')

      // データを再読み込み
      await loadData()
    } catch (error) {
      console.error('Grant permission error:', error)
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '権限の付与に失敗しました',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  // 権限削除
  const handleRevokePermission = async (directoryId: string, groupId: string) => {
    if (!confirm('この権限を削除してもよろしいですか？')) {
      return
    }

    try {
      const response = await fetch(
        `/api/admin/directory-access?directoryId=${directoryId}&groupId=${groupId}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '権限の削除に失敗しました')
      }

      toast({
        title: '成功',
        description: '権限を削除しました',
      })

      // データを再読み込み
      await loadData()
    } catch (error) {
      console.error('Revoke permission error:', error)
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '権限の削除に失敗しました',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">権限データを読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">権限管理</h1>
          <p className="mt-2 text-gray-600">
            グループごとのディレクトリアクセス権限を管理します
          </p>
        </div>
        <Shield className="h-8 w-8 text-gray-400" />
      </div>

      {/* 新規権限付与フォーム */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            新しい権限を付与
          </CardTitle>
          <CardDescription>
            グループに対してディレクトリへのアクセス権限を付与します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium text-gray-700">ディレクトリ</label>
              <Select value={selectedDirectory} onValueChange={setSelectedDirectory}>
                <SelectTrigger>
                  <SelectValue placeholder="ディレクトリを選択" />
                </SelectTrigger>
                <SelectContent>
                  {directories.map((directory) => (
                    <SelectItem key={directory.id} value={directory.id}>
                      <div className="flex items-center">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        {directory.path}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">グループ</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="グループを選択" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {group.name}
                        </div>
                        <span className="text-xs text-gray-500">
                          {group._count.userGroups}名
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">権限レベル</label>
              <Select 
                value={selectedPermission.toLowerCase()} 
                onValueChange={(value) => setSelectedPermission(value.toUpperCase() as 'READ' | 'WRITE')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">READ (閲覧のみ)</SelectItem>
                  <SelectItem value="write">WRITE (閲覧・編集)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleGrantPermission}
                disabled={saving || !selectedDirectory || !selectedGroup}
                className="w-full"
              >
                {saving ? '付与中...' : '権限を付与'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 現在の権限一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>現在の権限設定</CardTitle>
          <CardDescription>
            設定済みのディレクトリアクセス権限の一覧です
          </CardDescription>
        </CardHeader>
        <CardContent>
          {directoryAccesses.length === 0 ? (
            <Alert>
              <AlertDescription>
                まだ権限が設定されていません。上記のフォームから権限を付与してください。
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {directoryAccesses.map((access) => (
                <div 
                  key={access.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{access.directory.name}</div>
                        <div className="text-sm text-gray-500">{access.directory.path}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{access.group.name}</div>
                        <div className="text-sm text-gray-500">
                          {access.group._count.userGroups}名のメンバー
                        </div>
                      </div>
                    </div>

                    <Badge 
                      variant={access.permission === 'WRITE' ? 'default' : 'secondary'}
                    >
                      {access.permission === 'READ' ? 'READ (閲覧のみ)' : 'WRITE (閲覧・編集)'}
                    </Badge>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevokePermission(access.directoryId, access.groupId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}