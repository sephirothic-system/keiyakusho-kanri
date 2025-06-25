import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // ページネーションのバリデーション
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'ページネーションパラメータが不正です' }, 
        { status: 400 }
      )
    }

    const directoryId = params.id

    // ディレクトリの存在確認
    const directory = await prisma.directory.findFirst({
      where: { 
        id: directoryId,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        path: true,
        description: true
      }
    })

    if (!directory) {
      return NextResponse.json(
        { error: 'ディレクトリが見つかりません' }, 
        { status: 404 }
      )
    }

    const skip = (page - 1) * limit

    // 検索条件の構築
    const where: any = {
      directoryId,
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive' as const
        }
      })
    }

    // 契約書の取得（新しい順）
    const [contracts, totalCount] = await Promise.all([
      prisma.contract.findMany({
        where,
        select: {
          id: true,
          title: true,
          status: true,
          contractNumber: true,
          startDate: true,
          endDate: true,
          createdAt: true,
          updatedAt: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: {
            select: {
              id: true,
              name: true,
              color: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.contract.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      contracts,
      directory,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },
      search
    })
  } catch (error) {
    console.error('Directory contracts GET error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' }, 
      { status: 500 }
    )
  }
}