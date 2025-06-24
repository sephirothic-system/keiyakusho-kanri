import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/contracts/[id]/docusign/route'
import { factories, TestDataCleaner } from '@/test/factories/all'
import { PrismaClient } from '@/lib/generated/prisma'

const testPrisma = new PrismaClient()

// Mock用のリクエスト作成ヘルパー
function createMockRequest(userId: string, body?: any): NextRequest {
  const url = 'http://localhost:3000/api/test'
  const options: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  return new NextRequest(url, options)
}

describe('DocuSign連携APIの統合テスト', () => {
  beforeEach(async () => {
    // 各テスト前にデータをクリーンアップ
    await TestDataCleaner.cleanByPrefix('test')
  })

  afterEach(async () => {
    // 各テスト後にもデータをクリーンアップ
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('POST /api/contracts/[id]/docusign', () => {
    it('オーナーが電子契約を開始できる', async () => {
      // テストデータを作成
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        status: 'ACTIVE',
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        message: 'テスト用の電子署名です',
        signers: [
          { email: 'signer1@example.com', name: '署名者1' },
          { email: 'signer2@example.com', name: '署名者2' }
        ]
      }

      const request = createMockRequest(owner.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.envelopeId).toBeDefined()
      expect(data.message).toContain('電子契約が開始されました')

      // データベースにエンベロープが作成されていることを確認
      const envelope = await testPrisma.docuSignEnvelope.findFirst({
        where: { contractId: contract.id },
        include: { signers: true }
      })

      expect(envelope).not.toBeNull()
      expect(envelope?.subject).toBe('【電子署名】テスト契約書')
      expect(envelope?.message).toBe('テスト用の電子署名です')
      expect(envelope?.status).toBe('SENT')
      expect(envelope?.signers).toHaveLength(2)
      expect(envelope?.signers[0].email).toBe('signer1@example.com')
      expect(envelope?.signers[0].name).toBe('署名者1')
      expect(envelope?.signers[0].routingOrder).toBe(1)
      expect(envelope?.signers[1].email).toBe('signer2@example.com')
      expect(envelope?.signers[1].name).toBe('署名者2')
      expect(envelope?.signers[1].routingOrder).toBe(2)
    })

    it('署名者情報が不正な場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [] // 署名者が空
      }

      const request = createMockRequest(owner.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('署名者の情報が必要です')
    })

    it('件名が空の場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const requestBody = {
        subject: '', // 件名が空
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = createMockRequest(owner.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toBe('件名が必要です')
    })

    it('無効なメールアドレスの場合400エラーになる', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'invalid-email', name: 'テスト署名者' }]
      }

      const request = createMockRequest(owner.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.error).toContain('有効なメールアドレスを入力してください')
    })

    it('編集権限がないユーザーは403エラーになる', async () => {
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = createMockRequest(unauthorizedUser.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書の電子契約を開始する権限がありません')
    })

    it('存在しない契約書で404エラーになる', async () => {
      const user = await factories.user.build()

      const requestBody = {
        subject: '【電子署名】テスト契約書',
        signers: [{ email: 'test@example.com', name: 'テスト署名者' }]
      }

      const request = createMockRequest(user.id, requestBody)
      const response = await POST(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data.error).toBe('契約書が見つかりません')
    })

    it('グループ書き込み権限でも電子契約を開始できる', async () => {
      // グループ権限のテストデータを作成
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリ書き込み権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const requestBody = {
        subject: '【電子署名】グループ権限テスト',
        signers: [{ email: 'group.test@example.com', name: 'グループテスト署名者' }]
      }

      const request = createMockRequest(user.id, requestBody)
      const response = await POST(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })

  describe('GET /api/contracts/[id]/docusign', () => {
    it('オーナーが契約書のエンベロープ一覧を取得できる', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      // テスト用エンベロープを作成
      const envelope = await testPrisma.docuSignEnvelope.create({
        data: {
          envelopeId: 'test-envelope-123',
          contractId: contract.id,
          status: 'SENT',
          subject: '【電子署名】テスト契約書',
          message: 'テスト用メッセージ',
          signers: {
            create: [
              {
                email: 'signer1@example.com',
                name: '署名者1',
                routingOrder: 1,
                status: 'SENT',
              },
              {
                email: 'signer2@example.com',
                name: '署名者2',
                routingOrder: 2,
                status: 'SENT',
              }
            ]
          }
        }
      })

      const request = createMockRequest(owner.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.envelopes).toHaveLength(1)
      expect(data.envelopes[0].envelopeId).toBe('test-envelope-123')
      expect(data.envelopes[0].subject).toBe('【電子署名】テスト契約書')
      expect(data.envelopes[0].signers).toHaveLength(2)
    })

    it('エンベロープがない場合は空の配列を返す', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const request = createMockRequest(owner.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.envelopes).toEqual([])
    })

    it('読み取り権限がないユーザーは403エラーになる', async () => {
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const contract = await factories.contract.createWithDependencies({
        ownerId: owner.id,
      })

      const request = createMockRequest(unauthorizedUser.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書へのアクセス権限がありません')
    })

    it('存在しない契約書で404エラーになる', async () => {
      const user = await factories.user.build()

      const request = createMockRequest(user.id)
      const response = await GET(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data.error).toBe('契約書が見つかりません')
    })
  })
})