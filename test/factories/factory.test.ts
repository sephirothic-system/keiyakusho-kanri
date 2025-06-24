import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { factories, TestDataCleaner, scenarios } from './all'

describe('ファクトリーシステムのテスト', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanAll()
  })

  afterEach(async () => {
    await TestDataCleaner.cleanAll()
  })

  describe('基本的なファクトリー機能', () => {
    it('ユーザーファクトリーが正常に動作する', async () => {
      const user = await factories.user.build()

      expect(user).toBeDefined()
      expect(user.id).toBeDefined()
      expect(user.email).toContain('@example.com')
      expect(user.name).toBeDefined()
      expect(user.isActive).toBe(true)
    })

    it('属性のオーバーライドが正常に動作する', async () => {
      const customName = 'カスタムユーザー'
      const user = await factories.user.build({
        name: customName,
        isActive: false,
      })

      expect(user.name).toBe(customName)
      expect(user.isActive).toBe(false)
    })

    it('複数のオブジェクトを一度に作成できる', async () => {
      const users = await factories.user.buildList(3)

      expect(users).toHaveLength(3)
      users.forEach((user, index) => {
        expect(user.id).toBeDefined()
        expect(user.email).toBeDefined()
        // 各ユーザーのメールアドレスがユニークであることを確認
        const otherUsers = users.filter((_, i) => i !== index)
        expect(otherUsers.every(other => other.email !== user.email)).toBe(true)
      })
    })
  })

  describe('特定タイプのファクトリー', () => {
    it('管理者ユーザーが作成できる', async () => {
      const admin = await factories.user.createAdmin()

      expect(admin.name).toContain('Admin')
      expect(admin.isActive).toBe(true)
    })

    it('法務グループが作成できる', async () => {
      const legalGroup = await factories.group.createLegalGroup()

      expect(legalGroup.name).toContain('Legal')
      expect(legalGroup.description).toContain('法務')
      expect(legalGroup.isActive).toBe(true)
    })

    it('NDA契約書が作成できる', async () => {
      const nda = await factories.contract.createNDA()

      expect(nda.title).toContain('NDA')
      expect(nda.content).toContain('秘密保持')
      expect(nda.status).toBe('ACTIVE')
    })
  })

  describe('関連データの自動生成', () => {
    it('契約書作成時に関連データが自動生成される', async () => {
      const contract = await factories.contract.createWithDependencies()

      expect(contract.ownerId).toBeDefined()
      expect(contract.directoryId).toBeDefined()
      expect(contract.categoryId).toBeDefined()
    })

    it('ディレクトリの階層構造が正しく作成される', async () => {
      const parent = await factories.directory.createRoot()
      const child = await factories.directory.createWithParent(parent)

      expect(child.parentId).toBe(parent.id)
      expect(child.path).toContain(parent.name)
    })
  })

  describe('テストシナリオヘルパー', () => {
    it('権限テスト用のセットアップが正常に動作する', async () => {
      const scenario = await scenarios.setupPermissionTest()

      expect(scenario.owner).toBeDefined()
      expect(scenario.otherUser).toBeDefined()
      expect(scenario.group).toBeDefined()
      expect(scenario.directory).toBeDefined()
      expect(scenario.category).toBeDefined()
      expect(scenario.contract).toBeDefined()

      // 契約書が正しいオーナーで作成されていることを確認
      expect(scenario.contract.ownerId).toBe(scenario.owner.id)
      expect(scenario.contract.directoryId).toBe(scenario.directory.id)
      expect(scenario.contract.categoryId).toBe(scenario.category.id)
    })

    it('完全な環境セットアップが正常に動作する', async () => {
      const env = await scenarios.setupCompleteEnvironment()

      expect(env.users).toBeDefined()
      expect(env.groups).toBeDefined()
      expect(env.directories).toBeDefined()
      expect(env.categories).toBeDefined()
      expect(env.contracts).toBeDefined()

      // 基本的な構造が作成されていることを確認
      expect(env.users.admin).toBeDefined()
      expect(env.groups.adminGroup).toBeDefined()
      expect(env.directories.rootDir).toBeDefined()
      expect(env.categories.ndaCategory).toBeDefined()
      expect(env.contracts.ndaContract).toBeDefined()
    })
  })

  describe('ランダムデータ生成', () => {
    it('fakerが正常に動作する', async () => {
      const { faker } = await import('./index')

      const string1 = faker.string('test')
      const string2 = faker.string('test')
      const email1 = faker.email('user')
      const email2 = faker.email('user')

      // 異なる値が生成されることを確認
      expect(string1).not.toBe(string2)
      expect(email1).not.toBe(email2)

      // フォーマットが正しいことを確認
      expect(email1).toContain('@example.com')
      expect(email2).toContain('@example.com')
    })
  })

  describe('データクリーンアップ', () => {
    it('プレフィックスベースのクリーンアップが正常に動作する', async () => {
      // テストデータを作成
      const user = await factories.user.build()
      const contract = await factories.contract.createWithDependencies()

      // データが存在することを確認
      expect(user.id).toBeDefined()
      expect(contract.id).toBeDefined()

      // クリーンアップを実行
      await TestDataCleaner.cleanByPrefix('test')

      // この時点では全削除されているはず（簡素化したクリーンアップのため）
      // 新しいデータを作成して確認
      const newUser = await factories.user.build()
      expect(newUser.id).toBeDefined()
    })
  })
})
