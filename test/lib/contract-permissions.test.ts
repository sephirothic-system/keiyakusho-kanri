import { describe, it, expect, afterEach } from 'vitest'
import {
  checkContractPermission,
  getAccessibleContracts,
  checkDirectoryPermission,
  getAccessibleDirectories,
  requireContractPermission,
} from '@/lib/contract-permissions'
import { TestDataCleaner, scenarios, factories, testPrisma } from '../factories/all'

describe('権限管理機能の統合テスト', () => {
  // 各テスト後にクリーンアップ
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('checkContractPermission', () => {
    it('オーナーの場合は読み書き権限を持つ', async () => {
      const { owner, contract } = await scenarios.setupPermissionTest()

      const result = await checkContractPermission(owner.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'owner',
      })
    })

    it('グループ権限（WRITE）でアクセスできる場合', async () => {
      const { otherUser, group, contract } = await scenarios.setupPermissionTest()

      // 他のユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: otherUser.id, groupId: group.id },
      })

      const result = await checkContractPermission(otherUser.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: true,
        accessType: 'group',
      })
    })

    it('グループ権限（READ）でアクセスできる場合', async () => {
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      const category = await factories.category.build()
      const contractOwner = await factories.user.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループに読み取り権限のみ付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'READ',
        },
      })

      const contract = await factories.contract.createWithRelations(
        contractOwner,
        directory,
        category
      )

      const result = await checkContractPermission(user.id, contract.id)

      expect(result).toEqual({
        canRead: true,
        canWrite: false,
        accessType: 'group',
      })
    })

    it('アクセス権限がない場合', async () => {
      const { otherUser, contract } = await scenarios.setupPermissionTest()

      const result = await checkContractPermission(otherUser.id, contract.id)

      expect(result).toEqual({
        canRead: false,
        canWrite: false,
        accessType: 'none',
      })
    })

    it('契約書が存在しない場合', async () => {
      const user = await factories.user.build()
      const nonExistentId = 'nonexistent-id'

      const result = await checkContractPermission(user.id, nonExistentId)

      expect(result).toEqual({
        canRead: false,
        canWrite: false,
        accessType: 'none',
      })
    })
  })

  describe('getAccessibleContracts', () => {
    it('オーナーとグループ権限の契約書を取得できる', async () => {
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      const category = await factories.category.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループに書き込み権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      // グループ権限で他のユーザーの契約書にアクセス
      const otherOwner = await factories.user.build()
      const contract = await factories.contract.createWithRelations(otherOwner, directory, category)

      const result = await getAccessibleContracts(user.id)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(contract.id)
      expect(result[0].title).toBe(contract.title)
      expect(result[0].owner).toEqual({
        name: otherOwner.name,
        email: otherOwner.email,
      })
      expect(result[0].directory).toEqual({
        name: directory.name,
        path: directory.path,
      })
      expect(result[0].category).toEqual({
        name: category.name,
        color: category.color,
      })
    })

    it('オーナーの契約書のみ取得できる', async () => {
      const owner = await factories.user.build()
      const directory = await factories.directory.build()
      const category = await factories.category.build()

      const contract = await factories.contract.createWithRelations(owner, directory, category)

      const result = await getAccessibleContracts(owner.id)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(contract.id)
      expect(result[0].title).toBe(contract.title)
    })

    it('アクセス権限がない場合は空の配列を返す', async () => {
      const unauthorizedUser = await factories.user.build()

      // アクセス権限のない契約書を作成
      const contractOwner = await factories.user.build()
      const directory = await factories.directory.build()
      const category = await factories.category.build()
      await factories.contract.createWithRelations(contractOwner, directory, category)

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

      // グループに書き込み権限を付与
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
      const unauthorizedUser = await factories.user.build()
      const directory = await factories.directory.build()

      const result = await checkDirectoryPermission(unauthorizedUser.id, directory.id)

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
      const directory = await factories.directory.build()
      const category = await factories.category.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id },
      })

      // グループに書き込み権限を付与
      await testPrisma.directoryAccess.create({
        data: {
          directoryId: directory.id,
          groupId: group.id,
          permission: 'WRITE',
        },
      })

      // 契約書を作成してカウントをテスト
      await factories.contract.createInDirectory(directory, { categoryId: category.id })

      const result = await getAccessibleDirectories(user.id)

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(directory.id)
      expect(result[0].name).toBe(directory.name)
      expect(result[0].path).toBe(directory.path)
      expect(result[0].directoryAccess).toHaveLength(1)
      expect(result[0].directoryAccess[0].permission).toBe('WRITE')
      expect(result[0].directoryAccess[0].group.name).toBe(group.name)
      expect(result[0]._count.contracts).toBe(1)
    })
  })

  describe('requireContractPermission', () => {
    it('読み取り権限チェックが正常に動作する', async () => {
      const { owner, contract } = await scenarios.setupPermissionTest()

      const readPermissionChecker = requireContractPermission('read')
      const result = await readPermissionChecker(owner.id, contract.id)

      expect(result).toBe(true)
    })

    it('書き込み権限チェックが正常に動作する', async () => {
      const { owner, contract } = await scenarios.setupPermissionTest()

      const writePermissionChecker = requireContractPermission('write')
      const result = await writePermissionChecker(owner.id, contract.id)

      expect(result).toBe(true)
    })

    it('権限がない場合はfalseを返す', async () => {
      const { otherUser, contract } = await scenarios.setupPermissionTest()

      const readPermissionChecker = requireContractPermission('read')
      const result = await readPermissionChecker(otherUser.id, contract.id)

      expect(result).toBe(false)
    })
  })
})
