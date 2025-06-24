'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Edit, 
  Trash2, 
  FileText, 
  Calendar, 
  User, 
  Folder, 
  Tag,
  Clock,
  FileSignature,
  Plus,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home
} from 'lucide-react'

interface ContractDetailPageProps {
  params: { id: string }
}

interface Contract {
  id: string
  title: string
  content: string
  status: string
  contractNumber?: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
  owner: { name: string; email: string }
  directory?: { name: string; path: string }
  category?: { name: string; color?: string }
  versions: Array<{
    id: string
    version: number
    title: string
    changeNote?: string
    createdAt: string
  }>
}

interface Permission {
  canRead: boolean
  canWrite: boolean
  accessType: 'owner' | 'group' | 'none'
}

interface DocuSignSigner {
  email: string
  name: string
  routingOrder: number
  status?: string
  signedAt?: string
}

interface DocuSignEnvelope {
  id: string
  envelopeId: string
  status: string
  subject: string
  message?: string
  createdAt: string
  completedAt?: string
  signers: DocuSignSigner[]
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  REVIEW: 'bg-yellow-100 text-yellow-800',
  ACTIVE: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
  TERMINATED: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  DRAFT: '下書き',
  REVIEW: '確認中',
  ACTIVE: '有効',
  EXPIRED: '期限切れ',
  TERMINATED: '終了',
}

const envelopeStatusColors: Record<string, string> = {
  CREATED: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  DECLINED: 'bg-red-100 text-red-800',
  VOIDED: 'bg-red-100 text-red-800',
}

const envelopeStatusLabels: Record<string, string> = {
  CREATED: '作成済み',
  SENT: '送信済み',
  COMPLETED: '完了',
  DECLINED: '拒否',
  VOIDED: '無効',
}

