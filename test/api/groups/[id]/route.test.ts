import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from '@/app/api/groups/[id]/route'
import { factories, TestDataCleaner, testPrisma } from '../../../factories/all'

describe('/api/groups/[id]', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-groups-id')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-groups-id')
  })

  describe('GET', () => {
    test('存在するグループの詳細を取得できる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-get',
        description: 'テスト用グループ詳細',
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`)
      const response = await GET(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.group).toBeDefined()
      expect(result.group.id).toBe(group.id)
      expect(result.group.name).toBe('test-groups-id-get')
      expect(result.group.description).toBe('テスト用グループ詳細')
      expect(result.group.createdAt).toBeDefined()
      expect(result.group.updatedAt).toBeDefined()
      expect(result.group.userGroups).toBeDefined()
      expect(result.group.directoryAccess).toBeDefined()
    })

    test('メンバー情報が含まれる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-get-members',
        description: 'メンバーテスト用グループ',
      })

      const user1 = await factories.user.build({
        name: 'テストユーザー1',
        email: 'test-groups-id-member1@example.com',
      })

      const user2 = await factories.user.build({
        name: 'テストユーザー2',
        email: 'test-groups-id-member2@example.com',
      })

      // ユーザーをグループに追加
      await testPrisma.userGroup.createMany({
        data: [
          { userId: user1.id, groupId: group.id },
          { userId: user2.id, groupId: group.id },
        ],
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`)
      const response = await GET(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.group.userGroups).toHaveLength(2)
      
      // メンバー情報が正しく含まれている
      const memberIds = result.group.userGroups.map((ug: any) => ug.user.id)
      expect(memberIds).toContain(user1.id)
      expect(memberIds).toContain(user2.id)
    })

    test('ディレクトリアクセス権限が含まれる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-get-access',
        description: 'アクセス権限テスト用グループ',
      })

      const directory = await factories.directory.build({
        name: 'test-groups-id-directory',
        path: '/test-groups-id-directory',
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          groupId: group.id,
          directoryId: directory.id,
          permission: 'WRITE',
        },
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`)
      const response = await GET(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.group.directoryAccess).toHaveLength(1)
      expect(result.group.directoryAccess[0].permission).toBe('WRITE')
      expect(result.group.directoryAccess[0].directory.id).toBe(directory.id)
    })

    test('存在しないグループで404エラー', async () => {
      const request = new NextRequest('http://localhost:3000/api/groups/nonexistent-id')
      const response = await GET(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('グループが見つかりません')
    })

    test('非アクティブなグループで404エラー', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-inactive',
        description: 'テスト用非アクティブグループ',
        isActive: false,
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`)
      const response = await GET(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('グループが見つかりません')
    })
  })

  describe('PUT', () => {
    test('グループ名と説明を更新できる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-put',
        description: '元の説明',
      })

      const requestBody = {
        name: 'updated-group-name',
        description: '更新された説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.group.name).toBe('updated-group-name')
      expect(result.group.description).toBe('更新された説明')
      expect(result.group.updatedAt).toBeDefined()
    })

    test('グループ名が空でエラー', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-put-empty',
        description: '説明',
      })

      const requestBody = {
        name: '',
        description: '説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は必須です')
    })

    test('長すぎるグループ名でエラー', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-put-long',
        description: '説明',
      })

      const longName = 'a'.repeat(101) // 101文字

      const requestBody = {
        name: longName,
        description: '説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('グループ名は100文字以内で入力してください')
    })

    test('他のグループと同じ名前でエラー', async () => {
      const group1 = await factories.group.build({
        name: 'test-groups-id-put-dup1',
        description: '説明1',
      })

      const group2 = await factories.group.build({
        name: 'test-groups-id-put-dup2',
        description: '説明2',
      })

      const requestBody = {
        name: 'test-groups-id-put-dup1', // group1と同じ名前
        description: '更新された説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group2.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: group2.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('同じ名前のグループが既に存在します')
    })

    test('自分と同じ名前なら更新できる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-put-same',
        description: '元の説明',
      })

      const requestBody = {
        name: 'test-groups-id-put-same', // 同じ名前
        description: '更新された説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.group.name).toBe('test-groups-id-put-same')
      expect(result.group.description).toBe('更新された説明')
    })

    test('存在しないグループで404エラー', async () => {
      const requestBody = {
        name: 'test-name',
        description: '説明',
      }

      const request = new NextRequest('http://localhost:3000/api/groups/nonexistent-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('グループが見つかりません')
    })
  })

  describe('DELETE', () => {
    test('空のグループを削除できる', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-delete-empty',
        description: 'テスト用空グループ',
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.message).toBe('グループを削除しました')
    })

    test('メンバーがいる場合は削除できない', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-delete-has-member',
        description: 'テスト用メンバー有りグループ',
      })

      const user = await factories.user.build({
        name: 'テストユーザー',
        email: 'test-groups-id-delete@example.com',
      })

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('メンバーが存在するため削除できません。先にメンバーを削除してください。')
    })

    test('ディレクトリアクセス権限がある場合は削除できない', async () => {
      const group = await factories.group.build({
        name: 'test-groups-id-delete-has-access',
        description: 'テスト用権限有りグループ',
      })

      const directory = await factories.directory.build({
        name: 'test-groups-id-delete-directory',
        path: '/test-groups-id-delete-directory',
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          groupId: group.id,
          directoryId: directory.id,
          permission: 'READ',
        },
      })

      const request = new NextRequest(`http://localhost:3000/api/groups/${group.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: group.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('ディレクトリアクセス権限が設定されているため削除できません。先に権限を削除してください。')
    })

    test('存在しないグループで404エラー', async () => {
      const request = new NextRequest('http://localhost:3000/api/groups/nonexistent-id', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('グループが見つかりません')
    })
  })
}) 