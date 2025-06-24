import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ディレクトリ一覧の取得
export async function GET(request: NextRequest) {
  try {
    const directories = await prisma.directory.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        path: true,
        description: true,
        parentId: true,
      },
      orderBy: { path: 'asc' },
    })

    return NextResponse.json({ directories })
  } catch (error) {
    console.error('Directories GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 