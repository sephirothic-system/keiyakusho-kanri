import { PrismaClient } from '@/lib/generated/prisma'
import { marked } from 'marked'

const prisma = new PrismaClient()

// DocuSign REST APIの設定
const DOCUSIGN_BASE_URL = process.env.DOCUSIGN_BASE_URL || 'https://demo.docusign.net'
const DOCUSIGN_AUTH_BASE_URL = 'https://account-d.docusign.com' // Demo環境の認証エンドポイント
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
 * DocuSign 管理者同意用のURLを生成
 */
export function generateConsentUrl(): string {
  if (!DOCUSIGN_INTEGRATION_KEY) {
    throw new Error('DocuSign Integration Key is not configured')
  }

  const consentUrl = `${DOCUSIGN_AUTH_BASE_URL}/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=${DOCUSIGN_INTEGRATION_KEY}&redirect_uri=http://localhost:3000`
  
  return consentUrl
}

/**
 * JWT認証用のアクセストークンを取得
 */
async function getAccessToken(): Promise<string> {
  console.log('DocuSign credentials check:')
  console.log('INTEGRATION_KEY:', DOCUSIGN_INTEGRATION_KEY ? '設定済み' : '未設定')
  console.log('USER_ID:', DOCUSIGN_USER_ID ? '設定済み' : '未設定')
  console.log('PRIVATE_KEY:', DOCUSIGN_PRIVATE_KEY ? '設定済み' : '未設定')
  console.log('BASE_URL:', DOCUSIGN_BASE_URL)

  if (!DOCUSIGN_INTEGRATION_KEY || !DOCUSIGN_USER_ID || !DOCUSIGN_PRIVATE_KEY) {
    throw new Error('DocuSign credentials are not configured')
  }

  try {
    // JWT作成
    const jwt = require('jsonwebtoken')
    const privateKey = DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, '\n')
    
    console.log('Private key first 50 chars:', privateKey.substring(0, 50))
    
    const jwtPayload = {
      iss: DOCUSIGN_INTEGRATION_KEY,
      sub: DOCUSIGN_USER_ID,
      aud: 'account-d.docusign.com',
      scope: 'signature impersonation',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600 // 1時間
    }

    console.log('JWT payload:', jwtPayload)

    const jwtToken = jwt.sign(jwtPayload, privateKey, { 
      algorithm: 'RS256',
      header: { typ: 'JWT', alg: 'RS256' }
    })

    console.log('JWT token created, length:', jwtToken.length)

    // アクセストークンを取得（正しいエンドポイント）
    const tokenUrl = `${DOCUSIGN_AUTH_BASE_URL}/oauth/token`
    console.log('Token URL:', tokenUrl)

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken
      })
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DocuSign API error response:', errorText)
      
      // consent_requiredエラーの場合は特別な処理
      if (errorText.includes('consent_required')) {
        const consentUrl = generateConsentUrl()
        console.error('DocuSign consent required. Please visit:', consentUrl)
        throw new Error(`DocuSign管理者の同意が必要です。以下のURLにアクセスして同意プロセスを完了してください: ${consentUrl}`)
      }
      
      throw new Error(`DocuSign authentication failed: ${response.status} ${errorText}`)
    }

    const tokenData = await response.json()
    console.log('Token response keys:', Object.keys(tokenData))
    
    if (!tokenData.access_token) {
      console.error('Full token response:', tokenData)
      throw new Error('Access token not received')
    }

    console.log('Access token received successfully')
    return tokenData.access_token
  } catch (error) {
    console.error('DocuSign authentication error details:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
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
 * DocuSign REST APIでエンベロープ（電子契約）を作成
 */
export async function createDocuSignEnvelope(request: CreateEnvelopeRequest): Promise<string> {
  try {
    if (!DOCUSIGN_ACCOUNT_ID) {
      throw new Error('DocuSign Account ID is not configured')
    }

    // アクセストークンを取得
    const accessToken = await getAccessToken()

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

    // DocuSign エンベロープ作成用のペイロード
    const envelopeData = {
      emailSubject: request.subject,
      emailMessage: request.message || '契約書への電子署名をお願いいたします。',
      status: 'sent',
      documents: [
        {
          documentBase64: pdfBase64,
          name: `${contract.title}.pdf`,
          fileExtension: 'pdf',
          documentId: '1'
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
                yPosition: '700'
              }
            ]
          }
        }))
      }
    }

    // DocuSign REST APIでエンベロープを作成
    const response = await fetch(`${DOCUSIGN_BASE_URL}/restapi/v2.1/accounts/${DOCUSIGN_ACCOUNT_ID}/envelopes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(envelopeData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DocuSign envelope creation failed: ${response.status} ${errorText}`)
    }

    const result = await response.json()

    if (!result.envelopeId) {
      throw new Error('エンベロープの作成に失敗しました')
    }

    // データベースにエンベロープ情報を保存
    await prisma.docuSignEnvelope.create({
      data: {
        envelopeId: result.envelopeId,
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

    return result.envelopeId
  } catch (error) {
    console.error('DocuSign envelope creation failed:', error)
    throw error
  }
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