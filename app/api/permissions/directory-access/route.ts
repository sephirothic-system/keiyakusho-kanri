import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ディレクトリアクセス権限一覧の取得
export async function GET(request: NextRequest) {
  try {
    const directoryAccess = await prisma.directoryAccess.findMany({
      select: {
        id: true,
        permission: true,
        createdAt: true,
        directory: {
          select: {
            id: true,
            name: true,
            path: true,
            description: true
          }
        },
        group: {
          select: {
            id: true,
            name: true,
            description: true,
            _count: {
              select: {
                userGroups: true
              }
            }
          }
        }
      },
      orderBy: [
        { directory: { path: 'asc' } },
        { group: { name: 'asc' } }
      ]
    })

    return NextResponse.json({ directoryAccess })
  } catch (error) {
    console.error('Directory access GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリアクセス権限の作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { directoryId, groupId, permission } = body

    // バリデーション
    if (!directoryId || !groupId || !permission) {
      return NextResponse.json(
        { error: 'ディレクトリ、グループ、権限は必須です' }, 
        { status: 400 }
      )
    }

    if (!['READ', 'WRITE'].includes(permission)) {
      return NextResponse.json(
        { error: '権限は READ または write を指定してください' }, 
        { status: 400 }
      )
    }

    // ディレクトリとグループの存在確認
    const [directory, group] = await Promise.all([
      prisma.directory.findFirst({
        where: { id: directoryId, isActive: true }
      }),
      prisma.group.findFirst({
        where: { id: groupId, isActive: true }
      })
    ])

    if (!directory) {
      return NextResponse.json(
        { error: '指定されたディレクトリが見つかりません' }, 
        { status: 404 }
      )
    }

    if (!group) {
      return NextResponse.json(
        { error: '指定されたグループが見つかりません' }, 
        { status: 404 }
      )
    }

    // 既存のアクセス権限チェック
    const existingAccess = await prisma.directoryAccess.findUnique({
      where: {
        directoryId_groupId: {
          directoryId,
          groupId
        }
      }
    })

    if (existingAccess) {
      return NextResponse.json(
        { error: 'このディレクトリとグループの組み合わせには既にアクセス権限が設定されています' }, 
        { status: 400 }
      )
    }

    // アクセス権限を作成
    const directoryAccess = await prisma.directoryAccess.create({
      data: {
        directoryId,
        groupId,
        permission: permission.toUpperCase()
      },
      select: {
        id: true,
        permission: true,
        createdAt: true,
        directory: {
          select: {
            id: true,
            name: true,
            path: true,
            description: true
          }
        },
        group: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json({ directoryAccess }, { status: 201 })
  } catch (error) {
    console.error('Directory access POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}