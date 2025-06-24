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
    console.log('Setting up complete environment...')
    
    // ユーザー作成
    console.log('Creating users...')
    const admin = await userFactory.createAdmin()
    const legalUser = await userFactory.createRegularUser({ name: 'Legal User' })
    const businessUser = await userFactory.createRegularUser({ name: 'Business User' })
    console.log('Users created:', { admin: admin.id, legalUser: legalUser.id, businessUser: businessUser.id })

    // グループ作成
    console.log('Creating groups...')
    const adminGroup = await groupFactory.createAdminGroup()
    const legalGroup = await groupFactory.createLegalGroup()
    const businessGroup = await groupFactory.createBusinessGroup()
    console.log('Groups created:', { adminGroup: adminGroup.id, legalGroup: legalGroup.id, businessGroup: businessGroup.id })

    // ユーザーとグループの関連付け
    console.log('Creating user-group relationships...')
    await testPrisma.userGroup.createMany({
      data: [
        { userId: admin.id, groupId: adminGroup.id },
        { userId: legalUser.id, groupId: legalGroup.id },
        { userId: businessUser.id, groupId: businessGroup.id },
      ],
    })
    console.log('User-group relationships created')

    // ディレクトリ構造作成
    console.log('Creating directories...')
    const rootDir = await directoryFactory.createRoot({ name: 'test-root' })
    const legalDir = await directoryFactory.createLegalDirectory(rootDir)
    const businessDir = await directoryFactory.createBusinessDirectory(rootDir)
    console.log('Directories created:', { rootDir: rootDir.id, legalDir: legalDir.id, businessDir: businessDir.id })



    // カテゴリ作成
    console.log('Creating categories...')
    const ndaCategory = await categoryFactory.createNDACategory()
    const businessCategory = await categoryFactory.createBusinessCategory()
    const employmentCategory = await categoryFactory.createEmploymentCategory()
    console.log('Categories created:', { ndaCategory: ndaCategory.id, businessCategory: businessCategory.id, employmentCategory: employmentCategory.id })

    // 契約書作成
    console.log('Creating contracts...')
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
    console.log('Contracts created:', { ndaContract: ndaContract.id, businessContract: businessContract.id, draftContract: draftContract.id })

    console.log('Complete environment setup finished')

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
    console.log('Setting up permission test environment...')
    
    // 基本データ作成
    console.log('Creating basic entities...')
    const owner = await userFactory.build()
    const otherUser = await userFactory.build()
    const group = await groupFactory.build()
    const directory = await directoryFactory.build()
    const category = await categoryFactory.build()
    
    console.log('Basic entities created:', {
      owner: owner.id,
      otherUser: otherUser.id, 
      group: group.id,
      directory: directory.id,
      category: category.id
    })

    // オーナーをグループに追加
    console.log('Adding owner to group...')
    await testPrisma.userGroup.create({
      data: { userId: owner.id, groupId: group.id },
    })



    // 契約書作成
    console.log('Creating contract...')
    const contract = await contractFactory.build({
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })
    
    console.log('Permission test environment setup finished')

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
