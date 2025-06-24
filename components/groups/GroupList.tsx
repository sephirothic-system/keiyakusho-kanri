'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Users, 
  Edit, 
  Trash2, 
  UserPlus,
  Shield,
  Calendar,
  Folder,
  UserMinus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Group } from '@/app/groups/page'

interface GroupListProps {
  groups: Group[]
  onEdit: (group: Group) => void
  onDelete: (id: string) => void
  onManageMembers: (group: Group) => void
  onRemoveMember: (groupId: string, userId: string) => void
}

export function GroupList({ 
  groups, 
  onEdit, 
  onDelete, 
  onManageMembers,
  onRemoveMember 
}: GroupListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission) {
      case 'WRITE': return 'bg-green-100 text-green-800'
      case 'READ': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>グループがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const memberCount = group._count?.userGroups || 0
        const directoryCount = group._count?.directoryAccess || 0
        const hasMembers = memberCount > 0
        const hasDirectoryAccess = directoryCount > 0

        return (
          <Card key={group.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {group.name}
                      </h3>
                      {group.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {group.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 統計情報 */}
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{memberCount} メンバー</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Folder className="h-4 w-4" />
                      <span>{directoryCount} ディレクトリ</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>作成: {formatDate(group.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className="flex items-center space-x-1 ml-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onManageMembers(group)}
                          className="h-8 w-8 p-0"
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>メンバーを管理</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(group)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>編集</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(group.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          disabled={hasMembers || hasDirectoryAccess}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {hasMembers 
                            ? 'メンバーが存在するため削除できません' 
                            : hasDirectoryAccess 
                            ? 'ディレクトリアクセス権限が存在するため削除できません'
                            : '削除'
                          }
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* メンバー一覧 */}
              {group.userGroups && group.userGroups.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    メンバー ({group.userGroups.length}人)
                  </h4>
                  <div className="space-y-2">
                    {group.userGroups.slice(0, 3).map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {member.user.name?.charAt(0) || member.user.email.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {member.user.name || member.user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              参加: {formatDate(member.joinedAt)}
                            </p>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveMember(group.id, member.user.id)}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <UserMinus className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>メンバーを削除</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                    {group.userGroups.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center py-1">
                        他 {group.userGroups.length - 3} 人
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ディレクトリアクセス権限 */}
              {group.directoryAccess && group.directoryAccess.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    ディレクトリアクセス権限 ({group.directoryAccess.length}件)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.directoryAccess.slice(0, 4).map((access) => (
                      <Badge
                        key={access.id}
                        className={cn("text-xs", getPermissionBadgeColor(access.permission))}
                      >
                        {access.directory.name} ({access.permission})
                      </Badge>
                    ))}
                    {group.directoryAccess.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{group.directoryAccess.length - 4} 件
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* メンバーもディレクトリアクセス権限もない場合 */}
              {(!group.userGroups || group.userGroups.length === 0) && 
               (!group.directoryAccess || group.directoryAccess.length === 0) && (
                <div className="text-center py-6 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">メンバーとアクセス権限が設定されていません</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManageMembers(group)}
                    className="mt-2 gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    メンバーを追加
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 