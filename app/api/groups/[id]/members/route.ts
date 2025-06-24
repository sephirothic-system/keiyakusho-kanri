import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// グループにメンバーを追加
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { userId } = body

    // バリデーション
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'ユーザーIDは必須です' }, { status: 400 })
    }

    // グループの存在確認
    const group = await prisma.group.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      }
    })

    if (!group) {
      return NextResponse.json({ error: 'グループが見つかりません' }, { status: 404 })
    }

    // ユーザーの存在確認
    const user = await prisma.user.findFirst({
      where: { 
        id: userId,
        isActive: true 
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 })
    }

    // 既に参加済みかチェック
    const existingMembership = await prisma.userGroup.findFirst({
      where: {
        userId,
        groupId: params.id,
      }
    })

    if (existingMembership) {
      return NextResponse.json({ error: 'ユーザーは既にこのグループのメンバーです' }, { status: 400 })
    }

    // メンバーシップを作成
    const membership = await prisma.userGroup.create({
      data: {
        userId,
        groupId: params.id,
      },
      select: {
        id: true,
        joinedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json({ membership }, { status: 201 })
  } catch (error) {
    console.error('Group member POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// グループからメンバーを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // バリデーション
    if (!userId) {
      return NextResponse.json({ error: 'ユーザーIDは必須です' }, { status: 400 })
    }

    // メンバーシップの存在確認
    const membership = await prisma.userGroup.findFirst({
      where: {
        userId,
        groupId: params.id,
      }
    })

    if (!membership) {
      return NextResponse.json({ error: 'ユーザーはこのグループのメンバーではありません' }, { status: 404 })
    }

    // メンバーシップを削除
    await prisma.userGroup.delete({
      where: { id: membership.id }
    })

    return NextResponse.json({ message: 'メンバーを削除しました' })
  } catch (error) {
    console.error('Group member DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 