import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/groups/route'
import { factories, TestDataCleaner, testPrisma } from '../../factories/all'

describe('/api/groups', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-groups')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-groups')
  })

  describe('GET', () => {
    test('アクティブなグループ一覧を取得できる', async () => {
      const group1 = await factories.group.build({
        name: 'test-groups-get-active-1',
        description: 'テスト用グループ1',
        isActive: true,
      })

      const group2 = await factories.group.build({
        name: 'test-groups-get-active-2',
        description: 'テスト用グループ2',
        isActive: true,
      })

      // 非アクティブなグループ（取得されないはず）
      await factories.group.build({
        name: 'test-groups-get-inactive',
        description: 'テスト用非アクティブグループ',
        isActive: false,
      })

      const request = new NextRequest('http://localhost:3000/api/groups')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.groups).toBeDefined()
      expect(Array.isArray(result.groups)).toBe(true)

      // 作成したアクティブなグループが含まれている
      const testGroups = result.groups.filter((group: any) => 
        group.name.startsWith('test-groups-get-active')
      )
      expect(testGroups).toHaveLength(2)

      // 非アクティブなグループが含まれていない
      const inactiveTestGroups = result.groups.filter((group: any) => 
        group.name === 'test-groups-get-inactive'
      )
      expect(inactiveTestGroups).toHaveLength(0)
    })

    test('必要なフィールドが含まれている', async () => {
      const group = await factories.group.build({
        name: 'test-groups-get-fields',
        description: 'フィールドテスト用グループ',
        isActive: true,
      })

      const request = new NextRequest('http://localhost:3000/api/groups')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      const testGroup = result.groups.find((g: any) => 
        g.name === 'test-groups-get-fields'
      )

      expect(testGroup).toBeDefined()
      expect(testGroup.id).toBe(group.id)
      expect(testGroup.name).toBe('test-groups-get-fields')
      expect(testGroup.description).toBe('フィールドテスト用グループ')
      expect(testGroup.createdAt).toBeDefined()
      expect(testGroup.updatedAt).toBeDefined()
      expect(testGroup._count).toBeDefined()
      expect(testGroup._count.userGroups).toBeDefined()
      expect(testGroup._count.directoryAccess).toBeDefined()
      expect(testGroup.userGroups).toBeDefined()
      expect(testGroup.directoryAccess).toBeDefined()
    })

    test('メンバー情報が含まれる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-get-members',
        description: 'メンバーテスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テストユーザー',
        email: 'test-groups-member@example.com',
      })

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      })

      const request = new NextRequest('http://localhost:3000/api/groups')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      const testGroup = result.groups.find((g: any) => 
        g.name === 'test-groups-get-members'
      )

      expect(testGroup).toBeDefined()
      expect(testGroup.userGroups).toHaveLength(1)
      expect(testGroup.userGroups[0].user.id).toBe(user.id)
      expect(testGroup.userGroups[0].user.name).toBe('テストユーザー')
      expect(testGroup.userGroups[0].user.email).toBe('test-groups-member@example.com')
      expect(testGroup.userGroups[0].joinedAt).toBeDefined()
    })

    test('グループが作成日時でソートされている', async () => {
      // わずかに時間をずらして作成
      const group1 = await factories.group.build({
        name: 'test-groups-get-sort-1',
      })

      await new Promise(resolve => setTimeout(resolve, 10))

      const group2 = await factories.group.build({
        name: 'test-groups-get-sort-2',
      })

      await new Promise(resolve => setTimeout(resolve, 10))

      const group3 = await factories.group.build({
        name: 'test-groups-get-sort-3',
      })

      const request = new NextRequest('http://localhost:3000/api/groups')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      const testGroups = result.groups.filter((group: any) => 
        group.name.startsWith('test-groups-get-sort')
      )

      // 作成日時の降順（新しいものが先）でソートされていることを確認
      expect(testGroups[0].name).toBe('test-groups-get-sort-3')
      expect(testGroups[1].name).toBe('test-groups-get-sort-2')
      expect(testGroups[2].name).toBe('test-groups-get-sort-1')
    })
  })

  describe('POST', () => {
    test('有効なデータでグループを作成できる', async () => {
      const requestBody = {
        name: 'test-groups-post-valid',
        description: 'テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(201)
      expect(result.group).toBeDefined()
      expect(result.group.name).toBe('test-groups-post-valid')
      expect(result.group.description).toBe('テスト用グループ')
      expect(result.group.id).toBeDefined()
      expect(result.group.createdAt).toBeDefined()
      expect(result.group._count).toBeDefined()
      expect(result.group._count.userGroups).toBe(0)
      expect(result.group._count.directoryAccess).toBe(0)
    })

    test('グループ名が必須', async () => {
      const requestBody = {
        description: 'テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は必須です')
    })

    test('空のグループ名でエラー', async () => {
      const requestBody = {
        name: '',
        description: 'テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は必須です')
    })

    test('スペースのみのグループ名でエラー', async () => {
      const requestBody = {
        name: '   ',
        description: 'テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は必須です')
    })

    test('長すぎるグループ名でエラー', async () => {
      const longName = 'a'.repeat(101) // 101文字

      const requestBody = {
        name: longName,
        description: 'テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は100文字以内で入力してください')
    })

    test('同じ名前のグループで重複エラー', async () => {
      // 最初のグループを作成
      await factories.group.build({
        name: 'test-groups-post-duplicate',
        isActive: true,
      })

      const requestBody = {
        name: 'test-groups-post-duplicate',
        description: '重複テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('同じ名前のグループが既に存在します')
    })

    test('説明なしでもグループを作成できる', async () => {
      const requestBody = {
        name: 'test-groups-post-no-desc',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(201)
      expect(result.group.name).toBe('test-groups-post-no-desc')
      expect(result.group.description).toBeNull()
    })

    test('前後のスペースが削除される', async () => {
      const requestBody = {
        name: '  test-groups-post-trim  ',
        description: '  テスト用グループ  ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(201)
      expect(result.group.name).toBe('test-groups-post-trim')
      expect(result.group.description).toBe('テスト用グループ')
    })

    test('非アクティブなグループと同じ名前の場合もエラーになる', async () => {
      // 非アクティブなグループを作成
      await factories.group.build({
        name: 'test-groups-post-inactive-dup',
        isActive: false,
      })

      const requestBody = {
        name: 'test-groups-post-inactive-dup',
        description: '非アクティブ重複テスト用グループ',
      }

      const request = new NextRequest('http://localhost:3000/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const result = await response.json()

      expect(response.status).toBe(500)
      expect(result.error).toBe('サーバーエラーが発生しました')
    })
  })
}) 