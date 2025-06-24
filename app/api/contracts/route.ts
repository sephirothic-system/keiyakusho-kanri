import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAccessibleContracts } from '@/lib/contract-permissions'

const prisma = new PrismaClient()

// バリデーションスキーマ
const createContractSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(255, 'タイトルは255文字以内で入力してください'),
  content: z.string().default(''),
  directoryId: z.string().min(1, 'ディレクトリは必須です'),
  categoryId: z.string().optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'ACTIVE', 'EXPIRED', 'TERMINATED']).default('DRAFT'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  contractNumber: z.string().optional(),
})

// 契約書の作成
export async function POST(request: NextRequest) {
  try {
    let userId: string

    // テスト環境ではヘッダーからユーザーIDを取得、本番環境ではセッションから取得
    if (process.env.NODE_ENV === 'test') {
      userId = request.headers.get('x-user-id') || 'test-user-id'
    } else {
      // セッション情報を取得
      const session = await getServerSession(authOptions)
      
      if (!session?.user?.id) {
        return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
      }

      userId = session.user.id
    }

    const body = await request.json()

    // バリデーション
    const validatedData = createContractSchema.parse(body)

    // ディレクトリの存在確認
    const directory = await prisma.directory.findUnique({
      where: { id: validatedData.directoryId },
      select: { id: true, name: true }
    })

    if (!directory) {
      return NextResponse.json({ error: '指定されたディレクトリが見つかりません' }, { status: 400 })
    }

    // カテゴリの存在確認（指定されている場合）
    if (validatedData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: validatedData.categoryId },
        select: { id: true }
      })

      if (!category) {
        return NextResponse.json({ error: '指定されたカテゴリが見つかりません' }, { status: 400 })
      }
    }

    // 契約書番号の重複チェック（指定されている場合）
    if (validatedData.contractNumber) {
      const existingContract = await prisma.contract.findUnique({
        where: { contractNumber: validatedData.contractNumber },
        select: { id: true }
      })

      if (existingContract) {
        return NextResponse.json({ error: '指定された契約書番号は既に使用されています' }, { status: 400 })
      }
    }

    // トランザクションで契約書作成と初期バージョンを保存
    const result = await prisma.$transaction(async (tx) => {
      // 契約書を作成
      const contract = await tx.contract.create({
        data: {
          title: validatedData.title,
          content: validatedData.content,
          status: validatedData.status as any,
          contractNumber: validatedData.contractNumber,
          startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
          endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
          ownerId: userId,
          directoryId: validatedData.directoryId,
          categoryId: validatedData.categoryId || null,
        },
        include: {
          owner: { select: { name: true, email: true } },
          directory: { select: { name: true, path: true } },
          category: { select: { name: true, color: true } },
        },
      })

      // 初期バージョンを作成
      await tx.contractVersion.create({
        data: {
          contractId: contract.id,
          version: 1,
          title: validatedData.title,
          content: validatedData.content,
          changeNote: '初回作成',
        },
      })

      return contract
    })

    return NextResponse.json({ contract: result }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contract POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 契約書一覧の取得
export async function GET(request: NextRequest) {
  try {
    let userId: string

    // テスト環境ではヘッダーからユーザーIDを取得、本番環境ではセッションから取得
    if (process.env.NODE_ENV === 'test') {
      userId = request.headers.get('x-user-id') || 'test-user-id'
    } else {
      // セッション情報を取得
      const session = await getServerSession(authOptions)
      
      if (!session?.user?.id) {
        return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
      }

      userId = session.user.id
    }

    const url = new URL(request.url)
    const directoryId = url.searchParams.get('directoryId')
    const status = url.searchParams.get('status')
    const search = url.searchParams.get('search')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '20')

    // 権限チェック済みの契約書一覧を取得
    let accessibleContracts = await getAccessibleContracts(userId)

    // フィルタリング
    if (directoryId) {
      accessibleContracts = accessibleContracts.filter(c => c.directoryId === directoryId)
    }

    if (status) {
      accessibleContracts = accessibleContracts.filter(c => c.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      accessibleContracts = accessibleContracts.filter(c => 
        c.title.toLowerCase().includes(searchLower) ||
        c.content.toLowerCase().includes(searchLower) ||
        (c.contractNumber && c.contractNumber.toLowerCase().includes(searchLower))
      )
    }

    // ページネーション
    const total = accessibleContracts.length
    const skip = (page - 1) * limit
    const contracts = accessibleContracts.slice(skip, skip + limit)

    return NextResponse.json({
      contracts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Contracts GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 