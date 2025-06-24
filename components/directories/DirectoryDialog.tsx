'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Folder, FolderPlus } from 'lucide-react'
import type { Directory } from '@/app/directories/page'

const directorySchema = z.object({
  name: z
    .string()
    .min(1, 'ディレクトリ名は必須です')
    .max(100, 'ディレクトリ名は100文字以内で入力してください')
    .regex(/^[^/\\:*?"<>|]+$/, '無効な文字が含まれています'),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .optional(),
  parentId: z.string().optional(),
})

type DirectoryFormData = z.infer<typeof directorySchema>

interface DirectoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  directory?: Directory | null // 編集時のディレクトリ
  parentDirectory?: Directory | null // 新規作成時の親ディレクトリ
  availableParents: Directory[]
  onSubmit: (data: DirectoryFormData) => void
}

export function DirectoryDialog({
  open,
  onOpenChange,
  directory,
  parentDirectory,
  availableParents,
  onSubmit,
}: DirectoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!directory

  const form = useForm<DirectoryFormData>({
    resolver: zodResolver(directorySchema),
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
    },
  })

  // ダイアログが開いた時、フォームを初期化
  useEffect(() => {
    if (open) {
      if (isEditing && directory) {
        // 編集モード：既存のディレクトリデータで初期化
        form.reset({
          name: directory.name,
          description: directory.description || '',
          parentId: directory.parentId || '',
        })
      } else {
        // 新規作成モード：親ディレクトリで初期化
        form.reset({
          name: '',
          description: '',
          parentId: parentDirectory?.id || '',
        })
      }
    }
  }, [open, isEditing, directory, parentDirectory, form])

  const handleSubmit = async (data: DirectoryFormData) => {
    setIsSubmitting(true)
    try {
      // parentIdが空文字列の場合はundefinedに変換
      const submitData = {
        ...data,
        parentId: data.parentId || undefined,
        description: data.description || undefined,
      }
      
      await onSubmit(submitData)
      form.reset()
    } catch (error) {
      // エラーは親コンポーネントで処理される
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  // 親ディレクトリの表示名を生成
  const getParentDisplayName = (parent: Directory) => {
    return `${parent.name} (${parent.path})`
  }

  // 現在選択されている親ディレクトリを取得
  const selectedParentId = form.watch('parentId')
  const selectedParent = availableParents.find(p => p.id === selectedParentId)

  // プレビューパスを生成
  const generatePreviewPath = () => {
    const name = form.watch('name')
    if (!name) return ''
    
    if (selectedParent) {
      return `${selectedParent.path}/${name}`
    }
    return name
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Folder className="h-5 w-5" />
                ディレクトリを編集
              </>
            ) : (
              <>
                <FolderPlus className="h-5 w-5" />
                新しいディレクトリを作成
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'ディレクトリの情報を編集します。パスも自動的に更新されます。'
              : '新しいディレクトリを作成します。必要に応じて親ディレクトリを選択してください。'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ディレクトリ名 *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ディレクトリ名を入力してください"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    スラッシュ（/）や特殊文字は使用できません
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>親ディレクトリ</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="親ディレクトリを選択（任意）" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">ルートディレクトリ</SelectItem>
                      {availableParents.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {getParentDisplayName(parent)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    選択しない場合はルートディレクトリに作成されます
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* パスプレビュー */}
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                プレビューパス
              </div>
              <div className="text-sm font-mono text-foreground">
                /{generatePreviewPath() || 'ディレクトリ名を入力してください'}
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ディレクトリの用途や説明を入力してください（任意）"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    500文字以内で入力してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '処理中...' : isEditing ? '更新' : '作成'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 