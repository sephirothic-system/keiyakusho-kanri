import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ユーザー一覧の取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const excludeGroupId = searchParams.get('excludeGroupId')

    let users
    
    if (excludeGroupId) {
      // 特定のグループに属していないユーザーのみを取得
      users = await prisma.user.findMany({
        where: {
          isActive: true,
          userGroups: {
            none: {
              groupId: excludeGroupId
            }
          }
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: { name: 'asc' },
      })
    } else {
      // 全てのアクティブユーザーを取得
      users = await prisma.user.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          _count: {
            select: {
              userGroups: true,
              ownedContracts: true,
            }
          }
        },
        orderBy: { name: 'asc' },
      })
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Users GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 