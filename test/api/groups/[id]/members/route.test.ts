import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST, DELETE } from '@/app/api/groups/[id]/members/route'
import { factories, TestDataCleaner, testPrisma } from '../../../../factories/all'

describe('/api/groups/[id]/members', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-group-members')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-group-members')
  })

  describe('POST', () => {
    test('ユーザーをグループに追加できる', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-add',
        description: 'メンバー追加テスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テストユーザー',
        email: 'test-group-members-add@example.com',
      })

      const requestBody = {
        userId: user.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(201)
      expect(result.membership).toBeDefined()
      expect(result.membership.user.id).toBe(user.id)
      expect(result.membership.user.name).toBe('テストユーザー')
      expect(result.membership.user.email).toBe('test-group-members-add@example.com')
      expect(result.membership.joinedAt).toBeDefined()
    })

    test('ユーザーIDが必須', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-no-user',
        description: 'ユーザーID必須テスト用グループ',
      })

      const requestBody = {}

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('ユーザーIDは必須です')
    })

    test('存在しないグループで404エラー', async () => {
      const user = await factories.user.build({
        name: 'テストユーザー',
        email: 'test-group-members-no-group@example.com',
      })

      const requestBody = {
        userId: user.id,
      }

      const request = new NextRequest('http://localhost:3000/api/groups/nonexistent-id/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('グループが見つかりません')
    })

    test('存在しないユーザーで404エラー', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-no-user-exist',
        description: 'ユーザー存在テスト用グループ',
      })

      const requestBody = {
        userId: 'nonexistent-user-id',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ユーザーが見つかりません')
    })

    test('非アクティブなユーザーで404エラー', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-inactive-user',
        description: '非アクティブユーザーテスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テスト非アクティブユーザー',
        email: 'test-group-members-inactive@example.com',
        isActive: false,
      })

      const requestBody = {
        userId: user.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ユーザーが見つかりません')
    })

    test('既にメンバーのユーザーで重複エラー', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-duplicate',
        description: '重複メンバーテスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テスト重複ユーザー',
        email: 'test-group-members-duplicate@example.com',
      })

      // 既にユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      })

      const requestBody = {
        userId: user.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('ユーザーは既にこのグループのメンバーです')
    })
  })

  describe('DELETE', () => {
    test('グループからメンバーを削除できる', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-remove',
        description: 'メンバー削除テスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テスト削除ユーザー',
        email: 'test-group-members-remove@example.com',
      })

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      })

      const request = new NextRequest(
        `http://localhost:3000/api/groups/${group.id}/members?userId=${user.id}`,
        {
          method: 'DELETE',
        }
      )

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.message).toBe('メンバーを削除しました')
    })

    test('ユーザーIDが必須', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-delete-no-user',
        description: 'ユーザーID必須削除テスト用グループ',
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}/members`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('ユーザーIDは必須です')
    })

    test('メンバーでないユーザーで404エラー', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-not-member',
        description: '非メンバー削除テスト用グループ',
      })

      const user = await factories.user.build({
        name: 'テスト非メンバーユーザー',
        email: 'test-group-members-not-member@example.com',
      })

      const request = new NextRequest(
        `http://localhost:3000/api/groups/${group.id}/members?userId=${user.id}`,
        {
          method: 'DELETE',
        }
      )

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ユーザーはこのグループのメンバーではありません')
    })

    test('複数メンバーから特定のメンバーを削除', async () => {
      const group = await factories.group.build({
        name: 'test-group-members-multiple',
        description: '複数メンバー削除テスト用グループ',
      })

      const user1 = await factories.user.build({
        name: 'テストユーザー1',
        email: 'test-group-members-user1@example.com',
      })

      const user2 = await factories.user.build({
        name: 'テストユーザー2',
        email: 'test-group-members-user2@example.com',
      })

      // 両方のユーザーをグループに追加
      await testPrisma.userGroup.createMany({
        data: [
          { userId: user1.id, groupId: group.id },
          { userId: user2.id, groupId: group.id },
        ],
      })

      // user1を削除
      const request = new NextRequest(
        `http://localhost:3000/api/groups/${group.id}/members?userId=${user1.id}`,
        {
          method: 'DELETE',
        }
      )

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.message).toBe('メンバーを削除しました')

      // user2はまだメンバーであることを確認
      const remainingMembership = await testPrisma.userGroup.findFirst({
        where: {
          userId: user2.id,
          groupId: group.id,
        },
      })
      expect(remainingMembership).not.toBeNull()

      // user1は削除されていることを確認
      const deletedMembership = await testPrisma.userGroup.findFirst({
        where: {
          userId: user1.id,
          groupId: group.id,
        },
      })
      expect(deletedMembership).toBeNull()
    })
  })
}) 