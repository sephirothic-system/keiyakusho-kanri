import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// DocuSign APIの設定
const DOCUSIGN_BASE_URL = process.env.DOCUSIGN_BASE_URL || 'https://demo.docusign.net/restapi'
const DOCUSIGN_ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID
const DOCUSIGN_INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY
const DOCUSIGN_USER_ID = process.env.DOCUSIGN_USER_ID
const DOCUSIGN_PRIVATE_KEY = process.env.DOCUSIGN_PRIVATE_KEY

export interface DocuSignSigner {
  email: string
  name: string
  routingOrder: number
}

export interface CreateEnvelopeRequest {
  contractId: string
  subject: string
  message?: string
  signers: DocuSignSigner[]
  templateId?: string
}

export interface DocuSignEnvelopeResponse {
  envelopeId: string
  status: string
  statusDateTime: string
}

/**
 * JWT認証用のアクセストークンを取得
 */
async function getAccessToken(): Promise<string> {
  // 本来はJWT認証を行いますが、ここでは簡略化
  // 実際の実装では、JWTライブラリを使用してトークンを生成し、
  // DocuSign認証エンドポイントからアクセストークンを取得する必要があります
  
  if (!DOCUSIGN_INTEGRATION_KEY || !DOCUSIGN_USER_ID || !DOCUSIGN_PRIVATE_KEY) {
    throw new Error('DocuSign credentials are not configured')
  }

  // JWT認証のモック実装
  // 実際の実装では docusign-esign ライブラリを使用
  return 'mock_access_token_for_development'
}

/**
 * DocuSign APIリクエストのヘルパー
 */
async function makeDocuSignRequest(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<any> {
  const accessToken = await getAccessToken()
  
  const response = await fetch(`${DOCUSIGN_BASE_URL}/v2.1/accounts/${DOCUSIGN_ACCOUNT_ID}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DocuSign API error: ${response.status} ${errorText}`)
  }

  return response.json()
}

/**
 * DocuSignでエンベロープ（電子契約）を作成
 */
export async function createDocuSignEnvelope(request: CreateEnvelopeRequest): Promise<string> {
  try {
    // 契約書データを取得
    const contract = await prisma.contract.findUnique({
      where: { id: request.contractId },
      include: { 
        owner: { select: { name: true, email: true } }
      }
    })

    if (!contract) {
      throw new Error('契約書が見つかりません')
    }

    // DocuSign エンベロープの作成リクエスト
    const envelopeDefinition = {
      emailSubject: request.subject,
      emailMessage: request.message || '契約書への電子署名をお願いいたします。',
      status: 'sent', // 'created' | 'sent'
      documents: [
        {
          documentId: '1',
          name: `${contract.title}.pdf`,
          documentBase64: await convertMarkdownToPdfBase64(contract.content),
          fileExtension: 'pdf',
        }
      ],
      recipients: {
        signers: request.signers.map((signer, index) => ({
          email: signer.email,
          name: signer.name,
          recipientId: String(index + 1),
          routingOrder: String(signer.routingOrder),
          tabs: {
            signHereTabs: [
              {
                documentId: '1',
                pageNumber: '1',
                recipientId: String(index + 1),
                tabLabel: `SignHere${index + 1}`,
                xPosition: '200',
                yPosition: '700',
              }
            ]
          }
        }))
      }
    }

    // DocuSign API でエンベロープを作成
    const response: DocuSignEnvelopeResponse = await makeDocuSignRequest(
      '/envelopes',
      'POST',
      envelopeDefinition
    )

    // データベースにエンベロープ情報を保存
    const dbEnvelope = await prisma.docuSignEnvelope.create({
      data: {
        envelopeId: response.envelopeId,
        contractId: request.contractId,
        status: 'SENT',
        subject: request.subject,
        message: request.message,
        templateId: request.templateId,
        signers: {
          create: request.signers.map(signer => ({
            email: signer.email,
            name: signer.name,
            routingOrder: signer.routingOrder,
            status: 'SENT',
          }))
        }
      }
    })

    return response.envelopeId
  } catch (error) {
    console.error('DocuSign envelope creation failed:', error)
    throw error
  }
}

/**
 * DocuSignエンベロープのステータスを取得
 */
export async function getEnvelopeStatus(envelopeId: string) {
  try {
    const response = await makeDocuSignRequest(`/envelopes/${envelopeId}`)
    
    // データベースのステータスも更新
    await updateEnvelopeStatus(envelopeId, response.status)
    
    return response
  } catch (error) {
    console.error('Failed to get envelope status:', error)
    throw error
  }
}

/**
 * エンベロープステータスをデータベースに更新
 */
async function updateEnvelopeStatus(envelopeId: string, status: string) {
  const statusMap: Record<string, any> = {
    'completed': 'COMPLETED',
    'declined': 'DECLINED',
    'voided': 'VOIDED',
    'sent': 'SENT',
  }

  const dbStatus = statusMap[status.toLowerCase()] || 'CREATED'

  await prisma.docuSignEnvelope.update({
    where: { envelopeId },
    data: { 
      status: dbStatus,
      completedAt: dbStatus === 'COMPLETED' ? new Date() : null
    }
  })
}

/**
 * MarkdownコンテンツをPDF Base64に変換
 * 実際の実装では、markdownからPDFへの変換ライブラリを使用
 */
async function convertMarkdownToPdfBase64(markdown: string): Promise<string> {
  // モック実装: 実際はmarkdown-pdfやpuppeteerを使用してPDF生成
  const base64Content = Buffer.from(`
    <html>
      <body>
        <h1>契約書</h1>
        <div>${markdown.replace(/\n/g, '<br>')}</div>
        <br><br>
        <div>署名欄: ____________________</div>
        <div>日付: ____________________</div>
      </body>
    </html>
  `).toString('base64')
  
  return base64Content
}

/**
 * 契約書に関連するDocuSignエンベロープを取得
 */
export async function getContractEnvelopes(contractId: string) {
  return prisma.docuSignEnvelope.findMany({
    where: { contractId },
    include: {
      signers: {
        orderBy: { routingOrder: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}