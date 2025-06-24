'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContractEditor, ContractData } from '@/components/contracts/ContractEditor'
import { toast } from 'sonner'

interface EditContractPageProps {
  params: { id: string }
}

export default function EditContractPage({ params }: EditContractPageProps) {
  const router = useRouter()
  const [contract, setContract] = useState<ContractData | null>(null)
  const [directories, setDirectories] = useState<Array<{ id: string; name: string; path: string }>>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string; color: string | null }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // 初期データを取得
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [contractResponse, directoriesResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/contracts/${params.id}`, {
            headers: {
              'x-user-id': 'mock-user-id', // 実際の実装では認証から取得
            },
          }),
          fetch('/api/directories'),
          fetch('/api/categories'),
        ])

        if (!contractResponse.ok) {
          if (contractResponse.status === 404) {
            toast.error('契約書が見つかりません')
            router.push('/contracts')
            return
          }
          if (contractResponse.status === 403) {
            toast.error('この契約書の編集権限がありません')
            router.push(`/contracts/${params.id}`)
            return
          }
          throw new Error('契約書の取得に失敗しました')
        }

        const contractData = await contractResponse.json()
        const contractInfo = contractData.contract

        // 日付をフォーマット
        const formattedContract: ContractData = {
          ...contractInfo,
          startDate: contractInfo.startDate ? new Date(contractInfo.startDate).toISOString().split('T')[0] : '',
          endDate: contractInfo.endDate ? new Date(contractInfo.endDate).toISOString().split('T')[0] : '',
        }

        setContract(formattedContract)

        // 権限チェック
        if (!contractData.permission?.canWrite) {
          toast.error('この契約書の編集権限がありません')
          router.push(`/contracts/${params.id}`)
          return
        }

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
        toast.error('データの取得に失敗しました')
        router.push('/contracts')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchInitialData()
  }, [params.id, router])

  const handleSave = async (contractData: Omit<ContractData, 'id' | 'owner' | 'directory' | 'category'>) => {
    if (!contract) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/contracts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'mock-user-id', // 実際の実装では認証から取得
        },
        body: JSON.stringify({
          ...contractData,
          startDate: contractData.startDate ? new Date(contractData.startDate).toISOString() : undefined,
          endDate: contractData.endDate ? new Date(contractData.endDate).toISOString() : undefined,
          changeNote: '契約書を更新しました', // バージョン管理用
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '契約書の更新に失敗しました')
      }

      toast.success('契約書を更新しました')
      
      // 契約書の詳細ページにリダイレクト
      router.push(`/contracts/${params.id}`)
    } catch (error) {
      console.error('Update contract error:', error)
      toast.error(error instanceof Error ? error.message : '契約書の更新に失敗しました')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push(`/contracts/${params.id}`)
  }

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

  if (!contract) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">契約書が見つかりません</p>
        </div>
      </div>
    )
  }

  return (
    <ContractEditor
      contract={contract}
      directories={directories}
      categories={categories}
      onSave={handleSave}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  )
} 