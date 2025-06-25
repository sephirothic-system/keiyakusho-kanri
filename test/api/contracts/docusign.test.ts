import { describe, it, expect, beforeEach, vi } from 'vitest'
import { POST, GET } from '@/app/api/contracts/[id]/docusign/route'
import { NextRequest } from 'next/server'
import { factories, TestDataCleaner, testPrisma } from '@/test/factories/all'
import * as docusignLib from '@/lib/docusign'

// DocuSign関数をモック
vi.mock('@/lib/docusign', async () => {
  const actual = await vi.importActual('@/lib/docusign')
  return {
    ...actual,
    createDocuSignEnvelope: vi.fn(),
    getContractEnvelopes: vi.fn(),
    getEnvelopeStatus: vi.fn(),
    getSigningUrl: vi.fn(),
  }
})

const mockCreateDocuSignEnvelope = vi.mocked(docusignLib.createDocuSignEnvelope)
const mockGetContractEnvelopes = vi.mocked(docusignLib.getContractEnvelopes)
const mockGetEnvelopeStatus = vi.mocked(docusignLib.getEnvelopeStatus)
const mockGetSigningUrl = vi.mocked(docusignLib.getSigningUrl)

describe('DocuSign連携APIの統合テスト', () => {
  beforeEach(async () => {
    // テストデータのクリーンアップ
    await TestDataCleaner.cleanByPrefix('test')
    
    // モックのリセット
    vi.clearAllMocks()
    
    // デフォルトのモック実装を設定
    mockCreateDocuSignEnvelope.mockImplementation(async (request) => {
      return `mock-envelope-${Date.now()}`
    })
    
    mockGetContractEnvelopes.mockImplementation(async (contractId) => {
      return []
    })
    
    mockGetEnvelopeStatus.mockImplementation(async (envelopeId) => {
      return {
        envelopeId,
        status: 'sent',
        statusDateTime: new Date().toISOString()
      }
    })
    
    mockGetSigningUrl.mockImplementation(async (envelopeId, signerEmail, returnUrl) => {
      return `https://demo.docusign.net/signing/${envelopeId}?token=mock-token`
    })
  })

  describe('POST /api/contracts/[id]/docusign', () => {
    it('オーナーが電子契約を開始できる', async () => {
      // テストデータの準備
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        title: 'テスト契約書',
        content: '# テスト契約書\n\nこれはテスト用の契約書です。'
      })

      // DocuSignエンベロープ作成のモック設定
      const mockEnvelopeId = 'mock-envelope-12345'
      mockCreateDocuSignEnvelope.mockResolvedValueOnce(mockEnvelopeId)

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        message: 'テスト用のメッセージです',
        signers: [
          { email: 'signer1@example.com', name: '署名者1' },
          { email: 'signer2@example.com', name: '署名者2' }
        ]
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': owner.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.envelopeId).toBe(mockEnvelopeId)
      expect(data.message).toContain('電子契約が開始されました')

      // DocuSign関数が正しい引数で呼ばれたかチェック
      expect(mockCreateDocuSignEnvelope).toHaveBeenCalledWith({
        contractId: contract.id,
        subject: requestBody.subject,
        message: requestBody.message,
        signers: requestBody.signers.map((signer, index) => ({
          ...signer,
          routingOrder: index + 1
        }))
      })
    })

    it('署名者情報が不正な場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [] // 空の署名者リスト
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': owner.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)
      expect(mockCreateDocuSignEnvelope).not.toHaveBeenCalled()
    })

    it('件名が空の場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      const requestBody = {
        subject: '', // 空の件名
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': owner.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)
      expect(mockCreateDocuSignEnvelope).not.toHaveBeenCalled()
    })

    it('無効なメールアドレスの場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'invalid-email', name: 'テスト署名者' }] // 無効なメールアドレス
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': owner.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)
      expect(mockCreateDocuSignEnvelope).not.toHaveBeenCalled()
    })

    it('編集権限がないユーザーは403エラーになる', async () => {
      const owner = await factories.user.build()
      const otherUser = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': otherUser.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)
      expect(mockCreateDocuSignEnvelope).not.toHaveBeenCalled()
    })

    it('存在しない契約書で404エラーになる', async () => {
      const user = await factories.user.build()

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: 'non-existent-id' } })

      expect(response.status).toBe(404)
      expect(mockCreateDocuSignEnvelope).not.toHaveBeenCalled()
    })

    it('グループ書き込み権限でも電子契約を開始できる', async () => {
      // テストデータの準備
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      
             // グループにユーザーを追加
       await testPrisma.userGroup.create({
         data: {
           userId: user.id,
           groupId: group.id
         }
       })
       
       // ディレクトリに書き込み権限を付与
       await testPrisma.directoryAccess.create({
         data: {
           directoryId: directory.id,
           groupId: group.id,
           permission: 'WRITE'
         }
       })
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        title: 'グループ権限テスト契約書',
        content: '# グループ権限テスト契約書\n\nこれはグループ権限のテスト用契約書です。'
      })

      // DocuSignエンベロープ作成のモック設定
      const mockEnvelopeId = 'mock-envelope-group-test'
      mockCreateDocuSignEnvelope.mockResolvedValueOnce(mockEnvelopeId)

      const requestBody = {
        subject: '【電子署名】グループ権限テスト契約書',
        message: 'グループ権限でのテストです',
        signers: [
          { email: 'group.signer@example.com', name: 'グループ署名者' }
        ]
      }

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.envelopeId).toBe(mockEnvelopeId)

      // DocuSign関数が正しい引数で呼ばれたかチェック
      expect(mockCreateDocuSignEnvelope).toHaveBeenCalledWith({
        contractId: contract.id,
        subject: requestBody.subject,
        message: requestBody.message,
        signers: requestBody.signers.map((signer, index) => ({
          ...signer,
          routingOrder: index + 1
        }))
      })
    })
  })

  describe('GET /api/contracts/[id]/docusign', () => {
    it('オーナーが契約書のエンベロープ一覧を取得できる', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

             // モックエンベロープ情報
       const mockEnvelopes = [
         {
           id: 'test-envelope-1',
           envelopeId: 'mock-envelope-1',
           status: 'SENT' as const,
           subject: 'テスト電子契約1',
           message: 'テストメッセージ1',
           createdAt: new Date(),
           updatedAt: new Date(),
           completedAt: null,
           contractId: contract.id,
           templateId: null,
           signers: [
             {
               id: 'signer-1',
               envelopeId: 'test-envelope-1',
               email: 'signer1@example.com',
               name: '署名者1',
               routingOrder: 1,
               status: 'SENT' as const,
               signedAt: null,
               createdAt: new Date(),
               updatedAt: new Date()
             }
           ]
         }
       ]

       mockGetContractEnvelopes.mockResolvedValueOnce(mockEnvelopes as any)

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'GET',
        headers: {
          'x-user-id': owner.id,
        },
      })

      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.envelopes).toEqual(mockEnvelopes)
      expect(mockGetContractEnvelopes).toHaveBeenCalledWith(contract.id)
    })

    it('エンベロープがない場合は空の配列を返す', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      mockGetContractEnvelopes.mockResolvedValueOnce([])

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'GET',
        headers: {
          'x-user-id': owner.id,
        },
      })

      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.envelopes).toEqual([])
    })

    it('読み取り権限がないユーザーは403エラーになる', async () => {
      const owner = await factories.user.build()
      const otherUser = await factories.user.build()
      const directory = await factories.directory.build()
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id
      })

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'GET',
        headers: {
          'x-user-id': otherUser.id,
        },
      })

      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)
      expect(mockGetContractEnvelopes).not.toHaveBeenCalled()
    })

    it('存在しない契約書で404エラーになる', async () => {
      const user = await factories.user.build()

      const request = new NextRequest('http://localhost:3000/api/contracts/docusign', {
        method: 'GET',
        headers: {
          'x-user-id': user.id,
        },
      })

      const response = await GET(request, { params: { id: 'non-existent-id' } })

      expect(response.status).toBe(404)
      expect(mockGetContractEnvelopes).not.toHaveBeenCalled()
    })
  })
})