import { PrismaClient } from '@/lib/generated/prisma'
import { prisma } from '@/lib/prisma'

// テスト用のPrismaクライアント - 本番と同じインスタンスを使用
export const testPrisma = prisma

// ランダムデータ生成ヘルパー
export const faker = {
  // ランダムな文字列生成
  string: (prefix = 'test', length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substring(2, 8)
    let result = prefix + '-' + timestamp.slice(-6) + '-' + random + '-'
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  // ランダムなメールアドレス生成
  email: (prefix = 'test') => {
    return `${faker.string(prefix, 6)}@example.com`
  },

  // ランダムな番号生成
  number: (min = 1, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // ランダムな日付生成
  date: (daysFromNow = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date
  },

  // 配列からランダム選択
  choice: <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  },
}

// ファクトリーベースクラス
export abstract class BaseFactory<T> {
  protected abstract defaultAttributes(): Partial<T>
  protected abstract create(attributes: Partial<T>): Promise<T>

  async build(overrides: Partial<T> = {}): Promise<T> {
    const attributes = { ...this.defaultAttributes(), ...overrides }
    return this.create(attributes)
  }

  async buildList(count: number, overrides: Partial<T> = {}): Promise<T[]> {
    const promises = Array.from({ length: count }, () => this.build(overrides))
    return Promise.all(promises)
  }
}

// テストデータのクリーンアップヘルパー
export class TestDataCleaner {
  static async cleanAll() {
    try {
      // 外部キー制約を考慮した正しい順序でデータを削除
      // 最も依存関係が多いテーブルから順に削除

      // 1. 契約書のバージョン（contract_versions）
      await testPrisma.contractVersion.deleteMany({})

      // 2. 契約書（contracts）
      await testPrisma.contract.deleteMany({})

      // 3. ディレクトリアクセス権限（directory_access）
      await testPrisma.directoryAccess.deleteMany({})

      // 4. ユーザーグループ関連（user_groups）
      await testPrisma.userGroup.deleteMany({})

      // 5. セッション（sessions）
      await testPrisma.session.deleteMany({})

      // 6. アカウント（accounts）
      await testPrisma.account.deleteMany({})

      // 7. 検証トークン（verificationtokens）
      await testPrisma.verificationToken.deleteMany({})

      // 8. ディレクトリ（directories） - 階層構造があるため子から削除
      // 子ディレクトリから順に削除
      const directories = await testPrisma.directory.findMany({
        orderBy: { path: 'desc' }, // パスの深い順（子から削除）
      })
      for (const dir of directories) {
        await testPrisma.directory.delete({ where: { id: dir.id } })
      }

      // 9. グループ（groups）
      await testPrisma.group.deleteMany({})

      // 10. カテゴリ（categories）
      await testPrisma.category.deleteMany({})

      // 11. ユーザー（users） - 最後に削除
      await testPrisma.user.deleteMany({})
          } catch (error) {
      // エラーが発生した場合は、より安全な方法でリトライ
      try {
        // すべてのテーブルを個別にクリーンアップ（エラーを無視）
        const cleanupOperations = [
          () => testPrisma.contractVersion.deleteMany({}),
          () => testPrisma.contract.deleteMany({}),
          () => testPrisma.directoryAccess.deleteMany({}),
          () => testPrisma.userGroup.deleteMany({}),
          () => testPrisma.session.deleteMany({}),
          () => testPrisma.account.deleteMany({}),
          () => testPrisma.verificationToken.deleteMany({}),
          () => testPrisma.directory.deleteMany({}),
          () => testPrisma.group.deleteMany({}),
          () => testPrisma.category.deleteMany({}),
          () => testPrisma.user.deleteMany({}),
        ]

        for (const operation of cleanupOperations) {
          try {
            await operation()
          } catch (opError) {
            // 個別の操作は失敗しても続行
          }
        }
      } catch (retryError) {
        throw retryError
      }
    }
  }

  static async cleanByPrefix(prefix: string) {
    // プレフィックスベースの削除は複雑になりがちなため、
    // テスト環境では全削除を推奨
    await TestDataCleaner.cleanAll()
  }
}
