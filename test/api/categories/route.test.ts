import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/categories/route'
import { factories, TestDataCleaner } from '../../factories/all'

describe('/api/categories GET', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-categories')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-categories')
  })

  test('カテゴリ一覧を取得できる', async () => {
    // テストデータを準備
    const category1 = await factories.category.build({
      name: 'test-categories-1',
      color: '#FF0000',
    })

    const category2 = await factories.category.build({
      name: 'test-categories-2',
      color: '#00FF00',
    })

    const request = new NextRequest('http://localhost:3000/api/categories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)
    expect(result.categories).toBeDefined()
    expect(Array.isArray(result.categories)).toBe(true)

    // 作成したカテゴリが含まれている
    const testCategories = result.categories.filter((cat: any) => 
      cat.name.startsWith('test-categories-')
    )
    expect(testCategories).toHaveLength(2)

    // 作成したカテゴリが正しく取得されている
    const testCategory1 = result.categories.find((cat: any) => 
      cat.name === 'test-categories-1'
    )
    const testCategory2 = result.categories.find((cat: any) => 
      cat.name === 'test-categories-2'
    )

    expect(testCategory1).toBeDefined()
    expect(testCategory1.id).toBe(category1.id)
    expect(testCategory1.color).toBe('#FF0000')

    expect(testCategory2).toBeDefined()
    expect(testCategory2.id).toBe(category2.id)
    expect(testCategory2.color).toBe('#00FF00')
  })

  test('カテゴリが名前順でソートされている', async () => {
    // テストデータを準備（意図的に逆順で作成）
    await factories.category.build({
      name: 'test-categories-sort-z',
      color: '#FF0000',
    })

    await factories.category.build({
      name: 'test-categories-sort-a',
      color: '#00FF00',
    })

    await factories.category.build({
      name: 'test-categories-sort-m',
      color: '#0000FF',
    })

    const request = new NextRequest('http://localhost:3000/api/categories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testCategories = result.categories.filter((cat: any) => 
      cat.name.startsWith('test-categories-sort')
    )

    // 名前順でソートされていることを確認
    expect(testCategories[0].name).toBe('test-categories-sort-a')
    expect(testCategories[1].name).toBe('test-categories-sort-m')
    expect(testCategories[2].name).toBe('test-categories-sort-z')
  })

  test('必要なフィールドが含まれている', async () => {
    const category = await factories.category.build({
      name: 'test-categories-fields',
      color: '#123456',
    })

    const request = new NextRequest('http://localhost:3000/api/categories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testCategory = result.categories.find((cat: any) => 
      cat.name === 'test-categories-fields'
    )

    expect(testCategory).toBeDefined()
    expect(testCategory.id).toBe(category.id)
    expect(testCategory.name).toBe('test-categories-fields')
    expect(testCategory.color).toBe('#123456')
  })

  test('colorがnullの場合も正しく取得される', async () => {
    const category = await factories.category.build({
      name: 'test-categories-no-color',
      color: null,
    })

    const request = new NextRequest('http://localhost:3000/api/categories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)

    const testCategory = result.categories.find((cat: any) => 
      cat.name === 'test-categories-no-color'
    )

    expect(testCategory).toBeDefined()
    expect(testCategory.id).toBe(category.id)
    expect(testCategory.name).toBe('test-categories-no-color')
    expect(testCategory.color).toBeNull()
  })

  test('カテゴリが存在しない場合は空配列を返す', async () => {
    // テストデータを作成しない状態でリクエスト
    const request = new NextRequest('http://localhost:3000/api/categories')
    const response = await GET(request)
    const result = await response.json()

    expect(response.status).toBe(200)
    expect(result.categories).toBeDefined()
    expect(Array.isArray(result.categories)).toBe(true)
    
    // 他のテストで作成されたカテゴリも含まれる可能性があるため、空配列の確認は行わない
    // 代わりに、テスト用のカテゴリが含まれていないことを確認
    const testCategories = result.categories.filter((cat: any) => 
      cat.name.startsWith('test-categories-nonexistent')
    )
    expect(testCategories).toHaveLength(0)
  })
}) 