import { describe, it, expect, afterEach } from 'vitest'
import { GET, POST } from '@/app/api/permissions/directory-access/route'
import { PUT, DELETE } from '@/app/api/permissions/directory-access/[id]/route'
import { factories, TestDataCleaner, testPrisma } from '@/test/factories/all'
import { NextRequest } from 'next/server'

describe('/api/permissions/directory-access', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('GET', () => {
    it('ディレクトリアクセス権限一覧を正常に取得できること', async () => {
      // テストデータ作成
      const directory1 = await factories.directory.build({ name: 'test-dir-1', path: '/test-dir-1' })
      const directory2 = await factories.directory.build({ name: 'test-dir-2', path: '/test-dir-2' })
      const group1 = await factories.group.build({ name: 'test-group-1' })
      const group2 = await factories.group.build({ name: 'test-group-2' })

      // ディレクトリアクセス権限を作成
      const access1 = await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory1.id,
          groupId: group1.id,
          permission: 'READ',
        },
      })

      const access2 = await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory2.id,
          groupId: group2.id,
          permission: 'WRITE',
        },
      })

      // リクエスト作成
      const request = new NextRequest('http://localhost/api/permissions/directory-access')

      // API実行
      const response = await GET(request)
      const data = await response.json()

      // レスポンス確認
      expect(response.status).toBe(200)
      expect(data.directoryAccess).toHaveLength(2)

      // ディレクトリパスの昇順でソートされていることを確認
      expect(data.directoryAccess[0].directory.path).toBe('/test-dir-1')
      expect(data.directoryAccess[1].directory.path).toBe('/test-dir-2')

      // データ構造の確認
      expect(data.directoryAccess[0]).toMatchObject({
        id: access1.id,
        permission: 'READ',
        directory: {
          id: directory1.id,
          name: 'test-dir-1',
          path: '/test-dir-1',
        },
        group: {
          id: group1.id,
          name: 'test-group-1',
        },
      })
    })

    it('ディレクトリアクセス権限が存在しない場合、空の配列が返されること', async () => {
      const request = new NextRequest('http://localhost/api/permissions/directory-access')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.directoryAccess).toHaveLength(0)
    })
  })

  describe('POST', () => {
    it('ディレクトリアクセス権限を正常に作成できること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-directory' })
      const group = await factories.group.build({ name: 'test-group' })

      // リクエスト作成
      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      // API実行
      const response = await POST(request)
      const data = await response.json()

      // レスポンス確認
      expect(response.status).toBe(201)
      expect(data.directoryAccess).toMatchObject({
        permission: 'WRITE',
        directory: {
          id: directory.id,
          name: 'test-directory',
        },
        group: {
          id: group.id,
          name: 'test-group',
        },
      })
    })

    it('必須フィールドが不足している場合400エラーが返されること', async () => {
      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: 'test-id',
          // groupId と permission が不足
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('ディレクトリ、グループ、権限は必須です')
    })

    it('無効な権限値の場合400エラーが返されること', async () => {
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: directory.id,
          groupId: group.id,
          permission: 'INVALID',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('権限は read または write を指定してください')
    })

    it('存在しないディレクトリIDの場合404エラーが返されること', async () => {
      const group = await factories.group.build()

      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: 'nonexistent-directory',
          groupId: group.id,
          permission: 'READ',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('指定されたディレクトリが見つかりません')
    })

    it('存在しないグループIDの場合404エラーが返されること', async () => {
      const directory = await factories.directory.build()

      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: directory.id,
          groupId: 'nonexistent-group',
          permission: 'READ',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('指定されたグループが見つかりません')
    })

    it('既存のアクセス権限と重複する場合400エラーが返されること', async () => {
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // 既存のアクセス権限を作成
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      const request = new NextRequest('http://localhost/api/permissions/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('このディレクトリとグループの組み合わせには既にアクセス権限が設定されています')
    })
  })
})

describe('/api/permissions/directory-access/[id]', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('PUT', () => {
    it('ディレクトリアクセス権限を正常に更新できること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-directory' })
      const group = await factories.group.build({ name: 'test-group' })

      const access = await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      // リクエスト作成
      const request = new NextRequest(`http://localhost/api/permissions/directory-access/${access.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          permission: 'WRITE',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      // API実行
      const response = await PUT(request, { params: { id: access.id } })
      const data = await response.json()

      // レスポンス確認
      expect(response.status).toBe(200)
      expect(data.directoryAccess.permission).toBe('WRITE')
      expect(data.directoryAccess.id).toBe(access.id)
    })

    it('存在しないアクセス権限IDの場合404エラーが返されること', async () => {
      const request = new NextRequest('http://localhost/api/permissions/directory-access/nonexistent', {
        method: 'PUT',
        body: JSON.stringify({
          permission: 'WRITE',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await PUT(request, { params: { id: 'nonexistent' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('アクセス権限が見つかりません')
    })

    it('無効な権限値の場合400エラーが返されること', async () => {
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const access = await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      const request = new NextRequest(`http://localhost/api/permissions/directory-access/${access.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          permission: 'INVALID',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await PUT(request, { params: { id: access.id } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('権限は read または write を指定してください')
    })
  })

  describe('DELETE', () => {
    it('ディレクトリアクセス権限を正常に削除できること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const access = await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      // リクエスト作成
      const request = new NextRequest(`http://localhost/api/permissions/directory-access/${access.id}`, {
        method: 'DELETE',
      })

      // API実行
      const response = await DELETE(request, { params: { id: access.id } })
      const data = await response.json()

      // レスポンス確認
      expect(response.status).toBe(200)
      expect(data.message).toBe('アクセス権限を削除しました')
      expect(data.deletedId).toBe(access.id)

      // データベースから削除されていることを確認
      const deletedAccess = await testPrisma.directoryAccess.findUnique({
        where: { id: access.id },
      })
      expect(deletedAccess).toBeNull()
    })

    it('存在しないアクセス権限IDの場合404エラーが返されること', async () => {
      const request = new NextRequest('http://localhost/api/permissions/directory-access/nonexistent', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: 'nonexistent' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('アクセス権限が見つかりません')
    })
  })
})