'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { UserPlus, Users, Mail, Calendar, User } from 'lucide-react'
import type { Group, User as UserType } from '@/app/groups/page'

interface MemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: Group
  availableUsers: UserType[]
  onAddMember: (userId: string) => void
}

export function MemberDialog({
  open,
  onOpenChange,
  group,
  availableUsers,
  onAddMember,
}: MemberDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddMember = async () => {
    if (!selectedUserId) return

    setIsSubmitting(true)
    try {
      await onAddMember(selectedUserId)
      setSelectedUserId('')
    } catch (error) {
      // エラーは親コンポーネントで処理される
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getUserDisplayName = (user: UserType) => {
    return user.name || user.email
  }

  const handleClose = () => {
    setSelectedUserId('')
    onOpenChange(false)
  }

  const currentMembers = group.userGroups || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            メンバー管理: {group.name}
          </DialogTitle>
          <DialogDescription>
            グループにメンバーを追加・削除します。メンバーは、このグループに設定されたディレクトリアクセス権限を継承します。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 新しいメンバーを追加 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              新しいメンバーを追加
            </h3>
            
            {availableUsers.length > 0 ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="ユーザーを選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {user.name?.charAt(0) || user.email.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{getUserDisplayName(user)}</span>
                              {user.name && (
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddMember}
                  disabled={!selectedUserId || isSubmitting}
                  className="gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  {isSubmitting ? '追加中...' : '追加'}
                </Button>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground bg-muted rounded-md">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">追加可能なユーザーがいません</p>
                <p className="text-xs">全てのユーザーが既にこのグループのメンバーです</p>
              </div>
            )}
          </div>

          <Separator />

          {/* 現在のメンバー一覧 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                現在のメンバー
              </h3>
              <Badge variant="secondary">
                {currentMembers.length} 人
              </Badge>
            </div>

            {currentMembers.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {currentMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {member.user.name?.charAt(0) || member.user.email.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">
                            {getUserDisplayName(member.user)}
                          </p>
                          {!member.user.isActive && (
                            <Badge variant="secondary" className="text-xs">
                              無効
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{member.user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>参加: {formatDate(member.joinedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground bg-muted rounded-md">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">メンバーがいません</p>
                <p className="text-xs">上記からユーザーを追加してください</p>
              </div>
            )}
          </div>

          {/* グループ情報 */}
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">グループ情報</h4>
            <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-3 rounded-md">
              <div>
                <span className="font-medium">作成日:</span> {formatDate(group.createdAt)}
              </div>
              <div>
                <span className="font-medium">ディレクトリ権限:</span> {group._count?.directoryAccess || 0}件
              </div>
            </div>
            {group.description && (
              <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                <span className="font-medium">説明:</span> {group.description}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleClose} variant="outline">
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 