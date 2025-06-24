import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { GET, POST, DELETE } from '@/app/api/admin/directory-access/route'
import { factories, TestDataCleaner, testPrisma } from '../../factories/all'
import { NextRequest } from 'next/server'
import { Permission } from '@/lib/generated/prisma'

// NextAuthのモック
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

import { getServerSession } from 'next-auth'
const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>

describe('/api/admin/directory-access API', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
    jest.clearAllMocks()
  })

  describe('GET /api/admin/directory-access', () => {
    it('管理者は全てのディレクトリアクセス権限を取得できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // セッションモック
      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      // テストデータ作成
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: Permission.READ,
        },
      })

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.directoryAccesses).toHaveLength(1)
      expect(data.directoryAccesses[0]).toMatchObject({
        directoryId: directory.id,
        groupId: group.id,
        permission: Permission.READ,
      })
    })

    it('一般ユーザーは403エラーが返される', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)

      mockGetServerSession.mockResolvedValue({
        user: { id: user.id, name: user.name, email: user.email },
      } as any)

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('管理者権限が必要です')
    })

    it('未認証ユーザーは401エラーが返される', async () => {
      mockGetServerSession.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('認証が必要です')
    })
  })

  describe('POST /api/admin/directory-access', () => {
    it('管理者は新しいディレクトリアクセス権限を付与できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      const requestBody = {
        directoryId: directory.id,
        groupId: group.id,
        permission: Permission.READ,
      }

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.message).toBe('権限を付与しました')
      expect(data.directoryAccess).toMatchObject({
        directory: { name: directory.name },
        group: { name: group.name },
      })

      // データベースに権限が保存されているか確認
      const savedAccess = await testPrisma.directoryAccess.findUnique({
        where: {
          directoryId_groupId: {
            directoryId: directory.id,
            groupId: group.id,
          },
        },
      })
      expect(savedAccess).toBeTruthy()
      expect(savedAccess?.permission).toBe(Permission.READ)
    })

    it('管理者は既存の権限を更新できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // 既存の権限を作成
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: Permission.READ,
        },
      })

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      const requestBody = {
        directoryId: directory.id,
        groupId: group.id,
        permission: Permission.WRITE, // READ から WRITE に更新
      }

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.message).toBe('権限を付与しました')

      // データベースで権限が更新されているか確認
      const updatedAccess = await testPrisma.directoryAccess.findUnique({
        where: {
          directoryId_groupId: {
            directoryId: directory.id,
            groupId: group.id,
          },
        },
      })
      expect(updatedAccess?.permission).toBe(Permission.WRITE)
    })

    it('一般ユーザーは権限付与できない', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      mockGetServerSession.mockResolvedValue({
        user: { id: user.id, name: user.name, email: user.email },
      } as any)

      const requestBody = {
        directoryId: directory.id,
        groupId: group.id,
        permission: Permission.READ,
      }

      const request = new NextRequest('http://localhost:3000/api/admin/directory-access', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('管理者権限が必要です')
    })

    it('無効なデータでは400エラーが返される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      const testCases = [
        { requestBody: {}, expectedError: 'ディレクトリIDが必要です' },
        { requestBody: { directoryId: 'test' }, expectedError: 'グループIDが必要です' },
        {
          requestBody: { directoryId: 'test', groupId: 'test' },
          expectedError: '有効な権限（READ/WRITE）が必要です',
        },
        {
          requestBody: { directoryId: 'test', groupId: 'test', permission: 'INVALID' },
          expectedError: '有効な権限（READ/WRITE）が必要です',
        },
      ]

      for (const { requestBody, expectedError } of testCases) {
        const request = new NextRequest('http://localhost:3000/api/admin/directory-access', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' },
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe(expectedError)
      }
    })

    it('存在しないディレクトリやグループでは400エラーが返される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      // 存在しないディレクトリ
      const request1 = new NextRequest('http://localhost:3000/api/admin/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: 'non-existing-directory',
          groupId: group.id,
          permission: Permission.READ,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response1 = await POST(request1)
      const data1 = await response1.json()

      expect(response1.status).toBe(400)
      expect(data1.error).toBe('ディレクトリが見つかりません')

      // 存在しないグループ
      const request2 = new NextRequest('http://localhost:3000/api/admin/directory-access', {
        method: 'POST',
        body: JSON.stringify({
          directoryId: directory.id,
          groupId: 'non-existing-group',
          permission: Permission.READ,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const response2 = await POST(request2)
      const data2 = await response2.json()

      expect(response2.status).toBe(400)
      expect(data2.error).toBe('グループが見つかりません')
    })
  })

  describe('DELETE /api/admin/directory-access', () => {
    it('管理者はディレクトリアクセス権限を削除できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // 削除対象の権限を作成
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: Permission.READ,
        },
      })

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      const url = `http://localhost:3000/api/admin/directory-access?directoryId=${directory.id}&groupId=${group.id}`
      const request = new NextRequest(url, { method: 'DELETE' })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('権限を削除しました')

      // データベースから権限が削除されているか確認
      const deletedAccess = await testPrisma.directoryAccess.findUnique({
        where: {
          directoryId_groupId: {
            directoryId: directory.id,
            groupId: group.id,
          },
        },
      })
      expect(deletedAccess).toBeNull()
    })

    it('一般ユーザーは権限削除できない', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      mockGetServerSession.mockResolvedValue({
        user: { id: user.id, name: user.name, email: user.email },
      } as any)

      const url = `http://localhost:3000/api/admin/directory-access?directoryId=${directory.id}&groupId=${group.id}`
      const request = new NextRequest(url, { method: 'DELETE' })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('管理者権限が必要です')
    })

    it('存在しない権限の削除では400エラーが返される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      const url = `http://localhost:3000/api/admin/directory-access?directoryId=${directory.id}&groupId=${group.id}`
      const request = new NextRequest(url, { method: 'DELETE' })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('権限が見つからないか、削除できませんでした')
    })

    it('パラメータが不足している場合は400エラーが返される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)

      mockGetServerSession.mockResolvedValue({
        user: { id: admin.id, name: admin.name, email: admin.email },
      } as any)

      // directoryId が不足
      const request1 = new NextRequest(
        'http://localhost:3000/api/admin/directory-access?groupId=test',
        { method: 'DELETE' }
      )
      const response1 = await DELETE(request1)
      const data1 = await response1.json()

      expect(response1.status).toBe(400)
      expect(data1.error).toBe('ディレクトリIDが必要です')

      // groupId が不足
      const request2 = new NextRequest(
        'http://localhost:3000/api/admin/directory-access?directoryId=test',
        { method: 'DELETE' }
      )
      const response2 = await DELETE(request2)
      const data2 = await response2.json()

      expect(response2.status).toBe(400)
      expect(data2.error).toBe('グループIDが必要です')
    })
  })
})