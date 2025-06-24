import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// ディレクトリの詳細取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const directory = await prisma.directory.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      },
      select: {
        id: true,
        name: true,
        path: true,
        description: true,
        parentId: true,
        createdAt: true,
        updatedAt: true,
        children: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            path: true,
          },
          orderBy: { name: 'asc' }
        },
        contracts: {
          select: {
            id: true,
            title: true,
            status: true,
          }
        }
      }
    })

    if (!directory) {
      return NextResponse.json({ error: 'ディレクトリが見つかりません' }, { status: 404 })
    }

    return NextResponse.json({ directory })
  } catch (error) {
    console.error('Directory GET error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリの更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, parentId } = body

    // 既存のディレクトリを確認
    const existingDirectory = await prisma.directory.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      }
    })

    if (!existingDirectory) {
      return NextResponse.json({ error: 'ディレクトリが見つかりません' }, { status: 404 })
    }

    // バリデーション
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'ディレクトリ名は必須です' }, { status: 400 })
    }

    // 自分自身を親にしようとしていないか確認
    if (parentId === params.id) {
      return NextResponse.json({ error: '自分自身を親ディレクトリに設定できません' }, { status: 400 })
    }

    // 循環参照をチェック（簡易版）
    if (parentId) {
      const parentDirectory = await prisma.directory.findUnique({
        where: { id: parentId },
        select: { path: true }
      })
      
      if (!parentDirectory) {
        return NextResponse.json({ error: '親ディレクトリが見つかりません' }, { status: 400 })
      }

      // 親ディレクトリのパスが現在のディレクトリのパスで始まる場合は循環参照
      if (parentDirectory.path.startsWith(existingDirectory.path + '/')) {
        return NextResponse.json({ error: '循環参照が発生します' }, { status: 400 })
      }
    }

    // 新しいパスを生成
    let newPath = name.trim()
    if (parentId) {
      const parentDirectory = await prisma.directory.findUnique({
        where: { id: parentId },
        select: { path: true }
      })
      
      if (parentDirectory) {
        newPath = `${parentDirectory.path}/${name.trim()}`
      }
    }

    // 同じパスのディレクトリが存在しないか確認（自分以外）
    const conflictingDirectory = await prisma.directory.findFirst({
      where: { 
        path: newPath,
        isActive: true,
        NOT: { id: params.id }
      }
    })

    if (conflictingDirectory) {
      return NextResponse.json({ error: '同じ名前のディレクトリが既に存在します' }, { status: 400 })
    }

    // ディレクトリを更新
    const directory = await prisma.directory.update({
      where: { id: params.id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        parentId: parentId || null,
        path: newPath,
      },
      select: {
        id: true,
        name: true,
        path: true,
        description: true,
        parentId: true,
        updatedAt: true,
      }
    })

    // 子ディレクトリのパスも更新
    if (newPath !== existingDirectory.path) {
      await updateChildrenPaths(params.id, existingDirectory.path, newPath)
    }

    return NextResponse.json({ directory })
  } catch (error) {
    console.error('Directory PUT error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ディレクトリの削除（論理削除）
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 削除前にディレクトリの存在確認
    const directory = await prisma.directory.findFirst({
      where: { 
        id: params.id,
        isActive: true 
      },
      include: {
        children: {
          where: { isActive: true }
        },
        contracts: true
      }
    })

    if (!directory) {
      return NextResponse.json({ error: 'ディレクトリが見つかりません' }, { status: 404 })
    }

    // 子ディレクトリが存在する場合は削除を拒否
    if (directory.children.length > 0) {
      return NextResponse.json({ 
        error: '子ディレクトリが存在するため削除できません。先に子ディレクトリを削除してください。' 
      }, { status: 400 })
    }

    // 契約書が存在する場合は削除を拒否
    if (directory.contracts.length > 0) {
      return NextResponse.json({ 
        error: '契約書が存在するため削除できません。先に契約書を移動または削除してください。' 
      }, { status: 400 })
    }

    // 論理削除
    await prisma.directory.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'ディレクトリを削除しました' })
  } catch (error) {
    console.error('Directory DELETE error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// 子ディレクトリのパスを再帰的に更新
async function updateChildrenPaths(directoryId: string, oldPath: string, newPath: string) {
  const children = await prisma.directory.findMany({
    where: { parentId: directoryId }
  })

  for (const child of children) {
    const updatedChildPath = child.path.replace(oldPath, newPath)
    
    await prisma.directory.update({
      where: { id: child.id },
      data: { path: updatedChildPath }
    })

    // 再帰的に子ディレクトリも更新
    await updateChildrenPaths(child.id, child.path, updatedChildPath)
  }
} 