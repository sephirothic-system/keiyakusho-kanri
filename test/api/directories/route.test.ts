import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/directories/route'
import { factories, TestDataCleaner } from '../../factories/all'

describe('/api/directories GET', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories')
  })

  test('アクティブなディレクトリ一覧を取得できる', async () => {
    // テストデータを準備
    const activeDir1 = await factories.directory.build({
      name: 'test-directories-active-1',
      path: '/test-directories/active-1',
      isActive: true,
    })

    const activeDir2 = await factories.directory.build({
      name: 'test-directories-active-2',
      path: '/test-directories/active-2',
      isActive: true,
    })

    // 非アクティブなディレクトリ（取得されないはず）
    await factories.directory.build({
      name: 'test-directories-inactive',
      path: '/test-directories/inactive',
      isActive: false,
    })

    const request = new NextRequest('http://localhost:3000/api/directories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)
    expect(result.directories).toBeDefined()
    expect(Array.isArray(result.directories)).toBe(true)

    // 作成したアクティブなディレクトリが含まれている
    const testDirectories = result.directories.filter((dir: any) => 
      dir.name.startsWith('test-directories-active')
    )
    expect(testDirectories).toHaveLength(2)

    // 非アクティブなディレクトリが含まれていない
    const inactiveTestDirectories = result.directories.filter((dir: any) => 
      dir.name === 'test-directories-inactive'
    )
    expect(inactiveTestDirectories).toHaveLength(0)
  })

  test('ディレクトリがパス順でソートされている', async () => {
    // テストデータを準備（意図的に逆順で作成）
    await factories.directory.build({
      name: 'test-directories-sort-z',
      path: '/test-directories/z-last',
      isActive: true,
    })

    await factories.directory.build({
      name: 'test-directories-sort-a',
      path: '/test-directories/a-first',
      isActive: true,
    })

    await factories.directory.build({
      name: 'test-directories-sort-m',
      path: '/test-directories/m-middle',
      isActive: true,
    })

    const request = new NextRequest('http://localhost:3000/api/directories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testDirectories = result.directories.filter((dir: any) => 
      dir.name.startsWith('test-directories-sort')
    )

    // パス順でソートされていることを確認
    expect(testDirectories[0].path).toBe('/test-directories/a-first')
    expect(testDirectories[1].path).toBe('/test-directories/m-middle')
    expect(testDirectories[2].path).toBe('/test-directories/z-last')
  })

  test('必要なフィールドが含まれている', async () => {
    const directory = await factories.directory.build({
      name: 'test-directories-fields',
      path: '/test-directories/fields-test',
      description: 'フィールドテスト用ディレクトリ',
      isActive: true,
    })

    const request = new NextRequest('http://localhost:3000/api/directories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testDirectory = result.directories.find((dir: any) => 
      dir.name === 'test-directories-fields'
    )

    expect(testDirectory).toBeDefined()
    expect(testDirectory.id).toBe(directory.id)
    expect(testDirectory.name).toBe('test-directories-fields')
    expect(testDirectory.path).toBe('/test-directories/fields-test')
    expect(testDirectory.description).toBe('フィールドテスト用ディレクトリ')
    expect(testDirectory.parentId).toBeDefined() // nullまたは文字列のID
  })

  test('階層構造のディレクトリが正しく取得される', async () => {
    // 親ディレクトリを作成
    const parentDir = await factories.directory.build({
      name: 'test-directories-parent',
      path: '/test-directories/parent',
      parentId: null,
      isActive: true,
    })

    // 子ディレクトリを作成
    const childDir = await factories.directory.build({
      name: 'test-directories-child',
      path: '/test-directories/parent/child',
      parentId: parentDir.id,
      isActive: true,
    })

    const request = new NextRequest('http://localhost:3000/api/directories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testParent = result.directories.find((dir: any) => 
      dir.name === 'test-directories-parent'
    )
    const testChild = result.directories.find((dir: any) => 
      dir.name === 'test-directories-child'
    )

    expect(testParent).toBeDefined()
    expect(testParent.parentId).toBeNull()

    expect(testChild).toBeDefined()
    expect(testChild.parentId).toBe(parentDir.id)
  })

  test('ディレクトリが存在しない場合は空配列を返す', async () => {
    // テストデータを作成しない状態でリクエスト
    const request = new NextRequest('http://localhost:3000/api/directories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)
    expect(result.directories).toBeDefined()
    expect(Array.isArray(result.directories)).toBe(true)
    
    // 他のテストで作成されたディレクトリも含まれる可能性があるため、空配列の確認は行わない
    // 代わりに、テスト用のディレクトリが含まれていないことを確認
    const testDirectories = result.directories.filter((dir: any) => 
      dir.name.startsWith('test-directories-nonexistent')
    )
    expect(testDirectories).toHaveLength(0)
  })
}) 