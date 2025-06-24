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

// ディレクトリの作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, parentId } = body

    // バリデーション
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'ディレクトリ名は必須です' }, { status: 400 })
    }

    // パスの生成
    let path = name.trim()
    if (parentId) {
      const parentDirectory = await prisma.directory.findUnique({
        where: { id: parentId },
        select: { path: true }
      })
      
      if (!parentDirectory) {
        return NextResponse.json({ error: '親ディレクトリが見つかりません' }, { status: 400 })
      }
      
      path = `${parentDirectory.path}/${name.trim()}`
    }

    // 同じパスのディレクトリが存在しないか確認
    const existingDirectory = await prisma.directory.findFirst({
      where: { path, isActive: true }
    })

    if (existingDirectory) {
      return NextResponse.json({ error: '同じ名前のディレクトリが既に存在します' }, { status: 400 })
    }

    // ディレクトリを作成
    const directory = await prisma.directory.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        parentId: parentId || null,
        path,
      },
      select: {
        id: true,
        name: true,
        path: true,
        description: true,
        parentId: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ directory }, { status: 201 })
  } catch (error) {
    console.error('Directory POST error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 