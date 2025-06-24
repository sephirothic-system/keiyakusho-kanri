import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/directories/route'
import { factories, TestDataCleaner } from '../../factories/all'

describe('/api/directories POST', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories-create')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories-create')
  })

  test('有効なデータでディレクトリを作成できる', async () => {
    const requestBody = {
      name: 'test-directories-create-valid',
      description: 'テスト用ディレクトリ',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.directory).toBeDefined()
    expect(result.directory.name).toBe('test-directories-create-valid')
    expect(result.directory.description).toBe('テスト用ディレクトリ')
    expect(result.directory.path).toBe('test-directories-create-valid')
    expect(result.directory.parentId).toBeNull()
    expect(result.directory.id).toBeDefined()
    expect(result.directory.createdAt).toBeDefined()
  })

  test('親ディレクトリありでディレクトリを作成できる', async () => {
    // 親ディレクトリを作成
    const parentDir = await factories.directory.build({
      name: 'test-directories-create-parent',
      path: '/test-directories-create-parent',
    })

    const requestBody = {
      name: 'child',
      description: '子ディレクトリ',
      parentId: parentDir.id,
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.directory.name).toBe('child')
    expect(result.directory.parentId).toBe(parentDir.id)
    expect(result.directory.path).toBe('/test-directories-create-parent/child')
  })

  test('ディレクトリ名が必須', async () => {
    const requestBody = {
      description: 'テスト用ディレクトリ',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('ディレクトリ名は必須です')
  })

  test('空のディレクトリ名でエラー', async () => {
    const requestBody = {
      name: '',
      description: 'テスト用ディレクトリ',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('ディレクトリ名は必須です')
  })

  test('スペースのみのディレクトリ名でエラー', async () => {
    const requestBody = {
      name: '   ',
      description: 'テスト用ディレクトリ',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('ディレクトリ名は必須です')
  })

  test('存在しない親ディレクトリIDでエラー', async () => {
    const requestBody = {
      name: 'test-directories-create-invalid-parent',
      parentId: 'invalid-parent-id',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('親ディレクトリが見つかりません')
  })

  test('同じパスのディレクトリで重複エラー', async () => {
    // 最初のディレクトリを作成
    await factories.directory.build({
      name: 'test-directories-create-duplicate',
      path: 'test-directories-create-duplicate',
    })

    const requestBody = {
      name: 'test-directories-create-duplicate',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.error).toBe('同じ名前のディレクトリが既に存在します')
  })

  test('説明なしでもディレクトリを作成できる', async () => {
    const requestBody = {
      name: 'test-directories-create-no-desc',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.directory.name).toBe('test-directories-create-no-desc')
    expect(result.directory.description).toBeNull()
  })

  test('前後のスペースが削除される', async () => {
    const requestBody = {
      name: '  test-directories-create-trim  ',
      description: '  テスト用ディレクトリ  ',
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.directory.name).toBe('test-directories-create-trim')
    expect(result.directory.description).toBe('テスト用ディレクトリ')
    expect(result.directory.path).toBe('test-directories-create-trim')
  })

  test('長い階層構造のパスが正しく生成される', async () => {
    // 階層構造を作成
    const root = await factories.directory.build({
      name: 'test-directories-create-root',
      path: 'test-directories-create-root',
    })

    const level1 = await factories.directory.build({
      name: 'level1',
      path: 'test-directories-create-root/level1',
      parentId: root.id,
    })

    const requestBody = {
      name: 'level2',
      parentId: level1.id,
    }

    const request = new NextRequest('http://localhost:3000/api/directories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    const response = await POST(request)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.directory.path).toBe('test-directories-create-root/level1/level2')
    expect(result.directory.parentId).toBe(level1.id)
  })
})