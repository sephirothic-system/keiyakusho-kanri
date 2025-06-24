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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Users, UserPlus } from 'lucide-react'
import type { Group } from '@/app/groups/page'

const groupSchema = z.object({
  name: z
    .string()
    .min(1, 'グループ名は必須です')
    .max(100, 'グループ名は100文字以内で入力してください')
    .regex(/^[^\s].*[^\s]$|^[^\s]$/, '先頭と末尾にスペースは使用できません'),
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .optional(),
})

type GroupFormData = z.infer<typeof groupSchema>

interface GroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group?: Group | null // 編集時のグループ
  onSubmit: (data: GroupFormData) => void
}

export function GroupDialog({
  open,
  onOpenChange,
  group,
  onSubmit,
}: GroupDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!group

  const form = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  // ダイアログが開いた時、フォームを初期化
  useEffect(() => {
    if (open) {
      if (isEditing && group) {
        // 編集モード：既存のグループデータで初期化
        form.reset({
          name: group.name,
          description: group.description || '',
        })
      } else {
        // 新規作成モード：空で初期化
        form.reset({
          name: '',
          description: '',
        })
      }
    }
  }, [open, isEditing, group, form])

  const handleSubmit = async (data: GroupFormData) => {
    setIsSubmitting(true)
    try {
      const submitData = {
        ...data,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Users className="h-5 w-5" />
                グループを編集
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                新しいグループを作成
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'グループの情報を編集します。'
              : '新しいグループを作成します。作成後にメンバーの追加とディレクトリアクセス権限の設定ができます。'
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
                  <FormLabel>グループ名 *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="グループ名を入力してください"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    組織やチームの名前など、分かりやすい名前を付けてください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="グループの目的や役割を説明してください（任意）"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    このグループの目的、責任範囲、メンバーの役割などを記載してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* プレビュー情報 */}
            {isEditing && group && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  現在の情報
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">メンバー数:</span> {group._count?.userGroups || 0}人
                  </div>
                  <div>
                    <span className="font-medium">ディレクトリ権限:</span> {group._count?.directoryAccess || 0}件
                  </div>
                </div>
                {group.createdAt && (
                  <div className="text-xs text-muted-foreground">
                    作成日: {new Date(group.createdAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
            )}

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