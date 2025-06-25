import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { POST, GET } from '@/app/api/webhooks/docusign/route'
import { NextRequest } from 'next/server'
import { factories, TestDataCleaner } from '@/test/factories/all'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

const createMockRequest = (body: object) => {
  return new NextRequest('http://localhost:3000/api/webhooks/docusign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

describe('DocuSign Webhook API', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('POST /api/webhooks/docusign', () => {
    it('エンベロープ完了時にステータスを更新する', async () => {
      // テストデータを作成
      const owner = await factories.user.build()
      const contract = await factories.contract.build({ ownerId: owner.id })
      const envelope = await factories.docuSignEnvelope.build({
        contractId: contract.id,
        status: 'SENT',
      })
      const signer = await factories.docuSignSigner.build({
        envelopeId: envelope.id,
        status: 'SENT',
      })

      // Webhookペイロードを作成
      const webhookPayload = {
        event: 'envelope-completed',
        apiVersion: '2.1',
        uri: `/restapi/v2.1/accounts/test/envelopes/${envelope.envelopeId}`,
        retryCount: 0,
        configurationId: 12345,
        generatedDateTime: new Date().toISOString(),
        data: {
          envelopeId: envelope.envelopeId,
          status: 'completed',
          statusDateTime: new Date().toISOString(),
          recipients: {
            signers: [
              {
                recipientId: '1',
                email: signer.email,
                name: signer.name,
                status: 'completed',
                signedDateTime: new Date().toISOString(),
                routingOrder: signer.routingOrder,
              },
            ],
          },
        },
      }

      const request = createMockRequest(webhookPayload)
      const response = await POST(request)

      expect(response.status).toBe(200)

      const responseData = await response.json()
      expect(responseData.message).toBe('Webhook processed successfully')
      expect(responseData.envelopeId).toBe(envelope.envelopeId)
      expect(responseData.status).toBe('COMPLETED')

      // データベースの更新を確認
      const updatedEnvelope = await prisma.docuSignEnvelope.findUnique({
        where: { envelopeId: envelope.envelopeId },
      })
      expect(updatedEnvelope?.status).toBe('COMPLETED')
      expect(updatedEnvelope?.completedAt).toBeTruthy()

      const updatedSigner = await prisma.docuSignSigner.findFirst({
        where: { envelopeId: envelope.id, email: signer.email },
      })
      expect(updatedSigner?.status).toBe('COMPLETED')
      expect(updatedSigner?.signedAt).toBeTruthy()

      // 契約書のステータスも更新されることを確認
      const updatedContract = await prisma.contract.findUnique({
        where: { id: contract.id },
      })
      expect(updatedContract?.status).toBe('ACTIVE')
    })

    it('エンベロープ拒否時にステータスを更新する', async () => {
      const owner = await factories.user.build()
      const contract = await factories.contract.build({ ownerId: owner.id })
      const envelope = await factories.docuSignEnvelope.build({
        contractId: contract.id,
        status: 'SENT',
      })
      const signer = await factories.docuSignSigner.build({
        envelopeId: envelope.id,
        status: 'SENT',
      })

      const webhookPayload = {
        event: 'envelope-declined',
        apiVersion: '2.1',
        uri: `/restapi/v2.1/accounts/test/envelopes/${envelope.envelopeId}`,
        retryCount: 0,
        configurationId: 12345,
        generatedDateTime: new Date().toISOString(),
        data: {
          envelopeId: envelope.envelopeId,
          status: 'declined',
          statusDateTime: new Date().toISOString(),
          recipients: {
            signers: [
              {
                recipientId: '1',
                email: signer.email,
                name: signer.name,
                status: 'declined',
                routingOrder: signer.routingOrder,
              },
            ],
          },
        },
      }

      const request = createMockRequest(webhookPayload)
      const response = await POST(request)

      expect(response.status).toBe(200)

      // データベースの更新を確認
      const updatedEnvelope = await prisma.docuSignEnvelope.findUnique({
        where: { envelopeId: envelope.envelopeId },
      })
      expect(updatedEnvelope?.status).toBe('DECLINED')

      const updatedSigner = await prisma.docuSignSigner.findFirst({
        where: { envelopeId: envelope.id, email: signer.email },
      })
      expect(updatedSigner?.status).toBe('DECLINED')
    })

    it('存在しないエンベロープの場合404を返す', async () => {
      const webhookPayload = {
        event: 'envelope-completed',
        apiVersion: '2.1',
        uri: '/restapi/v2.1/accounts/test/envelopes/nonexistent-envelope-id',
        retryCount: 0,
        configurationId: 12345,
        generatedDateTime: new Date().toISOString(),
        data: {
          envelopeId: 'nonexistent-envelope-id',
          status: 'completed',
          statusDateTime: new Date().toISOString(),
        },
      }

      const request = createMockRequest(webhookPayload)
      const response = await POST(request)

      expect(response.status).toBe(404)

      const responseData = await response.json()
      expect(responseData.message).toBe('Envelope not found')
    })

    it('不正なJSONの場合エラーを返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/docusign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      })

      const response = await POST(request)

      expect(response.status).toBe(500)

      const responseData = await response.json()
      expect(responseData.error).toBe('Internal server error')
    })
  })

  describe('GET /api/webhooks/docusign', () => {
    it('Webhookエンドポイントの稼働状況を返す', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/docusign', {
        method: 'GET',
      })

      const response = await GET(request)

      expect(response.status).toBe(200)

      const responseData = await response.json()
      expect(responseData.message).toBe('DocuSign Webhook endpoint is active')
      expect(responseData.timestamp).toBeTruthy()
    })
  })
})