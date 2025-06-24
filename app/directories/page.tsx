'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DirectoryTree } from '@/components/directories/DirectoryTree'
import { DirectoryDialog } from '@/components/directories/DirectoryDialog'
import { toast } from 'sonner'
import { Plus, Folder, Home } from 'lucide-react'

export interface Directory {
  id: string
  name: string
  path: string
  description?: string | null
  parentId?: string | null
  children?: Directory[]
  contracts?: Array<{ id: string; title: string; status: string }>
  createdAt?: string
  updatedAt?: string
}

export default function DirectoriesPage() {
  const router = useRouter()
  const [directories, setDirectories] = useState<Directory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // ディレクトリ一覧を取得
  const fetchDirectories = async () => {
    try {
      const response = await fetch('/api/directories')
      if (!response.ok) throw new Error('Failed to fetch directories')
      
      const data = await response.json()
      setDirectories(buildDirectoryTree(data.directories || []))
    } catch (error) {
      console.error('Error fetching directories:', error)
      toast.error('ディレクトリの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // 初期読み込み
  useEffect(() => {
    fetchDirectories()
  }, [])

  // フラットなディレクトリリストから階層構造を構築
  const buildDirectoryTree = (directories: Directory[]): Directory[] => {
    const directoryMap = new Map<string, Directory>()
    const rootDirectories: Directory[] = []

    // まずすべてのディレクトリをマップに追加
    directories.forEach(dir => {
      directoryMap.set(dir.id, { ...dir, children: [] })
    })

    // 親子関係を構築
    directories.forEach(dir => {
      const directory = directoryMap.get(dir.id)!
      if (dir.parentId) {
        const parent = directoryMap.get(dir.parentId)
        if (parent) {
          parent.children = parent.children || []
          parent.children.push(directory)
        }
      } else {
        rootDirectories.push(directory)
      }
    })

    return rootDirectories
  }

  // ディレクトリ作成
  const handleCreateDirectory = async (data: { name: string; description?: string; parentId?: string }) => {
    try {
      const response = await fetch('/api/directories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'ディレクトリの作成に失敗しました')
      }

      toast.success('ディレクトリを作成しました')
      await fetchDirectories()
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error creating directory:', error)
      toast.error(error instanceof Error ? error.message : 'ディレクトリの作成に失敗しました')
    }
  }

  // ディレクトリ更新
  const handleUpdateDirectory = async (id: string, data: { name: string; description?: string; parentId?: string }) => {
    try {
      const response = await fetch(`/api/directories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'ディレクトリの更新に失敗しました')
      }

      toast.success('ディレクトリを更新しました')
      await fetchDirectories()
      setIsDialogOpen(false)
      setSelectedDirectory(null)
    } catch (error) {
      console.error('Error updating directory:', error)
      toast.error(error instanceof Error ? error.message : 'ディレクトリの更新に失敗しました')
    }
  }

  // ディレクトリ削除
  const handleDeleteDirectory = async (id: string) => {
    if (!confirm('このディレクトリを削除してもよろしいですか？')) return

    try {
      const response = await fetch(`/api/directories/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'ディレクトリの削除に失敗しました')
      }

      toast.success('ディレクトリを削除しました')
      await fetchDirectories()
    } catch (error) {
      console.error('Error deleting directory:', error)
      toast.error(error instanceof Error ? error.message : 'ディレクトリの削除に失敗しました')
    }
  }

  // 新規作成ダイアログを開く
  const openCreateDialog = (parentId?: string) => {
    setSelectedDirectory(parentId ? { id: parentId } as Directory : null)
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  // 編集ダイアログを開く
  const openEditDialog = (directory: Directory) => {
    setSelectedDirectory(directory)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  // 契約書一覧に遷移
  const handleViewContracts = (directoryId: string) => {
    router.push(`/directories/${directoryId}/contracts`)
  }

  // フラットなディレクトリリストを取得（親ディレクトリ選択用）
  const getFlatDirectoryList = (directories: Directory[], excludeId?: string): Directory[] => {
    const result: Directory[] = []
    
    const traverse = (dirs: Directory[]) => {
      dirs.forEach(dir => {
        if (dir.id !== excludeId) {
          result.push(dir)
          if (dir.children) {
            traverse(dir.children)
          }
        }
      })
    }
    
    traverse(directories)
    return result
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
            <h1 className="text-3xl font-bold tracking-tight">ディレクトリ管理</h1>
            <p className="text-muted-foreground">
              契約書を整理するためのディレクトリを管理します
            </p>
          </div>
        </div>
        <Button onClick={() => openCreateDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          新規作成
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            ディレクトリ一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          {directories.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                ディレクトリがありません
              </h3>
              <p className="text-muted-foreground mb-4">
                最初のディレクトリを作成してください
              </p>
              <Button onClick={() => openCreateDialog()} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                ディレクトリを作成
              </Button>
            </div>
          ) : (
            <DirectoryTree
              directories={directories}
              onEdit={openEditDialog}
              onDelete={handleDeleteDirectory}
              onCreateChild={openCreateDialog}
              onViewContracts={handleViewContracts}
            />
          )}
        </CardContent>
      </Card>

      <DirectoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        directory={isEditing ? selectedDirectory : null}
        parentDirectory={!isEditing ? selectedDirectory : null}
        availableParents={getFlatDirectoryList(directories, selectedDirectory?.id)}
        onSubmit={isEditing ? 
          (data: { name: string; description?: string; parentId?: string }) => selectedDirectory && handleUpdateDirectory(selectedDirectory.id, data) :
          handleCreateDirectory
        }
      />
    </div>
  )
} 