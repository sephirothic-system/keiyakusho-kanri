import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { factories, scenarios, TestDataCleaner, testPrisma } from '../factories/all'
import {
  isAdmin,
  requireAdminPermission,
  grantDirectoryAccess,
  revokeDirectoryAccess,
  checkContractPermission,
  checkDirectoryPermission,
} from '@/lib/contract-permissions'
import { Permission } from '@/lib/generated/prisma'

describe('管理者権限システム', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('管理者権限チェック', () => {
    it('管理者フラグがtrueのユーザーは管理者と判定される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      
      const result = await isAdmin(admin.id)
      expect(result).toBe(true)
    })

    it('管理者フラグがfalseのユーザーは管理者と判定されない', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      
      const result = await isAdmin(user.id)
      expect(result).toBe(false)
    })

    it('存在しないユーザーは管理者と判定されない', async () => {
      const result = await isAdmin('non-existing-user-id')
      expect(result).toBe(false)
    })

    it('requireAdminPermissionは管理者に対してtrueを返す', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      
      const result = await requireAdminPermission(admin.id)
      expect(result).toBe(true)
    })

    it('requireAdminPermissionは一般ユーザーに対してfalseを返す', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      
      const result = await requireAdminPermission(user.id)
      expect(result).toBe(false)
    })
  })

  describe('ディレクトリアクセス権限の付与', () => {
    it('管理者はディレクトリアクセス権限を付与できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const result = await grantDirectoryAccess(
        admin.id,
        directory.id,
        group.id,
        Permission.READ
      )

      expect(result.success).toBe(true)
      expect(result.error).toBeUndefined()

      // 権限が実際に付与されたか確認
      const permission = await checkDirectoryPermission('dummy-user', directory.id)
      // この段階では権限がないので、実際のユーザーグループアクセスでテストする必要がある
    })

    it('一般ユーザーはディレクトリアクセス権限を付与できない', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const result = await grantDirectoryAccess(
        user.id,
        directory.id,
        group.id,
        Permission.READ
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('管理者権限が必要です')
    })

    it('存在しないディレクトリへの権限付与は失敗する', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const group = await factories.group.build()

      const result = await grantDirectoryAccess(
        admin.id,
        'non-existing-directory-id',
        group.id,
        Permission.READ
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('ディレクトリが見つかりません')
    })

    it('存在しないグループへの権限付与は失敗する', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()

      const result = await grantDirectoryAccess(
        admin.id,
        directory.id,
        'non-existing-group-id',
        Permission.READ
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('グループが見つかりません')
    })

    it('既存の権限は更新される', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // 最初にREAD権限を付与
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.READ)

      // WRITE権限に更新
      const result = await grantDirectoryAccess(
        admin.id,
        directory.id,
        group.id,
        Permission.WRITE
      )

      expect(result.success).toBe(true)
    })
  })

  describe('ディレクトリアクセス権限の削除', () => {
    it('管理者はディレクトリアクセス権限を削除できる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      // まず権限を付与
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.READ)

      // 権限を削除
      const result = await revokeDirectoryAccess(admin.id, directory.id, group.id)

      expect(result.success).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('一般ユーザーはディレクトリアクセス権限を削除できない', async () => {
      const user = await factories.user.build({ isAdmin: false } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const result = await revokeDirectoryAccess(user.id, directory.id, group.id)

      expect(result.success).toBe(false)
      expect(result.error).toBe('管理者権限が必要です')
    })

    it('存在しない権限の削除は失敗する', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()
      const group = await factories.group.build()

      const result = await revokeDirectoryAccess(admin.id, directory.id, group.id)

      expect(result.success).toBe(false)
      expect(result.error).toBe('権限が見つからないか、削除できませんでした')
    })
  })

  describe('管理者の契約書アクセス権限', () => {
    it('管理者は全ての契約書にREAD権限を持つ', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const owner = await factories.user.build()
      const contract = await factories.contract.build({ ownerId: owner.id })

      const permission = await checkContractPermission(admin.id, contract.id)

      expect(permission.canRead).toBe(true)
      expect(permission.canWrite).toBe(true)
      expect(permission.accessType).toBe('admin')
    })

    it('管理者は他人の契約書にもWRITE権限を持つ', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const owner = await factories.user.build()
      const contract = await factories.contract.build({ ownerId: owner.id })

      const permission = await checkContractPermission(admin.id, contract.id)

      expect(permission.canWrite).toBe(true)
      expect(permission.accessType).toBe('admin')
    })

    it('管理者は全てのディレクトリにアクセス権限を持つ', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const directory = await factories.directory.build()

      const permission = await checkDirectoryPermission(admin.id, directory.id)

      expect(permission.canRead).toBe(true)
      expect(permission.canWrite).toBe(true)
      expect(permission.accessType).toBe('admin')
    })
  })

  describe('グループベースの権限システム', () => {
    it('グループに属するユーザーは権限が付与されたディレクトリにアクセスできる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      
      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id }
      })
      
      // グループにディレクトリアクセス権限を付与
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.READ)

      const permission = await checkDirectoryPermission(user.id, directory.id)

      expect(permission.canRead).toBe(true)
      expect(permission.canWrite).toBe(false)
      expect(permission.accessType).toBe('group')
    })

    it('WRITE権限が付与されたグループのユーザーは書き込みもできる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      
      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id }
      })
      
      // グループにWRITE権限を付与
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.WRITE)

      const permission = await checkDirectoryPermission(user.id, directory.id)

      expect(permission.canRead).toBe(true)
      expect(permission.canWrite).toBe(true)
      expect(permission.accessType).toBe('group')
    })

    it('グループに属さないユーザーはアクセスできない', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      
      // グループにディレクトリアクセス権限を付与（ユーザーはグループに属さない）
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.READ)

      const permission = await checkDirectoryPermission(user.id, directory.id)

      expect(permission.canRead).toBe(false)
      expect(permission.canWrite).toBe(false)
      expect(permission.accessType).toBe('none')
    })

    it('権限が削除されたグループのユーザーはアクセスできなくなる', async () => {
      const admin = await factories.user.build({ isAdmin: true } as any)
      const user = await factories.user.build()
      const group = await factories.group.build()
      const directory = await factories.directory.build()
      
      // ユーザーをグループに追加
      await testPrisma.userGroup.create({
        data: { userId: user.id, groupId: group.id }
      })
      
      // グループに権限を付与
      await grantDirectoryAccess(admin.id, directory.id, group.id, Permission.READ)
      
      // 権限を削除
      await revokeDirectoryAccess(admin.id, directory.id, group.id)

      const permission = await checkDirectoryPermission(user.id, directory.id)

      expect(permission.canRead).toBe(false)
      expect(permission.canWrite).toBe(false)
      expect(permission.accessType).toBe('none')
    })
  })

  describe('統合シナリオテスト', () => {
    it('完全な権限管理フローが正常に動作する', async () => {
      // 環境準備
      const admin = await factories.user.build({ isAdmin: true } as any)
      const user1 = await factories.user.build()
      const user2 = await factories.user.build()
      const group1 = await factories.group.build()
      const group2 = await factories.group.build()
      const directory1 = await factories.directory.build()
      const directory2 = await factories.directory.build()

      // ユーザーをグループに追加
      await testPrisma.userGroup.createMany({
        data: [
          { userId: user1.id, groupId: group1.id },
          { userId: user2.id, groupId: group2.id }
        ]
      })

      // 管理者が権限を付与
      await grantDirectoryAccess(admin.id, directory1.id, group1.id, Permission.READ)
      await grantDirectoryAccess(admin.id, directory2.id, group2.id, Permission.WRITE)

      // 各ディレクトリに契約書を作成
      const contract1 = await factories.contract.build({ directoryId: directory1.id })
      const contract2 = await factories.contract.build({ directoryId: directory2.id })

      // user1はdirectory1の契約書を読むことができる
      const user1Contract1Permission = await checkContractPermission(user1.id, contract1.id)
      expect(user1Contract1Permission.canRead).toBe(true)
      expect(user1Contract1Permission.canWrite).toBe(false)

      // user1はdirectory2の契約書にアクセスできない
      const user1Contract2Permission = await checkContractPermission(user1.id, contract2.id)
      expect(user1Contract2Permission.canRead).toBe(false)
      expect(user1Contract2Permission.canWrite).toBe(false)

      // user2はdirectory2の契約書を読み書きできる
      const user2Contract2Permission = await checkContractPermission(user2.id, contract2.id)
      expect(user2Contract2Permission.canRead).toBe(true)
      expect(user2Contract2Permission.canWrite).toBe(true)

      // 管理者は全ての契約書にアクセスできる
      const adminContract1Permission = await checkContractPermission(admin.id, contract1.id)
      const adminContract2Permission = await checkContractPermission(admin.id, contract2.id)
      expect(adminContract1Permission.canRead).toBe(true)
      expect(adminContract1Permission.canWrite).toBe(true)
      expect(adminContract2Permission.canRead).toBe(true)
      expect(adminContract2Permission.canWrite).toBe(true)
    })
  })
})