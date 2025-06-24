'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GroupList } from '@/components/groups/GroupList'
import { GroupDialog } from '@/components/groups/GroupDialog'
import { MemberDialog } from '@/components/groups/MemberDialog'
import { toast } from 'sonner'
import { Plus, Users, Home } from 'lucide-react'

export interface User {
  id: string
  name: string | null
  email: string
  createdAt: string
  _count?: {
    userGroups: number
    ownedContracts: number
  }
}

export interface DirectoryAccess {
  id: string
  permission: 'READ' | 'WRITE'
  createdAt: string
  directory: {
    id: string
    name: string
    path: string
    description: string | null
  }
}

export interface GroupMember {
  id: string
  joinedAt: string
  user: {
    id: string
    name: string | null
    email: string
    isActive: boolean
  }
}

export interface Group {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt?: string
  _count?: {
    userGroups: number
    directoryAccess: number
  }
  userGroups?: GroupMember[]
  directoryAccess?: DirectoryAccess[]
}

export default function GroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // グループ一覧を取得
  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups')
      if (!response.ok) throw new Error('Failed to fetch groups')
      
      const data = await response.json()
      setGroups(data.groups || [])
    } catch (error) {
      console.error('Error fetching groups:', error)
      toast.error('グループの取得に失敗しました')
    }
  }

  // ユーザー一覧を取得
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('ユーザーの取得に失敗しました')
    }
  }

  // 初期読み込み
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([fetchGroups(), fetchUsers()])
      setIsLoading(false)
    }
    fetchInitialData()
  }, [])

  // グループ作成
  const handleCreateGroup = async (data: { name: string; description?: string }) => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'グループの作成に失敗しました')
      }

      toast.success('グループを作成しました')
      await fetchGroups()
      setIsGroupDialogOpen(false)
    } catch (error) {
      console.error('Error creating group:', error)
      toast.error(error instanceof Error ? error.message : 'グループの作成に失敗しました')
    }
  }

  // グループ更新
  const handleUpdateGroup = async (id: string, data: { name: string; description?: string }) => {
    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'グループの更新に失敗しました')
      }

      toast.success('グループを更新しました')
      await fetchGroups()
      setIsGroupDialogOpen(false)
      setSelectedGroup(null)
    } catch (error) {
      console.error('Error updating group:', error)
      toast.error(error instanceof Error ? error.message : 'グループの更新に失敗しました')
    }
  }

  // グループ削除
  const handleDeleteGroup = async (id: string) => {
    if (!confirm('このグループを削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/groups/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'グループの削除に失敗しました')
      }

      toast.success('グループを削除しました')
      await fetchGroups()
    } catch (error) {
      console.error('Error deleting group:', error)
      toast.error(error instanceof Error ? error.message : 'グループの削除に失敗しました')
    }
  }

  // メンバー追加
  const handleAddMember = async (groupId: string, userId: string) => {
    try {
      const response = await fetch(`/api/groups/${groupId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの追加に失敗しました')
      }

      toast.success('メンバーを追加しました')
      await fetchGroups()
      setIsMemberDialogOpen(false)
    } catch (error) {
      console.error('Error adding member:', error)
      toast.error(error instanceof Error ? error.message : 'メンバーの追加に失敗しました')
    }
  }

  // メンバー削除
  const handleRemoveMember = async (groupId: string, userId: string) => {
    if (!confirm('このメンバーをグループから削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/groups/${groupId}/members?userId=${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの削除に失敗しました')
      }

      toast.success('メンバーを削除しました')
      await fetchGroups()
    } catch (error) {
      console.error('Error removing member:', error)
      toast.error(error instanceof Error ? error.message : 'メンバーの削除に失敗しました')
    }
  }

  // 新規作成ダイアログを開く
  const openCreateDialog = () => {
    setSelectedGroup(null)
    setIsEditing(false)
    setIsGroupDialogOpen(true)
  }

  // 編集ダイアログを開く
  const openEditDialog = (group: Group) => {
    setSelectedGroup(group)
    setIsEditing(true)
    setIsGroupDialogOpen(true)
  }

  // メンバー管理ダイアログを開く
  const openMemberDialog = (group: Group) => {
    setSelectedGroup(group)
    setIsMemberDialogOpen(true)
  }

  // グループに属していないユーザーを取得
  const getAvailableUsers = (group: Group): User[] => {
    const memberUserIds = group.userGroups?.map(ug => ug.user.id) || []
    return users.filter(user => !memberUserIds.includes(user.id))
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
            <h1 className="text-3xl font-bold tracking-tight">グループ管理</h1>
            <p className="text-muted-foreground">
              ユーザーグループとアクセス権限を管理します
            </p>
          </div>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          新規作成
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            グループ一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                グループがありません
              </h3>
              <p className="text-muted-foreground mb-4">
                最初のグループを作成してください
              </p>
              <Button onClick={openCreateDialog} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                グループを作成
              </Button>
            </div>
          ) : (
            <GroupList
              groups={groups}
              onEdit={openEditDialog}
              onDelete={handleDeleteGroup}
              onManageMembers={openMemberDialog}
              onRemoveMember={handleRemoveMember}
            />
          )}
        </CardContent>
      </Card>

      <GroupDialog
        open={isGroupDialogOpen}
        onOpenChange={setIsGroupDialogOpen}
        group={isEditing ? selectedGroup : null}
        onSubmit={isEditing ? 
          (data: { name: string; description?: string }) => selectedGroup && handleUpdateGroup(selectedGroup.id, data) :
          handleCreateGroup
        }
      />

      {selectedGroup && (
        <MemberDialog
          open={isMemberDialogOpen}
          onOpenChange={setIsMemberDialogOpen}
          group={selectedGroup}
          availableUsers={getAvailableUsers(selectedGroup)}
          onAddMember={(userId: string) => handleAddMember(selectedGroup.id, userId)}
        />
      )}
    </div>
  )
} 