import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { checkContractPermission } from '@/lib/contract-permissions'
import { createDocuSignEnvelope, getContractEnvelopes } from '@/lib/docusign'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// 電子契約の開始
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: contractId } = await params
    
    // セッション情報を取得
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const userId = session.user.id

    // リクエストボディを取得
    const body = await request.json()
    const { signers, subject, message } = body

    // バリデーション
    if (!signers || !Array.isArray(signers) || signers.length === 0) {
      return NextResponse.json({ error: '署名者の情報が必要です' }, { status: 400 })
    }

    if (!subject || typeof subject !== 'string') {
      return NextResponse.json({ error: '件名が必要です' }, { status: 400 })
    }

    // 署名者のバリデーション
    for (const signer of signers) {
      if (!signer.email || !signer.name) {
        return NextResponse.json({ error: '署名者のメールアドレスと名前が必要です' }, { status: 400 })
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signer.email)) {
        return NextResponse.json({ error: '有効なメールアドレスを入力してください' }, { status: 400 })
      }
    }

    // 契約書の存在チェック
    const contractExists = await prisma.contract.findUnique({
      where: { id: contractId },
      select: { id: true },
    })

    if (!contractExists) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    // 権限チェック
    const permission = await checkContractPermission(userId, contractId)
    if (!permission.canWrite) {
      return NextResponse.json({ error: 'この契約書の電子契約を開始する権限がありません' }, { status: 403 })
    }

    // 署名者にroutingOrderを設定
    const signersWithOrder = signers.map((signer: any, index: number) => ({
      ...signer,
      routingOrder: index + 1
    }))

    // DocuSign エンベロープを作成
    const envelopeId = await createDocuSignEnvelope({
      contractId,
      subject,
      message,
      signers: signersWithOrder
    })

    return NextResponse.json({ 
      success: true,
      envelopeId,
      message: '電子契約が開始されました。署名者にメールが送信されます。'
    })
  } catch (error) {
    console.error('DocuSign envelope creation error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : '電子契約の開始に失敗しました' 
    }, { status: 500 })
  }
}

// 契約書のDocuSignエンベロープ一覧を取得
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: contractId } = await params
    
    // セッション情報を取得
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const userId = session.user.id

    // 契約書の存在チェック
    const contractExists = await prisma.contract.findUnique({
      where: { id: contractId },
      select: { id: true },
    })

    if (!contractExists) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    // 権限チェック
    const permission = await checkContractPermission(userId, contractId)
    if (!permission.canRead) {
      return NextResponse.json({ error: 'この契約書へのアクセス権限がありません' }, { status: 403 })
    }

    // DocuSignエンベロープ一覧を取得
    const envelopes = await getContractEnvelopes(contractId)

    return NextResponse.json({ envelopes })
  } catch (error) {
    console.error('Get envelopes error:', error)
    return NextResponse.json({ 
      error: 'DocuSignエンベロープの取得に失敗しました' 
    }, { status: 500 })
  }
}