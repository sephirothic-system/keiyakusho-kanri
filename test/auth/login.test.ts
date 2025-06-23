import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth'
import { factories, TestDataCleaner } from '../factories/all'
import { testPrisma } from '../factories/index'
import CredentialsProvider from 'next-auth/providers/credentials'

type AuthorizeResult = {
  id: string
  email: string
  name: string
} | null

type CredentialsProviderType = ReturnType<typeof CredentialsProvider> & {
  options: {
    authorize: (credentials: Record<string, string> | undefined) => Promise<AuthorizeResult>
  }
}

describe('ログイン機能', () => {
  beforeEach(async () => {
    // テストデータをクリーンアップ
    await TestDataCleaner.cleanByPrefix('test')
  })

  afterEach(async () => {
    // テスト後のクリーンアップ
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('認証成功ケース', () => {
    it('正しいメールアドレスとパスワードでログインできる', async () => {
      // テストユーザーを作成
      const password = 'testpassword123'
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await factories.user.build({
        email: 'test-login@example.com',
        password: hashedPassword,
        name: 'テストユーザー',
        isActive: true,
      })

      // CredentialsProviderのauthorize関数をテスト
      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: password,
      })

      expect(result).toBeTruthy()
      expect(result.id).toBe(user.id)
      expect(result.email).toBe(user.email)
      expect(result.name).toBe(user.name)
    })

    it('アクティブなユーザーのみログインできる', async () => {
      const password = 'testpassword123'
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await factories.user.build({
        email: 'test-active@example.com',
        password: hashedPassword,
        name: 'アクティブユーザー',
        isActive: true,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: password,
      })

      expect(result).toBeTruthy()
      expect(result.id).toBe(user.id)
    })
  })

  describe('認証失敗ケース', () => {
    it('存在しないメールアドレスではログインできない', async () => {
      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: 'nonexistent@example.com',
        password: 'anypassword',
      })

      expect(result).toBeNull()
    })

    it('間違ったパスワードではログインできない', async () => {
      const password = 'correctpassword'
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await factories.user.build({
        email: 'test-wrong-password@example.com',
        password: hashedPassword,
        name: 'テストユーザー',
        isActive: true,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: 'wrongpassword',
      })

      expect(result).toBeNull()
    })

    it('非アクティブなユーザーはログインできない', async () => {
      const password = 'testpassword123'
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await factories.user.build({
        email: 'test-inactive@example.com',
        password: hashedPassword,
        name: '非アクティブユーザー',
        isActive: false,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: password,
      })

      expect(result).toBeNull()
    })

    it('パスワードが設定されていないユーザーはログインできない', async () => {
      const user = await factories.user.build({
        email: 'test-no-password@example.com',
        password: null,
        name: 'パスワードなしユーザー',
        isActive: true,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: 'anypassword',
      })

      expect(result).toBeNull()
    })

    it('メールアドレスまたはパスワードが空の場合はログインできない', async () => {
      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      // メールアドレスが空
      const result1 = await credentialsProvider.options.authorize({
        email: '',
        password: 'password',
      })
      expect(result1).toBeNull()

      // パスワードが空
      const result2 = await credentialsProvider.options.authorize({
        email: 'test@example.com',
        password: '',
      })
      expect(result2).toBeNull()

      // 両方が空
      const result3 = await credentialsProvider.options.authorize({
        email: '',
        password: '',
      })
      expect(result3).toBeNull()

      // undefinedの場合
      const result4 = await credentialsProvider.options.authorize(undefined)
      expect(result4).toBeNull()
    })
  })

  describe('セキュリティテスト', () => {
    it('パスワードがハッシュ化されて保存されている', async () => {
      const password = 'plainpassword123'
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await factories.user.build({
        email: 'test-hash@example.com',
        password: hashedPassword,
        name: 'ハッシュテストユーザー',
        isActive: true,
      })

      // データベースから直接ユーザーを取得
      const dbUser = await testPrisma.user.findUnique({
        where: { email: user.email },
      })

      expect(dbUser?.password).not.toBe(password)
      expect(dbUser?.password).toBe(hashedPassword)

      // ハッシュが正しく比較できることを確認
      const isValid = await bcrypt.compare(password, dbUser?.password || '')
      expect(isValid).toBe(true)
    })

    it('SQLインジェクション攻撃に対して安全である', async () => {
      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      // SQLインジェクション攻撃を試行
      const result = await credentialsProvider.options.authorize({
        email: "'; DROP TABLE users; --",
        password: "' OR '1'='1",
      })

      expect(result).toBeNull()

      // usersテーブルが存在することを確認（削除されていない）
      const userCount = await testPrisma.user.count()
      expect(userCount).toBeGreaterThanOrEqual(0)
    })
  })
})
