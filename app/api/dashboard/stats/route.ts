import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

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

    // 統計情報を並列で取得
    const [
      totalContracts,
      activeContracts,
      totalDirectories,
      userGroups,
      contractsByStatus
    ] = await Promise.all([
      // 総契約書数
      prisma.contract.count({
        where: { ownerId: userId }
      }),
      
      // アクティブ契約数
      prisma.contract.count({
        where: { 
          ownerId: userId,
          status: 'ACTIVE'
        }
      }),
      
      // ディレクトリ数
      prisma.directory.count({
        where: { isActive: true }
      }),
      
      // 参加グループ数
      prisma.userGroup.count({
        where: { userId }
      }),
      
      // ステータス別契約書数
      prisma.contract.groupBy({
        by: ['status'],
        where: { ownerId: userId },
        _count: { id: true }
      })
    ])

    // ステータス別契約書数を整理
    const statusStats = {
      DRAFT: 0,
      REVIEW: 0,
      ACTIVE: 0,
      EXPIRED: 0,
      TERMINATED: 0
    }

    contractsByStatus.forEach(stat => {
      statusStats[stat.status] = stat._count.id
    })

    const stats = {
      totalContracts,
      activeContracts,
      totalDirectories,
      userGroups,
      contractsByStatus: statusStats
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 