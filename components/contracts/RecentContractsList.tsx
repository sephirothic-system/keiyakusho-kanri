'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar, User, FolderOpen } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Contract {
  id: string
  title: string
  status: 'DRAFT' | 'REVIEW' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED'
  contractNumber?: string
  updatedAt: string
  createdAt: string
  owner: {
    name?: string
    email: string
  }
  directory: {
    name: string
    path: string
  }
  category?: {
    name: string
    color?: string
  }
}

const statusLabels = {
  DRAFT: '下書き',
  REVIEW: 'レビュー中',
  ACTIVE: 'アクティブ',
  EXPIRED: '期限切れ',
  TERMINATED: '終了'
} as const

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  REVIEW: 'bg-yellow-100 text-yellow-800',
  ACTIVE: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
  TERMINATED: 'bg-slate-100 text-slate-800'
} as const

export default function RecentContractsList() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchRecentContracts = async () => {
      try {
        const response = await fetch('/api/contracts?limit=5')
        
        if (!response.ok) {
          throw new Error('契約書の取得に失敗しました')
        }

        const data = await response.json()
        setContracts(data.contracts || [])
      } catch (err) {
        console.error('Error fetching recent contracts:', err)
        setError(err instanceof Error ? err.message : '契約書の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentContracts()
  }, [])

  const handleContractClick = (contractId: string) => {
    router.push(`/contracts/${contractId}`)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            直近編集した契約書
          </CardTitle>
          <CardDescription>最近更新された契約書を表示しています</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            直近編集した契約書
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (contracts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            直近編集した契約書
          </CardTitle>
          <CardDescription>最近更新された契約書を表示しています</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">契約書がありません</h3>
            <p className="text-sm text-gray-500">
              契約書を作成すると、ここに表示されます。
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          直近編集した契約書
        </CardTitle>
        <CardDescription>最近更新された契約書を表示しています</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleContractClick(contract.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900 truncate flex-1 mr-4">
                  {contract.title}
                </h3>
                <Badge className={statusColors[contract.status]}>
                  {statusLabels[contract.status]}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{contract.owner.name || contract.owner.email}</span>
                </div>
                
                <div className="flex items-center">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  <span>{contract.directory.name}</span>
                </div>
                
                {contract.category && (
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-1" 
                      style={{ backgroundColor: contract.category.color || '#gray' }}
                    />
                    <span>{contract.category.name}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {formatDistanceToNow(new Date(contract.updatedAt), { 
                      addSuffix: true, 
                      locale: ja 
                    })}
                  </span>
                </div>
                
                {contract.contractNumber && (
                  <div className="text-xs text-gray-400">
                    契約書番号: {contract.contractNumber}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 