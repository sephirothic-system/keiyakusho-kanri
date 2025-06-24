import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// グループ一覧の取得
export async function GET(request: NextRequest) {
  try {
    const groups = await prisma.group.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            userGroups: true,
            directoryAccess: true,
          }
        },
        userGroups: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            },
            joinedAt: true,
          },
          orderBy: { joinedAt: 'desc' }
        },
        directoryAccess: {
          select: {
            permission: true,
            directory: {
              select: {
                id: true,
                name: true,
                path: true,
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Groups GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// グループの作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description } = body

    // バリデーション
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'グループ名は必須です' }, { status: 400 })
    }

    if (name.trim().length > 100) {
      return NextResponse.json({ error: 'グループ名は100文字以内で入力してください' }, { status: 400 })
    }

    // 同じ名前のグループが存在しないか確認
    const existingGroup = await prisma.group.findFirst({
      where: { 
        name: name.trim(),
        isActive: true 
      }
    })

    if (existingGroup) {
      return NextResponse.json({ error: '同じ名前のグループが既に存在します' }, { status: 400 })
    }

    // グループを作成
    const group = await prisma.group.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        _count: {
          select: {
            userGroups: true,
            directoryAccess: true,
          }
        }
      }
    })

    return NextResponse.json({ group }, { status: 201 })
  } catch (error) {
    console.error('Group POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 