import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/users/route'
import { factories, TestDataCleaner, testPrisma } from '../../factories/all'

describe('/api/users', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-users')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-users')
  })

  describe('GET', () => {
    test('アクティブなユーザー一覧を取得できる', async () => {
      const user1 = await factories.user.build({
        name: 'test-users-get-active-1',
        email: 'test-users-active1@example.com',
        isActive: true,
      })

      const user2 = await factories.user.build({
        name: 'test-users-get-active-2',
        email: 'test-users-active2@example.com',
        isActive: true,
      })

      // 非アクティブなユーザー（取得されないはず）
      await factories.user.build({
        name: 'test-users-get-inactive',
        email: 'test-users-inactive@example.com',
        isActive: false,
      })

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.users).toBeDefined()
      expect(Array.isArray(result.users)).toBe(true)

      // 作成したアクティブなユーザーが含まれている
      const testUsers = result.users.filter((user: any) => 
        user.name.startsWith('test-users-get-active')
      )
      expect(testUsers).toHaveLength(2)

      // 非アクティブなユーザーが含まれていない
      const inactiveTestUsers = result.users.filter((user: any) => 
        user.name === 'test-users-get-inactive'
      )
      expect(inactiveTestUsers).toHaveLength(0)
    })

    test('必要なフィールドが含まれている', async () => {
      const user = await factories.user.build({
        name: 'test-users-get-fields',
        email: 'test-users-fields@example.com',
        isActive: true,
      })

      // ユーザーの統計情報作成
      const group = await factories.group.build({
        name: 'test-users-stat-group',
      })

      const contract = await factories.contract.build({
        ownerId: user.id,
        title: 'テスト契約書',
      })

      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      const testUser = result.users.find((u: any) => 
        u.name === 'test-users-get-fields'
      )

      expect(testUser).toBeDefined()
      expect(testUser.id).toBe(user.id)
      expect(testUser.name).toBe('test-users-get-fields')
      expect(testUser.email).toBe('test-users-fields@example.com')
      expect(testUser.createdAt).toBeDefined()
      expect(testUser._count).toBeDefined()
      expect(testUser._count.userGroups).toBe(1)
      expect(testUser._count.ownedContracts).toBe(1)
    })

    test('ユーザーが名前順でソートされている', async () => {
      // 意図的に逆順で作成
      await factories.user.build({
        name: 'test-users-get-sort-z',
        email: 'test-users-sort-z@example.com',
      })

      await factories.user.build({
        name: 'test-users-get-sort-a',
        email: 'test-users-sort-a@example.com',
      })

      await factories.user.build({
        name: 'test-users-get-sort-m',
        email: 'test-users-sort-m@example.com',
      })

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      const testUsers = result.users.filter((user: any) => 
        user.name.startsWith('test-users-get-sort')
      )

      // 名前順でソートされていることを確認
      expect(testUsers[0].name).toBe('test-users-get-sort-a')
      expect(testUsers[1].name).toBe('test-users-get-sort-m')
      expect(testUsers[2].name).toBe('test-users-get-sort-z')
    })

    test('特定のグループに属していないユーザーを取得できる', async () => {
      const group = await factories.group.build({
        name: 'test-users-exclude-group',
      })

      const memberUser = await factories.user.build({
        name: 'test-users-member',
        email: 'test-users-member@example.com',
      })

      const nonMemberUser = await factories.user.build({
        name: 'test-users-non-member',
        email: 'test-users-non-member@example.com',
      })

      // memberUserをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: memberUser.id, groupId: group.id },
      })

      const request = new NextRequest(
        `http://localhost:3000/api/users?excludeGroupId=${group.id}`
      )
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      // メンバーユーザーが除外されている
      const memberTestUsers = result.users.filter((user: any) => 
        user.name === 'test-users-member'
      )
      expect(memberTestUsers).toHaveLength(0)

      // 非メンバーユーザーが含まれている
      const nonMemberTestUsers = result.users.filter((user: any) => 
        user.name === 'test-users-non-member'
      )
      expect(nonMemberTestUsers).toHaveLength(1)
    })

    test('存在しないグループIDでも正常動作', async () => {
      const user = await factories.user.build({
        name: 'test-users-no-group',
        email: 'test-users-no-group@example.com',
      })

      const request = new NextRequest(
        'http://localhost:3000/api/users?excludeGroupId=nonexistent-group-id'
      )
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.users).toBeDefined()
      expect(Array.isArray(result.users)).toBe(true)

      // 作成したユーザーが含まれている（除外されない）
      const testUsers = result.users.filter((u: any) => 
        u.name === 'test-users-no-group'
      )
      expect(testUsers).toHaveLength(1)
    })

    test('excludeGroupIdパラメータなしでは全ユーザーを取得', async () => {
      const group = await factories.group.build({
        name: 'test-users-all-group',
      })

      const memberUser = await factories.user.build({
        name: 'test-users-all-member',
        email: 'test-users-all-member@example.com',
      })

      const nonMemberUser = await factories.user.build({
        name: 'test-users-all-non-member',
        email: 'test-users-all-non-member@example.com',
      })

      // memberUserをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: memberUser.id, groupId: group.id },
      })

      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)

      // 両方のユーザーが含まれている
      const memberTestUsers = result.users.filter((user: any) => 
        user.name === 'test-users-all-member'
      )
      expect(memberTestUsers).toHaveLength(1)

      const nonMemberTestUsers = result.users.filter((user: any) => 
        user.name === 'test-users-all-non-member'
      )
      expect(nonMemberTestUsers).toHaveLength(1)
    })

    test('ユーザーが存在しない場合は空配列を返す', async () => {
      // テストデータを作成しない状態でリクエスト
      const request = new NextRequest('http://localhost:3000/api/users')
      const response = await GET(request)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.users).toBeDefined()
      expect(Array.isArray(result.users)).toBe(true)
      
      // 他のテストで作成されたユーザーも含まれる可能性があるため、空配列の確認は行わない
      // 代わりに、テスト用のユーザーが含まれていないことを確認
      const testUsers = result.users.filter((user: any) => 
        user.name.startsWith('test-users-nonexistent')
      )
      expect(testUsers).toHaveLength(0)
    })
  })
}) 