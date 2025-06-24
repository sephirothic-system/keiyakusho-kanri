'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Folder, 
  FolderOpen, 
  Edit, 
  Trash2, 
  Plus, 
  ChevronRight, 
  ChevronDown,
  FileText,
  Info,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Directory } from '@/app/directories/page'

interface DirectoryTreeProps {
  directories: Directory[]
  onEdit: (directory: Directory) => void
  onDelete: (id: string) => void
  onCreateChild: (parentId: string) => void
  onViewContracts: (directoryId: string) => void
  level?: number
}

interface DirectoryNodeProps {
  directory: Directory
  onEdit: (directory: Directory) => void
  onDelete: (id: string) => void
  onCreateChild: (parentId: string) => void
  onViewContracts: (directoryId: string) => void
  level: number
}

function DirectoryNode({ directory, onEdit, onDelete, onCreateChild, onViewContracts, level }: DirectoryNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = directory.children && directory.children.length > 0
  const contractCount = directory.contracts?.length || 0

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'DRAFT': return 'bg-gray-100 text-gray-800'
      case 'REVIEW': return 'bg-yellow-100 text-yellow-800'
      case 'EXPIRED': return 'bg-red-100 text-red-800'
      case 'TERMINATED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-1">
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md",
        level === 0 ? "border-l-4 border-l-blue-500" : ""
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* 展開/折りたたみボタン */}
              <div 
                className="flex items-center cursor-pointer select-none"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ paddingLeft: `${level * 20}px` }}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground mr-1" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground mr-1" />
                  )
                ) : (
                  <div className="w-5 mr-1" />
                )}
                
                {isExpanded || !hasChildren ? (
                  <FolderOpen className="h-5 w-5 text-blue-600 mr-2" />
                ) : (
                  <Folder className="h-5 w-5 text-blue-600 mr-2" />
                )}
              </div>

              {/* ディレクトリ情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {directory.name}
                  </h3>
                  
                  {/* 契約書数バッジ */}
                  {contractCount > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <FileText className="h-3 w-3" />
                            {contractCount}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>契約書 {contractCount} 件</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {/* 子ディレクトリ数 */}
                  {hasChildren && (
                    <Badge variant="outline" className="text-xs">
                      {directory.children!.length} folders
                    </Badge>
                  )}
                </div>
                
                {/* パス表示 */}
                <p className="text-sm text-muted-foreground font-mono truncate">
                  /{directory.path}
                </p>
                
                {/* 説明 */}
                {directory.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {directory.description}
                  </p>
                )}

                {/* 契約書ステータス一覧 */}
                {directory.contracts && directory.contracts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {directory.contracts.slice(0, 3).map((contract) => (
                      <Badge
                        key={contract.id}
                        className={cn("text-xs", getStatusBadgeColor(contract.status))}
                      >
                        {contract.title.length > 15 
                          ? `${contract.title.substring(0, 15)}...` 
                          : contract.title
                        }
                      </Badge>
                    ))}
                    {directory.contracts.length > 3 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="text-xs cursor-help">
                              +{directory.contracts.length - 3}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              {directory.contracts.slice(3).map((contract) => (
                                <p key={contract.id} className="text-xs">
                                  {contract.title}
                                </p>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex items-center space-x-1 ml-4">
              {contractCount > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewContracts(directory.id)}
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>契約書一覧を見る</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCreateChild(directory.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>子ディレクトリを作成</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(directory)}
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
                      onClick={() => onDelete(directory.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      disabled={contractCount > 0 || hasChildren}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {contractCount > 0 
                        ? '契約書が存在するため削除できません' 
                        : hasChildren 
                        ? '子ディレクトリが存在するため削除できません'
                        : '削除'
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 子ディレクトリ */}
      {hasChildren && isExpanded && (
        <div className="ml-4 space-y-1">
          {directory.children!.map((child) => (
            <DirectoryNode
              key={child.id}
              directory={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onCreateChild={onCreateChild}
              onViewContracts={onViewContracts}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function DirectoryTree({ 
  directories, 
  onEdit, 
  onDelete, 
  onCreateChild,
  onViewContracts,
  level = 0 
}: DirectoryTreeProps) {
  if (directories.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>ディレクトリがありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {directories.map((directory) => (
        <DirectoryNode
          key={directory.id}
          directory={directory}
          onEdit={onEdit}
          onDelete={onDelete}
          onCreateChild={onCreateChild}
          onViewContracts={onViewContracts}
          level={level}
        />
      ))}
    </div>
  )
} 