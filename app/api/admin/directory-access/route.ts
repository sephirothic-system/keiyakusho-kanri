import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { grantDirectoryAccess, revokeDirectoryAccess, requireAdminPermission } from '@/lib/contract-permissions'
import { PrismaClient, Permission } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ディレクトリアクセス権限の一覧取得
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    // 管理者権限チェック
    if (!(await requireAdminPermission(session.user.id))) {
      return NextResponse.json({ error: '管理者権限が必要です' }, { status: 403 })
    }

    // 全ディレクトリアクセス権限を取得
    const directoryAccesses = await prisma.directoryAccess.findMany({
      include: {
        directory: {
          select: {
            id: true,
            name: true,
            path: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                userGroups: true,
              },
            },
          },
        },
      },
      orderBy: [
        { directory: { path: 'asc' } },
        { group: { name: 'asc' } },
      ],
    })

    return NextResponse.json({ directoryAccesses })
  } catch (error) {
    console.error('Directory access GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリアクセス権限の付与/更新
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const { directoryId, groupId, permission } = body

    // バリデーション
    if (!directoryId || typeof directoryId !== 'string') {
      return NextResponse.json({ error: 'ディレクトリIDが必要です' }, { status: 400 })
    }

    if (!groupId || typeof groupId !== 'string') {
      return NextResponse.json({ error: 'グループIDが必要です' }, { status: 400 })
    }

    if (!permission || !Object.values(Permission).includes(permission)) {
      return NextResponse.json({ error: '有効な権限（READ/WRITE）が必要です' }, { status: 400 })
    }

    // 権限付与を実行
    const result = await grantDirectoryAccess(
      session.user.id,
      directoryId,
      groupId,
      permission as Permission
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // 付与された権限の詳細を取得
    const directoryAccess = await prisma.directoryAccess.findUnique({
      where: {
        directoryId_groupId: {
          directoryId,
          groupId,
        },
      },
      include: {
        directory: {
          select: { name: true, path: true },
        },
        group: {
          select: { name: true },
        },
      },
    })

    return NextResponse.json({ 
      message: '権限を付与しました',
      directoryAccess 
    }, { status: 201 })
  } catch (error) {
    console.error('Directory access POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリアクセス権限の削除
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const directoryId = searchParams.get('directoryId')
    const groupId = searchParams.get('groupId')

    // バリデーション
    if (!directoryId) {
      return NextResponse.json({ error: 'ディレクトリIDが必要です' }, { status: 400 })
    }

    if (!groupId) {
      return NextResponse.json({ error: 'グループIDが必要です' }, { status: 400 })
    }

    // 権限削除を実行
    const result = await revokeDirectoryAccess(
      session.user.id,
      directoryId,
      groupId
    )

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: '権限を削除しました' })
  } catch (error) {
    console.error('Directory access DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}