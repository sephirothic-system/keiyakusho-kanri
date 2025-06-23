import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from '@/app/api/contracts/[id]/route'
import { PrismaClient } from '@/lib/generated/prisma'

// 実際のPrismaClientを使用
const prisma = new PrismaClient()

// テストヘルパー関数
function createMockRequest(
  userIdHeader = 'test-user-id',
  body?: Record<string, unknown>
): NextRequest {
  const url = 'http://localhost:3000/api/contracts/test-id'
  const init = {
    method: body ? 'PUT' : 'GET',
    headers: {
      'x-user-id': userIdHeader,
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  return new NextRequest(url, init)
}

describe('契約書APIルートの統合テスト', () => {
  // テストデータのID
  let testUserId: string
  let testOwnerId: string
  let testGroupId: string
  let testDirectoryId: string
  let testContractId: string
  let testCategoryId: string

  beforeEach(async () => {
    // テスト用データをセットアップ

    // カテゴリを作成
    const category = await prisma.category.create({
      data: {
        name: 'テストカテゴリ',
        color: '#blue',
      },
    })
    testCategoryId = category.id

    // ユーザーを作成
    const testUser = await prisma.user.create({
      data: {
        email: 'test-user@example.com',
        name: 'テストユーザー',
        isActive: true,
      },
    })
    testUserId = testUser.id

    const testOwner = await prisma.user.create({
      data: {
        email: 'test-owner@example.com',
        name: 'テストオーナー',
        isActive: true,
      },
    })
    testOwnerId = testOwner.id

    // グループを作成
    const group = await prisma.group.create({
      data: {
        name: 'テストグループ',
        description: 'テスト用グループ',
        isActive: true,
      },
    })
    testGroupId = group.id

    // ユーザーをグループに追加
    await prisma.userGroup.create({
      data: {
        userId: testUserId,
        groupId: testGroupId,
      },
    })

    // ディレクトリを作成
    const directory = await prisma.directory.create({
      data: {
        name: 'test-directory',
        description: 'テスト用ディレクトリ',
        path: '/test/directory',
        isActive: true,
      },
    })
    testDirectoryId = directory.id

    // ディレクトリアクセス権限を設定
    await prisma.directoryAccess.create({
      data: {
        directoryId: testDirectoryId,
        groupId: testGroupId,
        permission: 'WRITE',
      },
    })

    // 契約書を作成
    const contract = await prisma.contract.create({
      data: {
        title: 'テスト契約書',
        content: '# テスト契約書\n\nテスト内容',
        status: 'ACTIVE',
        contractNumber: 'TEST-001',
        ownerId: testOwnerId,
        directoryId: testDirectoryId,
        categoryId: testCategoryId,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      },
    })
    testContractId = contract.id

    // 契約書のバージョン履歴を作成
    await prisma.contractVersion.create({
      data: {
        contractId: testContractId,
        version: 1,
        title: 'テスト契約書 v1',
        content: '# テスト契約書 v1\n\n初版',
        changeNote: '初版作成',
      },
    })
  })

  afterEach(async () => {
    // テストデータをクリーンアップ
    await prisma.contractVersion.deleteMany({})
    await prisma.contract.deleteMany({})
    await prisma.directoryAccess.deleteMany({})
    await prisma.directory.deleteMany({})
    await prisma.userGroup.deleteMany({})
    await prisma.group.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.category.deleteMany({})
  })

  describe('GET /api/contracts/[id]', () => {
    it('オーナーが契約書を取得できる', async () => {
      const request = createMockRequest(testOwnerId)
      const response = await GET(request, { params: { id: testContractId } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract).toBeDefined()
      expect(data.contract.id).toBe(testContractId)
      expect(data.contract.title).toBe('テスト契約書')
      expect(data.contract.owner.name).toBe('テストオーナー')
      expect(data.contract.directory.name).toBe('test-directory')
      expect(data.contract.category.name).toBe('テストカテゴリ')
      expect(data.contract.versions).toHaveLength(1)

      expect(data.permission).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'owner',
      })
    })

    it('グループ権限でアクセスできる', async () => {
      const request = createMockRequest(testUserId)
      const response = await GET(request, { params: { id: testContractId } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.id).toBe(testContractId)
      expect(data.permission).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'group',
      })
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // 権限のないユーザーを作成
      const unauthorizedUser = await prisma.user.create({
        data: {
          email: 'unauthorized@example.com',
          name: '権限なしユーザー',
          isActive: true,
        },
      })

      const request = createMockRequest(unauthorizedUser.id)
      const response = await GET(request, { params: { id: testContractId } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書へのアクセス権限がありません')

      // クリーンアップ
      await prisma.user.delete({ where: { id: unauthorizedUser.id } })
    })

    it('存在しない契約書で404エラーになる', async () => {
      const request = createMockRequest(testUserId)
      const response = await GET(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data.error).toBe('契約書が見つかりません')
    })
  })

  describe('PUT /api/contracts/[id]', () => {
    const updateData = {
      title: '更新されたテスト契約書',
      content: '# 更新されたテスト契約書\n\n更新内容',
      status: 'REVIEW',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      categoryId: testCategoryId,
      changeNote: '契約内容を更新しました',
    }

    it('オーナーが契約書を更新できる', async () => {
      const request = createMockRequest(testOwnerId, updateData)
      const response = await PUT(request, { params: { id: testContractId } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.title).toBe('更新されたテスト契約書')
      expect(data.contract.content).toBe('# 更新されたテスト契約書\n\n更新内容')
      expect(data.contract.status).toBe('REVIEW')

      // バージョン履歴が追加されたことを確認
      const versions = await prisma.contractVersion.findMany({
        where: { contractId: testContractId },
        orderBy: { version: 'desc' },
      })
      expect(versions).toHaveLength(2)
      expect(versions[0].version).toBe(2)
      expect(versions[0].changeNote).toBe('契約内容を更新しました')
    })

    it('グループ権限（WRITE）で更新できる', async () => {
      const request = createMockRequest(testUserId, updateData)
      const response = await PUT(request, { params: { id: testContractId } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.title).toBe('更新されたテスト契約書')
    })

    it('グループ権限（READ）では更新できない', async () => {
      // ディレクトリアクセス権限をREADに変更
      await prisma.directoryAccess.update({
        where: {
          directoryId_groupId: {
            directoryId: testDirectoryId,
            groupId: testGroupId,
          },
        },
        data: {
          permission: 'READ',
        },
      })

      const request = createMockRequest(testUserId, updateData)
      const response = await PUT(request, { params: { id: testContractId } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書の編集権限がありません')
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // 権限のないユーザーを作成
      const unauthorizedUser = await prisma.user.create({
        data: {
          email: 'unauthorized2@example.com',
          name: '権限なしユーザー2',
          isActive: true,
        },
      })

      const request = createMockRequest(unauthorizedUser.id, updateData)
      const response = await PUT(request, { params: { id: testContractId } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書の編集権限がありません')

      // クリーンアップ
      await prisma.user.delete({ where: { id: unauthorizedUser.id } })
    })

    it('存在しない契約書で404エラーになる', async () => {
      const request = createMockRequest(testOwnerId, updateData)
      const response = await PUT(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data.error).toBe('契約書が見つかりません')
    })
  })

  describe('DELETE /api/contracts/[id]', () => {
    it('オーナーが契約書を削除できる', async () => {
      const request = createMockRequest(testOwnerId)
      const response = await DELETE(request, { params: { id: testContractId } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.message).toBe('契約書が削除されました')

      // 契約書が実際に削除されたことを確認
      const deletedContract = await prisma.contract.findUnique({
        where: { id: testContractId },
      })
      expect(deletedContract).toBeNull()

      // バージョン履歴もCascadeで削除されたことを確認
      const versions = await prisma.contractVersion.findMany({
        where: { contractId: testContractId },
      })
      expect(versions).toHaveLength(0)
    })

    it('グループ権限（WRITE）でも削除はできない', async () => {
      const request = createMockRequest(testUserId)
      const response = await DELETE(request, { params: { id: testContractId } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('契約書の削除は作成者のみ可能です')

      // 契約書が削除されていないことを確認
      const contract = await prisma.contract.findUnique({
        where: { id: testContractId },
      })
      expect(contract).not.toBeNull()
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // 権限のないユーザーを作成
      const unauthorizedUser = await prisma.user.create({
        data: {
          email: 'unauthorized3@example.com',
          name: '権限なしユーザー3',
          isActive: true,
        },
      })

      const request = createMockRequest(unauthorizedUser.id)
      const response = await DELETE(request, { params: { id: testContractId } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('契約書の削除は作成者のみ可能です')

      // クリーンアップ
      await prisma.user.delete({ where: { id: unauthorizedUser.id } })
    })

    it('存在しない契約書で500エラーになる', async () => {
      const request = createMockRequest(testOwnerId)
      const response = await DELETE(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(500)

      const data = await response.json()
      expect(data.error).toBe('サーバーエラーが発生しました')
    })
  })
})
