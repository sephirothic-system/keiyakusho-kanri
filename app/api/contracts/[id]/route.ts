import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

// 契約書詳細の取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id
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

    // 契約書を取得
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: {
        owner: { select: { name: true, email: true } },
        directory: { select: { name: true, path: true } },
        category: { select: { name: true, color: true } },
        versions: {
          orderBy: { version: 'desc' },
          take: 5, // 最新5バージョンのみ
        },
      },
    })

    if (!contract) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    return NextResponse.json({ contract })
  } catch (error) {
    console.error('Contract GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 契約書の更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id
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

    // 契約書の存在チェック
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { versions: { orderBy: { version: 'desc' }, take: 1 } },
    })

    if (!contract) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    // 基本的な権限チェック（作成者のみ編集可能）
    if (contract.ownerId !== userId) {
      return NextResponse.json({ error: 'この契約書の編集権限がありません' }, { status: 403 })
    }

    // トランザクションで契約書更新とバージョン履歴を保存
    const result = await prisma.$transaction(async tx => {
      // 契約書を更新
      const updatedContract = await tx.contract.update({
        where: { id: contractId },
        data: {
          title: body.title,
          content: body.content,
          status: body.status,
          startDate: body.startDate ? new Date(body.startDate) : null,
          endDate: body.endDate ? new Date(body.endDate) : null,
          categoryId: body.categoryId || null,
        },
        include: {
          owner: { select: { name: true, email: true } },
          directory: { select: { name: true, path: true } },
          category: { select: { name: true, color: true } },
        },
      })

      // バージョン履歴を保存
      const versions = contract.versions || []
      const maxVersion = versions.length > 0 ? Math.max(...versions.map(v => v.version)) : 0
      const nextVersion = maxVersion + 1
      
      await tx.contractVersion.create({
        data: {
          contractId,
          version: nextVersion,
          title: body.title,
          content: body.content,
          changeNote: body.changeNote || '契約書を更新しました',
        },
      })

      return updatedContract
    })

    return NextResponse.json({ contract: result })
  } catch (error) {
    console.error('Contract PUT error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 契約書の削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id
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

    // 契約書の存在チェック
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      select: { id: true, ownerId: true },
    })

    if (!contract) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    // 削除は作成者のみ可能
    if (contract.ownerId !== userId) {
      return NextResponse.json({ error: '契約書の削除は作成者のみ可能です' }, { status: 403 })
    }

    // 契約書を削除（Cascadeで関連データも削除される）
    await prisma.contract.delete({
      where: { id: contractId },
    })

    return NextResponse.json({ message: '契約書が削除されました' })
  } catch (error) {
    console.error('Contract DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
