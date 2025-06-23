// すべてのファクトリーをエクスポート
export * from './index'
export * from './user.factory'
export * from './group.factory'
export * from './category.factory'
export * from './directory.factory'
export * from './contract.factory'

import { Directory } from '@/lib/generated/prisma'
import { userFactory } from './user.factory'
import { groupFactory } from './group.factory'
import { categoryFactory } from './category.factory'
import { directoryFactory } from './directory.factory'
import { contractFactory } from './contract.factory'
import { testPrisma } from './index'

// テストシナリオヘルパー
export class TestScenarioBuilder {
  /**
   * 完全なテスト環境をセットアップ
   * ユーザー、グループ、ディレクトリ、カテゴリ、契約書を一括作成
   */
  static async setupCompleteEnvironment() {
    // ユーザー作成
    const admin = await userFactory.createAdmin()
    const legalUser = await userFactory.createRegularUser({ name: 'Legal User' })
    const businessUser = await userFactory.createRegularUser({ name: 'Business User' })

    // グループ作成
    const adminGroup = await groupFactory.createAdminGroup()
    const legalGroup = await groupFactory.createLegalGroup()
    const businessGroup = await groupFactory.createBusinessGroup()

    // ユーザーとグループの関連付け
    await testPrisma.userGroup.createMany({
      data: [
        { userId: admin.id, groupId: adminGroup.id },
        { userId: legalUser.id, groupId: legalGroup.id },
        { userId: businessUser.id, groupId: businessGroup.id },
      ],
    })

    // ディレクトリ構造作成
    const rootDir = await directoryFactory.createRoot({ name: 'test-root' })
    const legalDir = await directoryFactory.createLegalDirectory(rootDir)
    const businessDir = await directoryFactory.createBusinessDirectory(rootDir)

    // ディレクトリアクセス権限設定
    await testPrisma.directoryAccess.createMany({
      data: [
        // 管理者はすべてに書き込み権限
        { directoryId: rootDir.id, groupId: adminGroup.id, permission: 'WRITE' },
        { directoryId: legalDir.id, groupId: adminGroup.id, permission: 'WRITE' },
        { directoryId: businessDir.id, groupId: adminGroup.id, permission: 'WRITE' },
        // 法務部は法務ディレクトリに書き込み権限
        { directoryId: legalDir.id, groupId: legalGroup.id, permission: 'WRITE' },
        // 営業部は営業ディレクトリに書き込み権限
        { directoryId: businessDir.id, groupId: businessGroup.id, permission: 'WRITE' },
        // 営業部は法務ディレクトリに読み取り権限
        { directoryId: legalDir.id, groupId: businessGroup.id, permission: 'READ' },
      ],
    })

    // カテゴリ作成
    const ndaCategory = await categoryFactory.createNDACategory()
    const businessCategory = await categoryFactory.createBusinessCategory()
    const employmentCategory = await categoryFactory.createEmploymentCategory()

    // 契約書作成
    const ndaContract = await contractFactory.createNDA({
      ownerId: legalUser.id,
      directoryId: legalDir.id,
      categoryId: ndaCategory.id,
    })

    const businessContract = await contractFactory.createBusinessContract({
      ownerId: businessUser.id,
      directoryId: businessDir.id,
      categoryId: businessCategory.id,
    })

    const draftContract = await contractFactory.createDraft({
      ownerId: admin.id,
      directoryId: legalDir.id,
      categoryId: employmentCategory.id,
    })

    return {
      users: { admin, legalUser, businessUser },
      groups: { adminGroup, legalGroup, businessGroup },
      directories: { rootDir, legalDir, businessDir },
      categories: { ndaCategory, businessCategory, employmentCategory },
      contracts: { ndaContract, businessContract, draftContract },
    }
  }

  /**
   * 権限テスト用のシンプルなセットアップ
   */
  static async setupPermissionTest() {
    const owner = await userFactory.build()
    const otherUser = await userFactory.build()

    const group = await groupFactory.build()
    const directory = await directoryFactory.build()
    const category = await categoryFactory.build()

    // オーナーをグループに追加
    await testPrisma.userGroup.create({
      data: { userId: owner.id, groupId: group.id },
    })

    // グループにディレクトリアクセス権限を付与
    await testPrisma.directoryAccess.create({
      data: {
        directoryId: directory.id,
        groupId: group.id,
        permission: 'WRITE',
      },
    })

    const contract = await contractFactory.createWithRelations(owner, directory, category)

    return {
      owner,
      otherUser,
      group,
      directory,
      category,
      contract,
    }
  }

  /**
   * パフォーマンステスト用の大量データ作成
   */
  static async setupPerformanceTest(
    counts: {
      users?: number
      groups?: number
      directories?: number
      contracts?: number
    } = {}
  ) {
    const {
      users: userCount = 10,
      groups: groupCount = 5,
      directories: dirCount = 20,
      contracts: contractCount = 100,
    } = counts

    console.log(
      `Creating performance test data: ${userCount} users, ${groupCount} groups, ${dirCount} directories, ${contractCount} contracts`
    )

    // 並列でデータ作成
    const [users, groups, categories] = await Promise.all([
      userFactory.buildList(userCount),
      groupFactory.buildList(groupCount),
      categoryFactory.buildList(5), // カテゴリは固定で5つ
    ])

    // ディレクトリ作成（階層構造考慮のため順次）
    const directories: Directory[] = []
    const rootDir = await directoryFactory.createRoot()
    directories.push(rootDir)

    for (let i = 1; i < dirCount; i++) {
      const parent = directories[Math.floor(Math.random() * directories.length)]
      const dir = await directoryFactory.createWithParent(parent)
      directories.push(dir)
    }

    // 契約書作成
    const contracts = []
    for (let i = 0; i < contractCount; i += 10) {
      const batch = Array.from({ length: Math.min(10, contractCount - i) }, () => {
        const owner = users[Math.floor(Math.random() * users.length)]
        const directory = directories[Math.floor(Math.random() * directories.length)]
        const category = categories[Math.floor(Math.random() * categories.length)]

        return contractFactory.createWithRelations(owner, directory, category)
      })

      const batchResults = await Promise.all(batch)
      contracts.push(...batchResults)
    }

    console.log(`Performance test data created successfully`)

    return {
      users,
      groups,
      directories,
      categories,
      contracts,
    }
  }
}

// よく使用される組み合わせのショートカット
export const factories = {
  user: userFactory,
  group: groupFactory,
  category: categoryFactory,
  directory: directoryFactory,
  contract: contractFactory,
}

export const scenarios = TestScenarioBuilder
