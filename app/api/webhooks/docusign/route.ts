import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import crypto from 'crypto'

const prisma = new PrismaClient()

// DocuSign Webhook署名検証用のシークレット
const DOCUSIGN_WEBHOOK_SECRET = process.env.DOCUSIGN_WEBHOOK_SECRET

interface DocuSignWebhookEvent {
  event: string
  apiVersion: string
  uri: string
  retryCount: number
  configurationId: number
  generatedDateTime: string
  data: {
    envelopeId: string
    status: string
    statusDateTime: string
    recipients?: {
      signers?: Array<{
        recipientId: string
        email: string
        name: string
        status: string
        signedDateTime?: string
        routingOrder: number
      }>
    }
  }
}

/**
 * Webhook署名を検証
 */
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
    console.warn('DocuSign Webhook secret not configured, skipping signature verification')
    return true // 開発環境では検証をスキップ
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

/**
 * DocuSignのステータスを内部ステータスにマッピング
 */
function mapDocuSignStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'created': 'CREATED',
    'sent': 'SENT',
    'delivered': 'DELIVERED',
    'completed': 'COMPLETED',
    'declined': 'DECLINED',
    'voided': 'VOIDED',
    'signed': 'SIGNED',
  }

  return statusMap[status.toLowerCase()] || status.toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    
    // Webhook署名を検証
    const signature = request.headers.get('x-docusign-signature-1')
    if (signature && DOCUSIGN_WEBHOOK_SECRET) {
      if (!verifyWebhookSignature(body, signature, DOCUSIGN_WEBHOOK_SECRET)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const webhookEvent: DocuSignWebhookEvent = JSON.parse(body)
    
    console.log('DocuSign Webhook received:', {
      event: webhookEvent.event,
      envelopeId: webhookEvent.data.envelopeId,
      status: webhookEvent.data.status,
      statusDateTime: webhookEvent.data.statusDateTime
    })

    const { envelopeId, status, statusDateTime, recipients } = webhookEvent.data

    // データベース内のエンベロープを検索
    const envelope = await prisma.docuSignEnvelope.findUnique({
      where: { envelopeId },
      include: { signers: true }
    })

    if (!envelope) {
      console.warn(`Envelope not found: ${envelopeId}`)
      return NextResponse.json({ message: 'Envelope not found' }, { status: 404 })
    }

    // エンベロープのステータス更新
    const mappedStatus = mapDocuSignStatus(status)
    const updateData: any = {
      status: mappedStatus,
      updatedAt: new Date(),
    }

    // 完了日時の設定
    if (status.toLowerCase() === 'completed') {
      updateData.completedAt = new Date(statusDateTime)
    }

    await prisma.docuSignEnvelope.update({
      where: { envelopeId },
      data: updateData
    })

    // 署名者のステータス更新
    if (recipients?.signers) {
      for (const signer of recipients.signers) {
        const signerStatus = mapDocuSignStatus(signer.status)
        const signerUpdateData: any = {
          status: signerStatus,
          updatedAt: new Date(),
        }

        // 署名完了日時の設定
        if (signer.signedDateTime) {
          signerUpdateData.signedAt = new Date(signer.signedDateTime)
        }

        await prisma.docuSignSigner.updateMany({
          where: {
            envelopeId: envelope.id,
            email: signer.email,
          },
          data: signerUpdateData
        })
      }
    }

    // 契約書のステータス更新（必要に応じて）
    if (status.toLowerCase() === 'completed') {
      // 全ての署名が完了した場合、契約書のステータスをACTIVEに更新
      await prisma.contract.update({
        where: { id: envelope.contractId },
        data: { 
          status: 'ACTIVE',
          updatedAt: new Date()
        }
      })
      
      console.log(`Contract ${envelope.contractId} status updated to ACTIVE`)
    }

    console.log(`Successfully updated envelope ${envelopeId} status to ${mappedStatus}`)

    return NextResponse.json({ 
      message: 'Webhook processed successfully',
      envelopeId,
      status: mappedStatus
    })

  } catch (error) {
    console.error('DocuSign webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Webhookの検証用（開発時のテスト用）
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'DocuSign Webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}