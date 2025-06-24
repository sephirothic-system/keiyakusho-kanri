'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Calendar, Save, FileText, Eye, Edit3 } from 'lucide-react'
import { toast } from 'sonner'

// Markdownエディターを動的インポート（SSRの問題を回避）
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export interface ContractData {
  id?: string
  title: string
  content: string
  status: 'DRAFT' | 'REVIEW' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED'
  contractNumber?: string
  startDate?: string
  endDate?: string
  directoryId: string
  categoryId?: string
  owner?: {
    name: string | null
    email: string
  }
  directory?: {
    name: string
    path: string
  }
  category?: {
    name: string
    color: string | null
  }
}

interface ContractEditorProps {
  contract?: ContractData
  directories: Array<{ id: string; name: string; path: string }>
  categories: Array<{ id: string; name: string; color: string | null }>
  onSave: (contractData: Omit<ContractData, 'id' | 'owner' | 'directory' | 'category'>) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const STATUS_LABELS = {
  DRAFT: { label: '下書き', color: 'bg-gray-100 text-gray-800' },
  REVIEW: { label: 'レビュー中', color: 'bg-yellow-100 text-yellow-800' },
  ACTIVE: { label: '有効', color: 'bg-green-100 text-green-800' },
  EXPIRED: { label: '期限切れ', color: 'bg-red-100 text-red-800' },
  TERMINATED: { label: '終了', color: 'bg-gray-100 text-gray-800' },
}

export function ContractEditor({
  contract,
  directories,
  categories,
  onSave,
  onCancel,
  isLoading = false,
}: ContractEditorProps) {
  const [formData, setFormData] = useState<Omit<ContractData, 'id' | 'owner' | 'directory' | 'category'>>({
    title: contract?.title || '',
    content: contract?.content || '# 契約書タイトル\n\n## 第1条 目的\n\n本契約書の目的を記載してください。\n\n## 第2条 内容\n\n契約内容を記載してください。\n\n',
    status: contract?.status || 'DRAFT',
    contractNumber: contract?.contractNumber || '',
    startDate: contract?.startDate || '',
    endDate: contract?.endDate || '',
    directoryId: contract?.directoryId || '',
    categoryId: contract?.categoryId || '',
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // フォームバリデーション
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です'
    }

    if (!formData.directoryId) {
      newErrors.directoryId = 'ディレクトリは必須です'
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (startDate >= endDate) {
        newErrors.endDate = '終了日は開始日より後の日付を設定してください'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('入力内容に誤りがあります')
      return
    }

    try {
      await onSave(formData)
      toast.success(contract ? '契約書を更新しました' : '契約書を作成しました')
    } catch (error) {
      console.error('Save contract error:', error)
      toast.error('保存に失敗しました')
    }
  }

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    // カテゴリIDの特別な値を処理
    const processedValue = field === 'categoryId' && value === '__NONE__' ? '' : value
    setFormData(prev => ({ ...prev, [field]: processedValue }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {contract ? '契約書を編集' : '新しい契約書を作成'}
          </h1>
          {contract && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>ID: {contract.id}</span>
              {contract.directory && (
                <>
                  <span>•</span>
                  <span>{contract.directory.path}</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            {previewMode ? (
              <>
                <Edit3 className="h-4 w-4" />
                <span>編集</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>プレビュー</span>
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            キャンセル
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{isLoading ? '保存中...' : '保存'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メタデータフォーム */}
        <div className="lg:order-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">契約書情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* タイトル */}
              <div className="space-y-2">
                <Label htmlFor="title">タイトル *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="契約書のタイトルを入力"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* ステータス */}
              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleFieldChange('status', value)}
                >
                  <SelectTrigger aria-label="ステータス">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ディレクトリ */}
              <div className="space-y-2">
                <Label htmlFor="directory">ディレクトリ *</Label>
                <Select
                  value={formData.directoryId}
                  onValueChange={(value) => handleFieldChange('directoryId', value)}
                >
                  <SelectTrigger aria-label="ディレクトリ" className={errors.directoryId ? 'border-red-500' : ''}>
                    <SelectValue placeholder="ディレクトリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {directories.map((directory) => (
                      <SelectItem key={directory.id} value={directory.id}>
                        {directory.path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.directoryId && (
                  <p className="text-sm text-red-500">{errors.directoryId}</p>
                )}
              </div>

              {/* カテゴリ */}
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ</Label>
                <Select
                  value={formData.categoryId || '__NONE__'}
                  onValueChange={(value) => handleFieldChange('categoryId', value)}
                >
                  <SelectTrigger aria-label="カテゴリ">
                    <SelectValue placeholder="カテゴリを選択（任意）" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__NONE__">なし</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          {category.color && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                          )}
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* 契約書番号 */}
              <div className="space-y-2">
                <Label htmlFor="contractNumber">契約書番号</Label>
                <Input
                  id="contractNumber"
                  value={formData.contractNumber}
                  onChange={(e) => handleFieldChange('contractNumber', e.target.value)}
                  placeholder="例: CONTRACT-2024-001"
                />
              </div>

              {/* 日付 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">開始日</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleFieldChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">終了日</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleFieldChange('endDate', e.target.value)}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">{errors.endDate}</p>
                  )}
                </div>
              </div>

              {/* 現在のステータス表示 */}
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">現在のステータス:</span>
                  <Badge className={STATUS_LABELS[formData.status].color}>
                    {STATUS_LABELS[formData.status].label}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* コンテンツエディター */}
        <div className="lg:col-span-2 lg:order-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">契約書内容</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <MDEditor
                  value={formData.content}
                  onChange={(value) => handleFieldChange('content', value || '')}
                  preview={previewMode ? 'preview' : 'edit'}
                  hideToolbar={previewMode}
                  visibleDragbar={false}
                  textareaProps={{
                    placeholder: '契約書の内容をMarkdown形式で記載してください...',
                    style: {
                      fontSize: 14,
                      lineHeight: 1.6,
                    },
                  }}
                  height={600}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 