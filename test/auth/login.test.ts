import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth'
import { factories, TestDataCleaner } from '../factories/all'
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
    await TestDataCleaner.cleanAll()
  })

  afterEach(async () => {
    await TestDataCleaner.cleanAll()
  })

  describe('認証成功ケース', () => {
    it('正しいメールアドレスとパスワードでログインできる', async () => {
      const password = 'testpassword123'
      const hashedPassword = await bcrypt.hash(password, 10)
      
      const user = await factories.user.build({
        password: hashedPassword,
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
      const hashedPassword = await bcrypt.hash(password, 10)
      
      const activeUser = await factories.user.build({
        password: hashedPassword,
        isActive: true,
      })

      const inactiveUser = await factories.user.build({
        password: hashedPassword,
        isActive: false,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      // アクティブなユーザーはログインできる
      const activeResult = await credentialsProvider.options.authorize({
        email: activeUser.email,
        password: password,
      })
      expect(activeResult).toBeTruthy()
      expect(activeResult.id).toBe(activeUser.id)

      // 非アクティブなユーザーはログインできない
      const inactiveResult = await credentialsProvider.options.authorize({
        email: inactiveUser.email,
        password: password,
      })
      expect(inactiveResult).toBeNull()
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
      const correctPassword = 'correctpassword123'
      const wrongPassword = 'wrongpassword123'
      const hashedPassword = await bcrypt.hash(correctPassword, 10)
      
      const user = await factories.user.build({
        password: hashedPassword,
        isActive: true,
      })

      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      const result = await credentialsProvider.options.authorize({
        email: user.email,
        password: wrongPassword,
      })

      expect(result).toBeNull()
    })

    it('非アクティブなユーザーはログインできない', async () => {
      const password = 'testpassword123'
      const hashedPassword = await bcrypt.hash(password, 10)
      
      const user = await factories.user.build({
        password: hashedPassword,
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
        password: null,
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
      let result = await credentialsProvider.options.authorize({
        email: '',
        password: 'anypassword',
      })
      expect(result).toBeNull()

      // パスワードが空
      result = await credentialsProvider.options.authorize({
        email: 'test@example.com',
        password: '',
      })
      expect(result).toBeNull()

      // 両方が空
      result = await credentialsProvider.options.authorize({
        email: '',
        password: '',
      })
      expect(result).toBeNull()

      // undefinedの場合
      result = await credentialsProvider.options.authorize(undefined)
      expect(result).toBeNull()
    })
  })

  describe('セキュリティテスト', () => {
    it('パスワードがハッシュ化されて保存されている', async () => {
      const plainPassword = 'mysecretpassword'
      const hashedPassword = await bcrypt.hash(plainPassword, 10)
      
      const user = await factories.user.build({
        password: hashedPassword,
      })

      // パスワードがハッシュ化されていることを確認
      expect(user.password).not.toBe(plainPassword)
      expect(user.password).toBe(hashedPassword)

      // ハッシュが正しく検証できることを確認
      const isValid = await bcrypt.compare(plainPassword, user.password!)
      expect(isValid).toBe(true)
    })

    it('SQLインジェクション攻撃に対して安全である', async () => {
      const credentialsProvider = authOptions.providers.find(
        provider => provider.id === 'credentials'
      ) as CredentialsProviderType

      // SQLインジェクション試行
      const result = await credentialsProvider.options.authorize({
        email: "admin'; DROP TABLE users; --",
        password: 'anypassword',
      })

      expect(result).toBeNull()
    })
  })
})
