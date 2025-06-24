'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Search, 
  ArrowLeft, 
  FileText, 
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
  Folder
} from 'lucide-react'

interface Contract {
  id: string
  title: string
  status: string
  contractNumber?: string | null
  startDate?: string | null
  endDate?: string | null
  createdAt: string
  updatedAt: string
  owner: {
    id: string
    name?: string | null
    email: string
  }
  category?: {
    id: string
    name: string
    color?: string | null
  } | null
}

interface Directory {
  id: string
  name: string
  path: string
  description?: string | null
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

const CONTRACT_STATUS_LABELS = {
  DRAFT: 'ドラフト',
  REVIEW: 'レビュー中',
  ACTIVE: 'アクティブ',
  EXPIRED: '期限切れ',
  TERMINATED: '終了'
} as const

const CONTRACT_STATUS_COLORS = {
  DRAFT: 'bg-gray-100 text-gray-800',
  REVIEW: 'bg-yellow-100 text-yellow-800',
  ACTIVE: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
  TERMINATED: 'bg-red-100 text-red-800'
} as const

export default function DirectoryContractsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [contracts, setContracts] = useState<Contract[]>([])
  const [directory, setDirectory] = useState<Directory | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  )

  // 契約書一覧を取得
  const fetchContracts = async (page = 1, search = '') => {
    try {
      setIsLoading(true)
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search })
      })

      const response = await fetch(
        `/api/directories/${params.id}/contracts?${queryParams}`
      )
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '契約書の取得に失敗しました')
      }
      
      const data = await response.json()
      setContracts(data.contracts)
      setDirectory(data.directory)
      setPagination(data.pagination)
      
      // URLパラメータを更新
      const newSearchParams = new URLSearchParams()
      if (page > 1) newSearchParams.set('page', page.toString())
      if (search) newSearchParams.set('search', search)
      
      const newUrl = `${window.location.pathname}${
        newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''
      }`
      window.history.pushState({}, '', newUrl)
      
    } catch (error) {
      console.error('Error fetching contracts:', error)
      toast.error(error instanceof Error ? error.message : '契約書の取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // 初期読み込み
  useEffect(() => {
    fetchContracts(currentPage, searchQuery)
  }, [params.id])

  // 検索処理
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    await fetchContracts(1, searchQuery)
  }

  // ページ変更処理
  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    await fetchContracts(page, searchQuery)
  }

  // 日付フォーマット
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('ja-JP')
  }

  // 契約書詳細ページに移動
  const handleContractClick = (contractId: string) => {
    router.push(`/contracts/${contractId}`)
  }

  if (isLoading && !contracts.length) {
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
            onClick={() => router.push('/directories')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            ディレクトリ一覧
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Folder className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-3xl font-bold tracking-tight">
                {directory?.name || 'ディレクトリ'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {directory?.description || directory?.path || 'このディレクトリ内の契約書一覧'}
            </p>
          </div>
        </div>
      </div>

      {/* 検索バー */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="契約書名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="gap-2">
              <Search className="h-4 w-4" />
              検索
            </Button>
            {searchQuery && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setCurrentPage(1)
                  fetchContracts(1, '')
                }}
              >
                クリア
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* 契約書一覧 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              契約書一覧
              {pagination && (
                <span className="text-sm font-normal text-muted-foreground">
                  （{pagination.totalCount}件）
                </span>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : contracts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {searchQuery ? '該当する契約書が見つかりません' : '契約書がありません'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? '検索条件を変更してお試しください' 
                  : 'このディレクトリには契約書が登録されていません'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => handleContractClick(contract.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg" data-testid="contract-title">{contract.title}</h3>
                        <Badge 
                          className={CONTRACT_STATUS_COLORS[contract.status as keyof typeof CONTRACT_STATUS_COLORS]}
                        >
                          {CONTRACT_STATUS_LABELS[contract.status as keyof typeof CONTRACT_STATUS_LABELS]}
                        </Badge>
                        {contract.category && (
                          <Badge variant="outline" style={{
                            backgroundColor: contract.category.color || undefined
                          }}>
                            {contract.category.name}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {contract.contractNumber && (
                          <span>契約番号: {contract.contractNumber}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {contract.owner.name || contract.owner.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          作成: {formatDate(contract.createdAt)}
                        </span>
                        {contract.startDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            開始: {formatDate(contract.startDate)}
                          </span>
                        )}
                        {contract.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            終了: {formatDate(contract.endDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ページネーション */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            前へ
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(page => {
                const current = pagination.page
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= current - 1 && page <= current + 1)
                )
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1]
                const showEllipsis = prevPage && page - prevPage > 1
                
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                )
              })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="gap-1"
          >
            次へ
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}