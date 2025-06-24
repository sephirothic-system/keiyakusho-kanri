import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contracts/route'
import { factories, TestDataCleaner } from '../../factories/all'

describe('/api/contracts POST', () => {
  beforeEach(async () => {
    // テストデータをクリーンアップ
    await TestDataCleaner.cleanByPrefix('test-contract-create')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-contract-create')
  })

  test('有効なデータで契約書を作成できる', async () => {
    // テストデータを準備
    const user = await factories.user.build({ name: 'test-contract-create-user' })
    const directory = await factories.directory.build({ name: 'test-contract-create-dir' })
    const category = await factories.category.build({ name: 'test-contract-create-cat' })

    const requestBody = {
      title: 'test-contract-create-title',
      content: '# テスト契約書\n\nこれはテスト用の契約書です。',
      directoryId: directory.id,
      categoryId: category.id,
      status: 'DRAFT',
      contractNumber: 'TEST-CREATE-001',
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2024-12-31T23:59:59.999Z',
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.contract).toBeDefined()
    expect(result.contract.title).toBe('test-contract-create-title')
    expect(result.contract.content).toBe('# テスト契約書\n\nこれはテスト用の契約書です。')
    expect(result.contract.status).toBe('DRAFT')
    expect(result.contract.contractNumber).toBe('TEST-CREATE-001')
    expect(result.contract.ownerId).toBe(user.id)
    expect(result.contract.directoryId).toBe(directory.id)
    expect(result.contract.categoryId).toBe(category.id)
    expect(result.contract.owner).toBeDefined()
    expect(result.contract.directory).toBeDefined()
    expect(result.contract.category).toBeDefined()
  })

  test('必須フィールドが不足している場合はエラーになる', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-required' })

    const requestBody = {
      content: 'テスト内容',
      // titleとdirectoryIdが不足
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('バリデーションエラー')
    expect(result.details).toBeDefined()
    expect(result.details.some((error: any) => error.path.includes('title'))).toBe(true)
    expect(result.details.some((error: any) => error.path.includes('directoryId'))).toBe(true)
  })

  test('存在しないディレクトリIDの場合はエラーになる', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-invalid-dir' })

    const requestBody = {
      title: 'テスト契約書',
      content: 'テスト内容',
      directoryId: 'invalid-directory-id',
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('指定されたディレクトリが見つかりません')
  })

  test('存在しないカテゴリIDの場合はエラーになる', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-invalid-cat' })
    const directory = await factories.directory.build({ name: 'test-contract-create-dir-invalid-cat' })

    const requestBody = {
      title: 'テスト契約書',
      content: 'テスト内容',
      directoryId: directory.id,
      categoryId: 'invalid-category-id',
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('指定されたカテゴリが見つかりません')
  })

  test('重複した契約書番号の場合はエラーになる', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-duplicate' })
    const directory = await factories.directory.build({ name: 'test-contract-create-dir-duplicate' })
    
    // 先に契約書を作成
    await factories.contract.build({
      title: 'test-contract-create-existing',
      contractNumber: 'DUPLICATE-001',
      ownerId: user.id,
      directoryId: directory.id,
    })

    const requestBody = {
      title: 'テスト契約書',
      content: 'テスト内容',
      directoryId: directory.id,
      contractNumber: 'DUPLICATE-001', // 重複
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('指定された契約書番号は既に使用されています')
  })

  test('カテゴリIDが空文字の場合は正常に作成される', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-empty-cat' })
    const directory = await factories.directory.build({ name: 'test-contract-create-dir-empty-cat' })

    const requestBody = {
      title: 'テスト契約書',
      content: 'テスト内容',
      directoryId: directory.id,
      categoryId: '', // 空文字
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.contract.categoryId).toBeNull()
    expect(result.contract.category).toBeNull()
  })

  test('契約書作成時にバージョン1が自動作成される', async () => {
    const user = await factories.user.build({ name: 'test-contract-create-user-version' })
    const directory = await factories.directory.build({ name: 'test-contract-create-dir-version' })

    const requestBody = {
      title: 'バージョン管理テスト',
      content: '# バージョン1\n\n初回作成',
      directoryId: directory.id,
    }

    const request = new NextRequest('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)

    // 作成された契約書のバージョンを確認
    const { PrismaClient } = await import('@/lib/generated/prisma')
    const prisma = new PrismaClient()
    
    const versions = await prisma.contractVersion.findMany({
      where: { contractId: result.contract.id },
      orderBy: { version: 'asc' },
    })

    expect(versions).toHaveLength(1)
    expect(versions[0].version).toBe(1)
    expect(versions[0].title).toBe('バージョン管理テスト')
    expect(versions[0].content).toBe('# バージョン1\n\n初回作成')
    expect(versions[0].changeNote).toBe('初回作成')
  })
}) 