export default function ContractDetailPage({ params }: ContractDetailPageProps) {
  const router = useRouter()
  const [contract, setContract] = useState<Contract | null>(null)
  const [permission, setPermission] = useState<Permission | null>(null)
  const [envelopes, setEnvelopes] = useState<DocuSignEnvelope[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingEnvelope, setIsCreatingEnvelope] = useState(false)
  const [showDocuSignModal, setShowDocuSignModal] = useState(false)
  
  // DocuSign電子契約フォームの状態
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [signers, setSigners] = useState<{ email: string; name: string }[]>([
    { email: '', name: '' },
    { email: '', name: '' }
  ])

  // 初期データを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractResponse, envelopesResponse] = await Promise.all([
          fetch(`/api/contracts/${params.id}`, {
            headers: {
              'x-user-id': 'mock-user-id', // 実際の実装では認証から取得
            },
          }),
          fetch(`/api/contracts/${params.id}/docusign`, {
            headers: {
              'x-user-id': 'mock-user-id',
            },
          })
        ])

        if (!contractResponse.ok) {
          if (contractResponse.status === 404) {
            toast.error('契約書が見つかりません')
            router.push('/contracts')
            return
          }
          if (contractResponse.status === 403) {
            toast.error('この契約書へのアクセス権限がありません')
            router.push('/contracts')
            return
          }
          throw new Error('契約書の取得に失敗しました')
        }

        const contractData = await contractResponse.json()
        setContract(contractData.contract)
        setPermission(contractData.permission)

        // 契約書タイトルをデフォルトの件名に設定
        setSubject(`【電子署名】${contractData.contract.title}`)

        if (envelopesResponse.ok) {
          const envelopesData = await envelopesResponse.json()
          setEnvelopes(envelopesData.envelopes || [])
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        toast.error('データの取得に失敗しました')
        router.push('/contracts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id, router])

  const handleDeleteContract = async () => {
    if (!contract || !permission?.canWrite) return

    if (!confirm('本当にこの契約書を削除しますか？この操作は取り消せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/contracts/${params.id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': 'mock-user-id',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '契約書の削除に失敗しました')
      }

      toast.success('契約書を削除しました')
      router.push('/contracts')
    } catch (error) {
      console.error('Delete contract error:', error)
      toast.error(error instanceof Error ? error.message : '契約書の削除に失敗しました')
    }
  }

  const handleCreateDocuSignEnvelope = async () => {
    if (!contract) return

    // バリデーション
    if (!subject.trim()) {
      toast.error('件名を入力してください')
      return
    }

    const validSigners = signers.filter(signer => signer.email.trim() && signer.name.trim())
    if (validSigners.length === 0) {
      toast.error('最低1人の署名者を追加してください')
      return
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    for (const signer of validSigners) {
      if (!emailRegex.test(signer.email)) {
        toast.error(`無効なメールアドレス: ${signer.email}`)
        return
      }
    }

    setIsCreatingEnvelope(true)
    try {
      const response = await fetch(`/api/contracts/${params.id}/docusign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'mock-user-id',
        },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim() || undefined,
          signers: validSigners
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '電子契約の開始に失敗しました')
      }

      const result = await response.json()
      toast.success(result.message || '電子契約が開始されました')
      
      // モーダルを閉じてフォームをリセット
      setShowDocuSignModal(false)
      setSubject(`【電子署名】${contract.title}`)
      setMessage('')
      setSigners([{ email: '', name: '' }, { email: '', name: '' }])

      // エンベロープ一覧を再取得
      const envelopesResponse = await fetch(`/api/contracts/${params.id}/docusign`, {
        headers: { 'x-user-id': 'mock-user-id' },
      })
      if (envelopesResponse.ok) {
        const envelopesData = await envelopesResponse.json()
        setEnvelopes(envelopesData.envelopes || [])
      }
    } catch (error) {
      console.error('Create DocuSign envelope error:', error)
      toast.error(error instanceof Error ? error.message : '電子契約の開始に失敗しました')
    } finally {
      setIsCreatingEnvelope(false)
    }
  }

  const addSigner = () => {
    setSigners([...signers, { email: '', name: '' }])
  }

  const removeSigner = (index: number) => {
    if (signers.length > 1) {
      setSigners(signers.filter((_, i) => i !== index))
    }
  }

  const updateSigner = (index: number, field: 'email' | 'name', value: string) => {
    setSigners(signers.map((signer, i) => 
      i === index ? { ...signer, [field]: value } : signer
    ))
  }

  const renderEnvelopeStatus = (status: string) => {
    const colorClass = envelopeStatusColors[status] || 'bg-gray-100 text-gray-800'
    const label = envelopeStatusLabels[status] || status
    
    return <Badge className={colorClass}>{label}</Badge>
  }

  const renderSignerStatus = (status?: string) => {
    const statusIcons: Record<string, React.ReactNode> = {
      SENT: <AlertCircle className="h-4 w-4 text-blue-500" />,
      DELIVERED: <Mail className="h-4 w-4 text-blue-500" />,
      SIGNED: <CheckCircle className="h-4 w-4 text-green-500" />,
      COMPLETED: <CheckCircle className="h-4 w-4 text-green-500" />,
      DECLINED: <XCircle className="h-4 w-4 text-red-500" />,
    }

    const statusLabels: Record<string, string> = {
      CREATED: '作成済み',
      SENT: '送信済み',
      DELIVERED: '配信済み',
      SIGNED: '署名済み',
      COMPLETED: '完了',
      DECLINED: '拒否',
    }

    return (
      <div className="flex items-center gap-1">
        {status && statusIcons[status]}
        <span className="text-sm text-muted-foreground">
          {status ? statusLabels[status] || status : '未送信'}
        </span>
      </div>
    )
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

  if (!contract || !permission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">契約書が見つかりません</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
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
          <h1 className="text-3xl font-bold" data-testid="contract-title">
            {contract.title}
          </h1>
          <Badge className={statusColors[contract.status]} data-testid="contract-status">
            {statusLabels[contract.status]}
          </Badge>
        </div>
        
        {permission.canWrite && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/contracts/${params.id}/edit`)}
              className="gap-2"
              data-testid="edit-button"
            >
              <Edit className="h-4 w-4" />
              編集
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteContract}
              className="gap-2"
              data-testid="delete-button"
            >
              <Trash2 className="h-4 w-4" />
              削除
            </Button>
          </div>
        )}
      </div>

      {/* Contract Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            契約書情報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contract.contractNumber && (
              <div>
                <Label className="text-sm font-medium">契約書番号</Label>
                <p className="text-sm text-muted-foreground">{contract.contractNumber}</p>
              </div>
            )}
            
            {contract.startDate && (
              <div>
                <Label className="text-sm font-medium">開始日</Label>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(contract.startDate).toLocaleDateString('ja-JP')}
                </p>
              </div>
            )}
            
            {contract.endDate && (
              <div>
                <Label className="text-sm font-medium">終了日</Label>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(contract.endDate).toLocaleDateString('ja-JP')}
                </p>
              </div>
            )}
            
            <div>
              <Label className="text-sm font-medium">作成者</Label>
              <p className="text-sm text-muted-foreground flex items-center gap-1" data-testid="contract-owner">
                <User className="h-4 w-4" />
                {contract.owner.name} ({contract.owner.email})
              </p>
            </div>
            
            {contract.directory && (
              <div>
                <Label className="text-sm font-medium">ディレクトリ</Label>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Folder className="h-4 w-4" />
                  {contract.directory.name}
                </p>
              </div>
            )}
            
            {contract.category && (
              <div>
                <Label className="text-sm font-medium">カテゴリ</Label>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {contract.category.name}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* DocuSign Electric Contract Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              電子契約（DocuSign）
            </CardTitle>
            {permission.canWrite && (
              <Dialog open={showDocuSignModal} onOpenChange={setShowDocuSignModal}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    電子契約を開始
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>電子契約の開始</DialogTitle>
                    <DialogDescription>
                      DocuSignを使用して電子署名を開始します。署名者のメールアドレスと名前を入力してください。
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">件名 *</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="電子署名の件名を入力"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">メッセージ</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="署名者へのメッセージ（省略可）"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>署名者</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addSigner}>
                          <Plus className="h-4 w-4 mr-1" />
                          署名者を追加
                        </Button>
                      </div>
                      
                      {signers.map((signer, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            placeholder="メールアドレス"
                            value={signer.email}
                            onChange={(e) => updateSigner(index, 'email', e.target.value)}
                          />
                          <Input
                            placeholder="名前"
                            value={signer.name}
                            onChange={(e) => updateSigner(index, 'name', e.target.value)}
                          />
                          {signers.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeSigner(index)}
                            >
                              削除
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowDocuSignModal(false)}
                        disabled={isCreatingEnvelope}
                      >
                        キャンセル
                      </Button>
                      <Button
                        onClick={handleCreateDocuSignEnvelope}
                        disabled={isCreatingEnvelope}
                      >
                        {isCreatingEnvelope ? '開始中...' : '電子契約を開始'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {envelopes.length === 0 ? (
            <div className="text-center py-8">
              <FileSignature className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">まだ電子契約は開始されていません</p>
              {permission.canWrite && (
                <p className="text-sm text-muted-foreground mt-2">
                  「電子契約を開始」ボタンからDocuSignでの電子署名を始められます
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {envelopes.map((envelope) => (
                <Card key={envelope.id} className="border">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{envelope.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          作成日: {new Date(envelope.createdAt).toLocaleString('ja-JP')}
                        </p>
                        {envelope.completedAt && (
                          <p className="text-sm text-muted-foreground">
                            完了日: {new Date(envelope.completedAt).toLocaleString('ja-JP')}
                          </p>
                        )}
                      </div>
                      {renderEnvelopeStatus(envelope.status)}
                    </div>
                    
                    {envelope.message && (
                      <p className="text-sm text-muted-foreground mb-4">{envelope.message}</p>
                    )}
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">署名者</Label>
                      <div className="space-y-2">
                        {envelope.signers.map((signer, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div>
                              <p className="text-sm font-medium">{signer.name}</p>
                              <p className="text-sm text-muted-foreground">{signer.email}</p>
                            </div>
                            <div className="text-right">
                              {renderSignerStatus(signer.status)}
                              {signer.signedAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  署名日時: {new Date(signer.signedAt).toLocaleString('ja-JP')}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Content */}
      <Card>
        <CardHeader>
          <CardTitle>契約書内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none"
            data-testid="contract-content"
            dangerouslySetInnerHTML={{
              __html: contract.content.replace(/\n/g, '<br/>')
            }}
          />
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="version-history">
            <Clock className="h-5 w-5" />
            バージョン履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          {contract.versions.length === 0 ? (
            <p className="text-muted-foreground">バージョン履歴はありません</p>
          ) : (
            <div className="space-y-3">
              {contract.versions.map((version) => (
                <div key={version.id} className="flex items-center justify-between p-3 border rounded" data-testid={`version-${version.version}`}>
                  <div>
                    <p className="font-medium">バージョン {version.version}: {version.title}</p>
                    {version.changeNote && (
                      <p className="text-sm text-muted-foreground">{version.changeNote}</p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(version.createdAt).toLocaleString('ja-JP')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}