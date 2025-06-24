import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { checkContractPermission } from '@/lib/contract-permissions'

const prisma = new PrismaClient()

// 契約書詳細の取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id
    // 実際の実装では認証からuserIdを取得
    const userId = request.headers.get('x-user-id') || 'mock-user-id'

    // まず契約書の存在をチェック
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

    return NextResponse.json({
      contract,
      permission: {
        canRead: permission.canRead,
        canWrite: permission.canWrite,
        accessType: permission.accessType,
      },
    })
  } catch (error) {
    console.error('Contract GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 契約書の更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contractId = params.id
    const userId = request.headers.get('x-user-id') || 'mock-user-id'
    const body = await request.json()

    // まず契約書の存在をチェック
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
      return NextResponse.json({ error: 'この契約書の編集権限がありません' }, { status: 403 })
    }

    // 現在の契約書を取得（バージョン管理のため）
    const currentContract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { versions: { orderBy: { version: 'desc' }, take: 1 } },
    })

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
          categoryId: body.categoryId,
        },
        include: {
          owner: { select: { name: true, email: true } },
          directory: { select: { name: true, path: true } },
          category: { select: { name: true, color: true } },
        },
      })

      // バージョン履歴を保存
      const versions = currentContract?.versions || []
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
    const userId = request.headers.get('x-user-id') || 'mock-user-id'

    // まず契約書の存在をチェック
    const contractExists = await prisma.contract.findUnique({
      where: { id: contractId },
      select: { id: true },
    })

    if (!contractExists) {
      return NextResponse.json({ error: '契約書が見つかりません' }, { status: 404 })
    }

    // 権限チェック（削除はオーナーのみ可能）
    const permission = await checkContractPermission(userId, contractId)
    if (permission.accessType !== 'owner') {
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
