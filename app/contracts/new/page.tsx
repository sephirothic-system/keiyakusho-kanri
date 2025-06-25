'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ContractEditor, ContractData } from '@/components/contracts/ContractEditor'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NewContractPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultDirectoryId = searchParams.get('directoryId')
  
  const [directories, setDirectories] = useState<Array<{ id: string; name: string; path: string }>>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string; color: string | null }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // 初期データを取得
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [directoriesResponse, categoriesResponse] = await Promise.all([
          fetch('/api/directories'),
          fetch('/api/categories'),
        ])

        if (directoriesResponse.ok) {
          const directoriesData = await directoriesResponse.json()
          setDirectories(directoriesData.directories || [])
        }

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setCategories(categoriesData.categories || [])
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error)
        toast.error('初期データの取得に失敗しました')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleSave = async (contractData: Omit<ContractData, 'id' | 'owner' | 'directory' | 'category'>) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'mock-user-id', // 実際の実装では認証から取得
        },
        body: JSON.stringify({
          ...contractData,
          startDate: contractData.startDate ? new Date(contractData.startDate).toISOString() : undefined,
          endDate: contractData.endDate ? new Date(contractData.endDate).toISOString() : undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '契約書の作成に失敗しました')
      }

      const result = await response.json()
      toast.success('契約書を作成しました')
      
      // 作成した契約書の詳細ページにリダイレクト
      router.push(`/contracts/${result.contract.id}`)
    } catch (error) {
      console.error('Save contract error:', error)
      toast.error(error instanceof Error ? error.message : '契約書の作成に失敗しました')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const renderHomeButton = () => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push('/')}
      className="gap-2"
    >
      <Home className="h-4 w-4" />
      ホーム
    </Button>
  )

  if (isInitialLoading) {
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
    <ContractEditor
      directories={directories}
      categories={categories}
      onSave={handleSave}
      onCancel={handleCancel}
      isLoading={isLoading}
      homeButton={renderHomeButton()}
      defaultDirectoryId={defaultDirectoryId || undefined}
    />
  )
} 