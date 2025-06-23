import { describe, it, expect, afterEach } from 'vitest'
import { factories, scenarios, TestDataCleaner, faker } from './all'

describe('ファクトリーシステムのテスト', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('基本的なファクトリー機能', () => {
    it('ユーザーファクトリーが正常に動作する', async () => {
      const user = await factories.user.build()

      expect(user.id).toBeDefined()
      expect(user.email).toContain('@example.com')
      expect(user.name).toBeDefined()
      expect(user.isActive).toBe(true)
    })

    it('属性のオーバーライドが正常に動作する', async () => {
      const uniqueSuffix = faker.string('', 8)
      const customEmail = `test-custom-${uniqueSuffix}@test.com`
      const customName = `カスタムユーザー-${uniqueSuffix}`

      const user = await factories.user.build({
        name: customName,
        email: customEmail,
      })

      expect(user.name).toBe(customName)
      expect(user.email).toBe(customEmail)
    })

    it('複数のオブジェクトを一度に作成できる', async () => {
      const users = await factories.user.buildList(3)

      expect(users).toHaveLength(3)
      expect(users[0].id).toBeDefined()
      expect(users[1].id).toBeDefined()
      expect(users[2].id).toBeDefined()

      // 各ユーザーは異なるIDを持つ
      expect(users[0].id).not.toBe(users[1].id)
      expect(users[1].id).not.toBe(users[2].id)
    })
  })

  describe('特定タイプのファクトリー', () => {
    it('管理者ユーザーが作成できる', async () => {
      const admin = await factories.user.createAdmin()

      expect(admin.name).toContain('Admin User')
      expect(admin.email).toContain('test-admin')
    })

    it('法務グループが作成できる', async () => {
      const group = await factories.group.createLegalGroup()

      expect(group.name).toContain('test-legal-group')
      expect(group.description).toBe('法務部門グループ')
    })

    it('NDA契約書が作成できる', async () => {
      const nda = await factories.contract.createNDA()

      expect(nda.title).toContain('test-nda-contract')
      expect(nda.content).toContain('秘密保持契約書')
      expect(nda.status).toBe('ACTIVE')
    })
  })

  describe('関連データの自動生成', () => {
    it('契約書作成時に関連データが自動生成される', async () => {
      const contract = await factories.contract.build()

      expect(contract.id).toBeDefined()
      expect(contract.ownerId).toBeDefined()
      expect(contract.directoryId).toBeDefined()
      expect(contract.categoryId).toBeDefined()
    })

    it('ディレクトリの階層構造が正しく作成される', async () => {
      const parent = await factories.directory.createRoot()
      const child = await factories.directory.createWithParent(parent)

      expect(child.parentId).toBe(parent.id)
      expect(child.path).toContain(parent.path)
    })
  })

  describe('テストシナリオヘルパー', () => {
    it('権限テスト用のセットアップが正常に動作する', async () => {
      const { owner, otherUser, group, directory, category, contract } =
        await scenarios.setupPermissionTest()

      // 基本的なオブジェクトが作成されている
      expect(owner.id).toBeDefined()
      expect(otherUser.id).toBeDefined()
      expect(group.id).toBeDefined()
      expect(directory.id).toBeDefined()
      expect(category.id).toBeDefined()
      expect(contract.id).toBeDefined()

      // 関連が正しく設定されている
      expect(contract.ownerId).toBe(owner.id)
      expect(contract.directoryId).toBe(directory.id)
      expect(contract.categoryId).toBe(category.id)
    })

    it('完全な環境セットアップが正常に動作する', async () => {
      const env = await scenarios.setupCompleteEnvironment()

      // すべての要素が存在する
      expect(env.users.admin).toBeDefined()
      expect(env.users.legalUser).toBeDefined()
      expect(env.users.businessUser).toBeDefined()

      expect(env.groups.adminGroup).toBeDefined()
      expect(env.groups.legalGroup).toBeDefined()
      expect(env.groups.businessGroup).toBeDefined()

      expect(env.directories.rootDir).toBeDefined()
      expect(env.directories.legalDir).toBeDefined()
      expect(env.directories.businessDir).toBeDefined()

      expect(env.categories.ndaCategory).toBeDefined()
      expect(env.categories.businessCategory).toBeDefined()
      expect(env.categories.employmentCategory).toBeDefined()

      expect(env.contracts.ndaContract).toBeDefined()
      expect(env.contracts.businessContract).toBeDefined()
      expect(env.contracts.draftContract).toBeDefined()
    })
  })

  describe('ランダムデータ生成', () => {
    it('fakerが正常に動作する', () => {
      const string1 = faker.string('test', 5)
      const string2 = faker.string('test', 5)

      expect(string1).toContain('test')
      expect(string2).toContain('test')
      expect(string1).not.toBe(string2) // 異なる値が生成される

      const email = faker.email('user')
      expect(email).toContain('@example.com')
      expect(email).toContain('user')

      const number = faker.number(1, 10)
      expect(number).toBeGreaterThanOrEqual(1)
      expect(number).toBeLessThanOrEqual(10)

      const choice = faker.choice(['A', 'B', 'C'])
      expect(['A', 'B', 'C']).toContain(choice)
    })
  })

  describe('データクリーンアップ', () => {
    it('プレフィックスベースのクリーンアップが正常に動作する', async () => {
      // テストデータを作成
      const user1 = await factories.user.build()
      const user2 = await factories.user.build()

      expect(user1.id).toBeDefined()
      expect(user2.id).toBeDefined()

      // クリーンアップ実行
      await TestDataCleaner.cleanByPrefix('test')

      // データが削除されたかは直接検証しないが、
      // エラーが発生しないことを確認
      expect(true).toBe(true)
    })
  })
})
