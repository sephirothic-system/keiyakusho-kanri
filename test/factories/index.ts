import { PrismaClient } from '@/lib/generated/prisma'

// テスト用のPrismaクライアント
export const testPrisma = new PrismaClient()

// ランダムデータ生成ヘルパー
export const faker = {
  // ランダムな文字列生成
  string: (prefix = 'test', length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const timestamp = Date.now().toString()
    let result = prefix + '-' + timestamp.slice(-4) + '-'
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
    // 外部キー制約を考慮した正しい順序でデータを削除
    await testPrisma.contractVersion.deleteMany({})
    await testPrisma.contract.deleteMany({})
    await testPrisma.directoryAccess.deleteMany({})
    await testPrisma.userGroup.deleteMany({})
    await testPrisma.directory.deleteMany({})
    await testPrisma.group.deleteMany({})
    await testPrisma.user.deleteMany({})
    await testPrisma.category.deleteMany({})
  }

  static async cleanByPrefix(prefix: string) {
    try {
      // 外部キー制約を考慮した順序で削除

      // 1. 契約書バージョンを削除
      await testPrisma.contractVersion.deleteMany({
        where: {
          contract: {
            title: { startsWith: prefix },
          },
        },
      })

      // 2. 契約書を削除
      await testPrisma.contract.deleteMany({
        where: { title: { startsWith: prefix } },
      })

      // 3. ディレクトリアクセス権限を削除
      await testPrisma.directoryAccess.deleteMany({
        where: {
          OR: [
            {
              directory: {
                name: { startsWith: prefix },
              },
            },
            {
              group: {
                name: { startsWith: prefix },
              },
            },
          ],
        },
      })

      // 4. ユーザーグループ関連を削除
      await testPrisma.userGroup.deleteMany({
        where: {
          OR: [
            {
              user: {
                email: { startsWith: prefix },
              },
            },
            {
              group: {
                name: { startsWith: prefix },
              },
            },
          ],
        },
      })

      // 5. ディレクトリを削除（子から先に）
      await testPrisma.directory.deleteMany({
        where: {
          AND: [
            { name: { startsWith: prefix } },
            { parentId: { not: null } }, // 子ディレクトリから削除
          ],
        },
      })

      await testPrisma.directory.deleteMany({
        where: {
          AND: [
            { name: { startsWith: prefix } },
            { parentId: null }, // 親ディレクトリを削除
          ],
        },
      })

      // 6. グループを削除
      await testPrisma.group.deleteMany({
        where: { name: { startsWith: prefix } },
      })

      // 7. ユーザーを削除
      await testPrisma.user.deleteMany({
        where: { email: { startsWith: prefix } },
      })

      // 8. カテゴリを削除
      await testPrisma.category.deleteMany({
        where: { name: { startsWith: prefix } },
      })
    } catch (error) {
      console.error('クリーンアップエラー:', error)
      // エラーが発生した場合は全削除を試行
      await TestDataCleaner.cleanAll()
    }
  }
}
