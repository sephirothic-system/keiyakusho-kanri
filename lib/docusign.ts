import { PrismaClient } from '@/lib/generated/prisma'
import jwt from 'jsonwebtoken'
import { marked } from 'marked'

const prisma = new PrismaClient()

// DocuSign APIの設定
const DOCUSIGN_BASE_URL = (process.env.DOCUSIGN_BASE_URL || 'https://demo.docusign.net') + '/restapi'
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
  uri?: string
}

/**
 * JWT認証用のアクセストークンを取得
 */
async function getAccessToken(): Promise<string> {
  if (!DOCUSIGN_INTEGRATION_KEY || !DOCUSIGN_USER_ID || !DOCUSIGN_PRIVATE_KEY) {
    throw new Error('DocuSign credentials are not configured')
  }

  try {
    // JWTペイロードを作成
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 3600 // 1時間後に期限切れ

    const jwtPayload = {
      iss: DOCUSIGN_INTEGRATION_KEY,
      sub: DOCUSIGN_USER_ID,
      aud: 'account-d.docusign.com', // Demo環境の場合
      iat,
      exp,
      scope: 'signature impersonation'
    }

    // RSA秘密鍵を使用してJWTを署名
    const privateKey = DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, '\n')
    const token = jwt.sign(jwtPayload, privateKey, { algorithm: 'RS256' })

    // DocuSign OAuth2エンドポイントからアクセストークンを取得
    const response = await fetch('https://account-d.docusign.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`JWT authentication failed: ${response.status} ${errorText}`)
    }

    const authData = await response.json()
    return authData.access_token
  } catch (error) {
    console.error('DocuSign authentication error:', error)
    throw new Error('DocuSign認証に失敗しました')
  }
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
 * MarkdownコンテンツをPDF Base64に変換
 */
async function convertMarkdownToPdfBase64(markdown: string, title: string): Promise<string> {
  let browser: any = null
  
  try {
    const puppeteer = await import('puppeteer')
    
    // MarkdownをHTMLに変換
    const htmlContent = await marked(markdown)
    
    // HTMLドキュメントを作成
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          body {
            font-family: 'Noto Sans JP', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 2em;
            margin-bottom: 1em;
            color: #2c3e50;
          }
          h1 { font-size: 2.5em; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
          h2 { font-size: 2em; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px; }
          h3 { font-size: 1.5em; }
          p { margin-bottom: 1.2em; }
          ul, ol { margin-bottom: 1.2em; padding-left: 2em; }
          li { margin-bottom: 0.5em; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 2em; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .signature-area {
            margin-top: 60px;
            border-top: 2px solid #ecf0f1;
            padding-top: 40px;
          }
          .signature-box {
            border: 1px solid #bdc3c7;
            height: 80px;
            margin: 20px 0;
            position: relative;
          }
          .signature-label {
            position: absolute;
            top: -10px;
            left: 10px;
            background: white;
            padding: 0 10px;
            font-size: 0.9em;
            color: #7f8c8d;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
        <div class="signature-area">
          <h3>署名欄</h3>
          <div class="signature-box">
            <div class="signature-label">署名</div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <div>署名者氏名: _____________________</div>
            <div>日付: _____________________</div>
          </div>
        </div>
      </body>
      </html>
    `

    // Puppeteerを使用してPDFを生成
    browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: 'networkidle2' })
    
    const pdfBuffer = await page.pdf({
      format: 'A4' as const,
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true
    })

    return Buffer.from(pdfBuffer).toString('base64')
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('PDF生成に失敗しました')
  } finally {
    if (browser) {
      await browser.close()
    }
  }
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

    // PDFドキュメントを生成
    const pdfBase64 = await convertMarkdownToPdfBase64(contract.content, contract.title)

    // DocuSign エンベロープの作成リクエスト
    const envelopeDefinition = {
      emailSubject: request.subject,
      emailMessage: request.message || '契約書への電子署名をお願いいたします。',
      status: 'sent',
      documents: [
        {
          documentId: '1',
          name: `${contract.title}.pdf`,
          documentBase64: pdfBase64,
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
    await prisma.docuSignEnvelope.create({
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
    const result = await makeDocuSignRequest(`/envelopes/${envelopeId}`)
    
    // データベースのステータスも更新
    await updateEnvelopeStatus(envelopeId, result.status || 'unknown')
    
    return result
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
    'created': 'CREATED',
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

/**
 * エンベロープのサーナー用リンクを取得
 */
export async function getSigningUrl(envelopeId: string, signerEmail: string, returnUrl?: string): Promise<string> {
  try {
    const recipientViewRequest = {
      authenticationMethod: 'none',
      email: signerEmail,
      returnUrl: returnUrl || `${process.env.NEXTAUTH_URL}/contracts`,
      userName: signerEmail
    }

    const result = await makeDocuSignRequest(
      `/envelopes/${envelopeId}/views/recipient`,
      'POST',
      { recipientViewRequest }
    )

    return result.url || ''
  } catch (error) {
    console.error('Failed to get signing URL:', error)
    throw new Error('署名URLの取得に失敗しました')
  }
}