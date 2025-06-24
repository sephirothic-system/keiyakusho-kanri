import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// グループの詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const group = await prisma.group.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        userGroups: {
          select: {
            id: true,
            joinedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
              }
            }
          },
          orderBy: { joinedAt: 'desc' }
        },
        directoryAccess: {
          select: {
            id: true,
            permission: true,
            createdAt: true,
            directory: {
              select: {
                id: true,
                name: true,
                path: true,
                description: true,
              }
            }
          },
          orderBy: { 
            directory: { path: 'asc' }
          }
        }
      }
    })

    if (!group) {
      return NextResponse.json({ error: 'グループが見つかりません' }, { status: 404 })
    }

    return NextResponse.json({ group })
  } catch (error) {
    console.error('Group GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// グループの更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description } = body

    // 既存のグループを確認
    const existingGroup = await prisma.group.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      }
    })

    if (!existingGroup) {
      return NextResponse.json({ error: 'グループが見つかりません' }, { status: 404 })
    }

    // バリデーション
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'グループ名は必須です' }, { status: 400 })
    }

    if (name.trim().length > 100) {
      return NextResponse.json({ error: 'グループ名は100文字以内で入力してください' }, { status: 400 })
    }

    // 同じ名前のグループが存在しないか確認（自分以外）
    const conflictingGroup = await prisma.group.findFirst({
      where: { 
        name: name.trim(),
        isActive: true,
        NOT: { id: params.id }
      }
    })

    if (conflictingGroup) {
      return NextResponse.json({ error: '同じ名前のグループが既に存在します' }, { status: 400 })
    }

    // グループを更新
    const group = await prisma.group.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        updatedAt: true,
        _count: {
          select: {
            userGroups: true,
            directoryAccess: true,
          }
        }
      }
    })

    return NextResponse.json({ group })
  } catch (error) {
    console.error('Group PUT error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// グループの削除（論理削除）
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 削除前にグループの存在確認
    const group = await prisma.group.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      },
      include: {
        userGroups: true,
        directoryAccess: true,
      }
    })

    if (!group) {
      return NextResponse.json({ error: 'グループが見つかりません' }, { status: 404 })
    }

    // メンバーが存在する場合は削除を拒否
    if (group.userGroups.length > 0) {
      return NextResponse.json({ 
        error: 'メンバーが存在するため削除できません。先にメンバーを削除してください。' 
      }, { status: 400 })
    }

    // ディレクトリアクセス権限が存在する場合は削除を拒否
    if (group.directoryAccess.length > 0) {
      return NextResponse.json({ 
        error: 'ディレクトリアクセス権限が設定されているため削除できません。先に権限を削除してください。' 
      }, { status: 400 })
    }

    // 論理削除
    await prisma.group.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'グループを削除しました' })
  } catch (error) {
    console.error('Group DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 