import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from '@/app/api/contracts/[id]/route'
import { PrismaClient } from '@/lib/generated/prisma'
import { factories, TestDataCleaner } from '../../factories/all'

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
  beforeEach(async () => {
    // 各テスト前にデータベースをクリーンな状態にする
    await TestDataCleaner.cleanAll()
  })

  afterEach(async () => {
    // 各テスト後にデータベースをクリーンアップ
    await TestDataCleaner.cleanAll()
  })

  describe('GET /api/contracts/[id]', () => {
    it('オーナーが契約書を取得できる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // バージョン履歴を作成
      await prisma.contractVersion.create({
        data: {
          contractId: contract.id,
          version: 1,
          title: contract.title + ' v1',
          content: contract.content,
          changeNote: '初版作成',
        },
      })

      const request = createMockRequest(owner.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract).toBeDefined()
      expect(data.contract.id).toBe(contract.id)
      expect(data.contract.title).toBe(contract.title)
      expect(data.permission).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'owner',
      })
    })

    it('グループ権限でアクセスできる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await prisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await prisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const request = createMockRequest(user.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.id).toBe(contract.id)
      expect(data.permission).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'group',
      })
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const request = createMockRequest(unauthorizedUser.id)
      const response = await GET(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書へのアクセス権限がありません')
    })

    it('存在しない契約書で404エラーになる', async () => {
      // 認証用のユーザーだけ作成
      const user = await factories.user.build()
      
      const request = createMockRequest(user.id)
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
      changeNote: '契約内容を更新しました',
    }

    it('オーナーが契約書を更新できる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const testUpdateData = {
        ...updateData,
        categoryId: category.id,
      }

      const request = createMockRequest(owner.id, testUpdateData)
      const response = await PUT(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.title).toBe('更新されたテスト契約書')
      expect(data.contract.content).toBe('# 更新されたテスト契約書\n\n更新内容')
      expect(data.contract.status).toBe('REVIEW')

      // バージョン履歴が追加されたことを確認
      const versions = await prisma.contractVersion.findMany({
        where: { contractId: contract.id },
        orderBy: { version: 'desc' },
      })
      expect(versions).toHaveLength(1)
      expect(versions[0].changeNote).toBe('契約内容を更新しました')
    })

    it('グループ権限（WRITE）で更新できる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await prisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await prisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const testUpdateData = {
        ...updateData,
        categoryId: category.id,
      }

      const request = createMockRequest(user.id, testUpdateData)
      const response = await PUT(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.contract.title).toBe('更新されたテスト契約書')
    })

    it('グループ権限（READ）では更新できない', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await prisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与（READ権限）
      await prisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const testUpdateData = {
        ...updateData,
        categoryId: category.id,
      }

      const request = createMockRequest(user.id, testUpdateData)
      const response = await PUT(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書の編集権限がありません')
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const testUpdateData = {
        ...updateData,
        categoryId: category.id,
      }

      const request = createMockRequest(unauthorizedUser.id, testUpdateData)
      const response = await PUT(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('この契約書の編集権限がありません')
    })

    it('存在しない契約書で404エラーになる', async () => {
      // 認証用のユーザーだけ作成
      const user = await factories.user.build()
      const category = await factories.category.build()

      const testUpdateData = {
        ...updateData,
        categoryId: category.id,
      }
      
      const request = createMockRequest(user.id, testUpdateData)
      const response = await PUT(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(404)

      const data = await response.json()
      expect(data.error).toBe('契約書が見つかりません')
    })
  })

  describe('DELETE /api/contracts/[id]', () => {
    it('オーナーが契約書を削除できる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // バージョン履歴を作成
      await prisma.contractVersion.create({
        data: {
          contractId: contract.id,
          version: 1,
          title: contract.title + ' v1',
          content: contract.content,
          changeNote: '初版作成',
        },
      })

      const request = createMockRequest(owner.id)
      const response = await DELETE(request, { params: { id: contract.id } })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.message).toBe('契約書が削除されました')

      // 契約書が実際に削除されたことを確認
      const deletedContract = await prisma.contract.findUnique({
        where: { id: contract.id },
      })
      expect(deletedContract).toBeNull()

      // バージョン履歴もCascadeで削除されたことを確認
      const versions = await prisma.contractVersion.findMany({
        where: { contractId: contract.id },
      })
      expect(versions).toHaveLength(0)
    })

    it('グループ権限（WRITE）でも削除はできない', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await prisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await prisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const request = createMockRequest(user.id)
      const response = await DELETE(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('契約書の削除は作成者のみ可能です')

      // 契約書が削除されていないことを確認
      const contractStillExists = await prisma.contract.findUnique({
        where: { id: contract.id },
      })
      expect(contractStillExists).not.toBeNull()
    })

    it('権限がないユーザーが403エラーになる', async () => {
      // このテスト専用のデータを作成
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()
      
      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const request = createMockRequest(unauthorizedUser.id)
      const response = await DELETE(request, { params: { id: contract.id } })

      expect(response.status).toBe(403)

      const data = await response.json()
      expect(data.error).toBe('契約書の削除は作成者のみ可能です')
    })

    it('存在しない契約書で500エラーになる', async () => {
      // 認証用のユーザーだけ作成
      const user = await factories.user.build()
      
      const request = createMockRequest(user.id)
      const response = await DELETE(request, { params: { id: 'nonexistent-id' } })

      expect(response.status).toBe(500)

      const data = await response.json()
      expect(data.error).toBe('サーバーエラーが発生しました')
    })
  })
})
