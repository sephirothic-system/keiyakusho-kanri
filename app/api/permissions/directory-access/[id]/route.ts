import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ディレクトリアクセス権限の更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { permission } = body
    const accessId = params.id

    // バリデーション
    if (!permission) {
      return NextResponse.json(
        { error: '権限は必須です' }, 
        { status: 400 }
      )
    }

    if (!['READ', 'WRITE'].includes(permission)) {
      return NextResponse.json(
        { error: '権限は read または write を指定してください' }, 
        { status: 400 }
      )
    }

    // アクセス権限の存在確認
    const existingAccess = await prisma.directoryAccess.findUnique({
      where: { id: accessId }
    })

    if (!existingAccess) {
      return NextResponse.json(
        { error: 'アクセス権限が見つかりません' }, 
        { status: 404 }
      )
    }

    // アクセス権限を更新
    const directoryAccess = await prisma.directoryAccess.update({
      where: { id: accessId },
      data: {
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

    return NextResponse.json({ directoryAccess })
  } catch (error) {
    console.error('Directory access PUT error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリアクセス権限の削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessId = params.id

    // アクセス権限の存在確認
    const existingAccess = await prisma.directoryAccess.findUnique({
      where: { id: accessId }
    })

    if (!existingAccess) {
      return NextResponse.json(
        { error: 'アクセス権限が見つかりません' }, 
        { status: 404 }
      )
    }

    // アクセス権限を削除
    await prisma.directoryAccess.delete({
      where: { id: accessId }
    })

    return NextResponse.json({ 
      message: 'アクセス権限を削除しました',
      deletedId: accessId 
    })
  } catch (error) {
    console.error('Directory access DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}