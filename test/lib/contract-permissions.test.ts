import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  checkContractPermission,
  getAccessibleContracts,
  checkDirectoryPermission,
  getAccessibleDirectories,
  requireContractPermission,
} from '@/lib/contract-permissions'
import { factories, TestDataCleaner, testPrisma } from '../factories/all'

describe('権限管理機能の統合テスト', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanAll()
  })

  afterEach(async () => {
    await TestDataCleaner.cleanAll()
  })

  describe('checkContractPermission', () => {
    it('オーナーの場合は読み書き権限を持つ', async () => {
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const result = await checkContractPermission(owner.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'owner',
      })
    })

    it('グループ権限（WRITE）でアクセスできる場合', async () => {
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
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

      const result = await checkContractPermission(user.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'group',
      })
    })

    it('グループ権限（READ）でアクセスできる場合', async () => {
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与（READ権限）
      await testPrisma.directoryAccess.create({
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

      const result = await checkContractPermission(user.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: false,
        accessType: 'group',
      })
    })

    it('アクセス権限がない場合', async () => {
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const result = await checkContractPermission(unauthorizedUser.id, contract.id)

      expect(result).toEqual({
        canRead: false,
        canWrite: false,
        accessType: 'none',
      })
    })

    it('契約書が存在しない場合', async () => {
      const user = await factories.user.build()

      const result = await checkContractPermission(user.id, 'nonexistent-id')

      expect(result).toEqual({
        canRead: false,
        canWrite: false,
        accessType: 'none',
      })
    })
  })

  describe('getAccessibleContracts', () => {
    it('オーナーとグループ権限の契約書を取得できる', async () => {
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      // オーナーとしての契約書を作成
      const ownContract = await factories.contract.build({
        ownerId: user.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // 他のオーナーの契約書（グループ権限でアクセス可能）
      const groupContract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const result = await getAccessibleContracts(user.id)

      expect(result).toHaveLength(2)
      const contractIds = result.map(c => c.id)
      expect(contractIds).toContain(ownContract.id)
      expect(contractIds).toContain(groupContract.id)
    })

    it('オーナーの契約書のみ取得できる', async () => {
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const result = await getAccessibleContracts(owner.id)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(contract.id)
    })

    it('アクセス権限がない場合は空の配列を返す', async () => {
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const result = await getAccessibleContracts(unauthorizedUser.id)

      expect(result).toHaveLength(0)
    })
  })

  describe('checkDirectoryPermission', () => {
    it('グループでディレクトリにアクセス権限がある場合', async () => {
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      const result = await checkDirectoryPermission(user.id, directory.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'group',
      })
    })

    it('ディレクトリへのアクセス権限がない場合', async () => {
      const user = await factories.user.build()
      const directory = await factories.directory.build()

      const result = await checkDirectoryPermission(user.id, directory.id)

      expect(result).toEqual({
        canRead: false,
        canWrite: false,
        accessType: 'none',
      })
    })
  })

  describe('getAccessibleDirectories', () => {
    it('アクセス可能なディレクトリ一覧を取得できる', async () => {
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory1 = await factories.directory.build()
      const directory2 = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.createMany({
        data: [
          {
            directoryId: directory1.id,
            groupId: group.id,
            permission: 'READ',
          },
          {
            directoryId: directory2.id,
            groupId: group.id,
            permission: 'WRITE',
          },
        ],
      })

      const result = await getAccessibleDirectories(user.id)

      expect(result).toHaveLength(2)
      const directoryIds = result.map(d => d.id)
      expect(directoryIds).toContain(directory1.id)
      expect(directoryIds).toContain(directory2.id)
    })
  })

  describe('requireContractPermission', () => {
    it('読み取り権限チェックが正常に動作する', async () => {
      const owner = await factories.user.build()
      const user = await factories.user.build()
      const group = await factories.group.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループにディレクトリアクセス権限を付与
      await testPrisma.directoryAccess.create({
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

      const readPermissionChecker = requireContractPermission('read')
      const result = await readPermissionChecker(user.id, contract.id)

      expect(result).toBe(true)
    })

    it('書き込み権限チェックが正常に動作する', async () => {
      const owner = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const writePermissionChecker = requireContractPermission('write')
      const result = await writePermissionChecker(owner.id, contract.id)

      expect(result).toBe(true)
    })

    it('権限がない場合はfalseを返す', async () => {
      const owner = await factories.user.build()
      const unauthorizedUser = await factories.user.build()
      const category = await factories.category.build()
      const directory = await factories.directory.build()

      const contract = await factories.contract.build({
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const readPermissionChecker = requireContractPermission('read')
      const result = await readPermissionChecker(unauthorizedUser.id, contract.id)

      expect(result).toBe(false)
    })
  })
})