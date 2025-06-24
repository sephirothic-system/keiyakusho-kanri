import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // カテゴリの作成
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: '業務委託契約' },
      update: {},
      create: {
        name: '業務委託契約',
        color: '#3B82F6', // blue-500
      },
    }),
    prisma.category.upsert({
      where: { name: '売買契約' },
      update: {},
      create: {
        name: '売買契約',
        color: '#10B981', // green-500
      },
    }),
    prisma.category.upsert({
      where: { name: '賃貸借契約' },
      update: {},
      create: {
        name: '賃貸借契約',
        color: '#F59E0B', // yellow-500
      },
    }),
    prisma.category.upsert({
      where: { name: '雇用契約' },
      update: {},
      create: {
        name: '雇用契約',
        color: '#EF4444', // red-500
      },
    }),
    prisma.category.upsert({
      where: { name: 'NDA' },
      update: {},
      create: {
        name: 'NDA',
        color: '#8B5CF6', // purple-500
      },
    }),
  ])

  console.log('Categories created:', categories.length)

  // テストユーザーの作成
  const testUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: '管理者ユーザー',
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'legal@example.com' },
      update: {},
      create: {
        email: 'legal@example.com',
        name: '法務担当者',
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'manager@example.com' },
      update: {},
      create: {
        email: 'manager@example.com',
        name: 'マネージャー',
        isActive: true,
      },
    }),
  ])

  console.log('Test users created:', testUsers.length)

  // グループの作成
  const groups = await Promise.all([
    prisma.group.upsert({
      where: { name: '管理者' },
      update: {},
      create: {
        name: '管理者',
        description: 'システム管理者グループ',
        isActive: true,
      },
    }),
    prisma.group.upsert({
      where: { name: '法務部' },
      update: {},
      create: {
        name: '法務部',
        description: '法務部門のメンバー',
        isActive: true,
      },
    }),
    prisma.group.upsert({
      where: { name: '営業部' },
      update: {},
      create: {
        name: '営業部',
        description: '営業部門のメンバー',
        isActive: true,
      },
    }),
  ])

  console.log('Groups created:', groups.length)

  // ユーザーとグループの関連付け
  await Promise.all([
    // 管理者ユーザー → 管理者グループ
    prisma.userGroup.upsert({
      where: { userId_groupId: { userId: testUsers[0].id, groupId: groups[0].id } },
      update: {},
      create: {
        userId: testUsers[0].id,
        groupId: groups[0].id,
      },
    }),
    // 法務担当者 → 法務部グループ
    prisma.userGroup.upsert({
      where: { userId_groupId: { userId: testUsers[1].id, groupId: groups[1].id } },
      update: {},
      create: {
        userId: testUsers[1].id,
        groupId: groups[1].id,
      },
    }),
    // マネージャー → 営業部グループ
    prisma.userGroup.upsert({
      where: { userId_groupId: { userId: testUsers[2].id, groupId: groups[2].id } },
      update: {},
      create: {
        userId: testUsers[2].id,
        groupId: groups[2].id,
      },
    }),
  ])

  console.log('User-Group relationships created')

  // ディレクトリ構造の作成（階層構造）
  const rootDirectory = await prisma.directory.upsert({
    where: { path: '/root' },
    update: {},
    create: {
      name: 'root',
      description: 'ルートディレクトリ',
      path: '/root',
      isActive: true,
    },
  })

  const contractsDirectory = await prisma.directory.upsert({
    where: { path: '/root/contracts' },
    update: {},
    create: {
      name: 'contracts',
      description: '契約書管理',
      parentId: rootDirectory.id,
      path: '/root/contracts',
      isActive: true,
    },
  })

  const directories = await Promise.all([
    prisma.directory.upsert({
      where: { path: '/root/contracts/legal' },
      update: {},
      create: {
        name: 'legal',
        description: '法務関連契約書',
        parentId: contractsDirectory.id,
        path: '/root/contracts/legal',
        isActive: true,
      },
    }),
    prisma.directory.upsert({
      where: { path: '/root/contracts/business' },
      update: {},
      create: {
        name: 'business',
        description: '業務関連契約書',
        parentId: contractsDirectory.id,
        path: '/root/contracts/business',
        isActive: true,
      },
    }),
    prisma.directory.upsert({
      where: { path: '/root/contracts/hr' },
      update: {},
      create: {
        name: 'hr',
        description: '人事関連契約書',
        parentId: contractsDirectory.id,
        path: '/root/contracts/hr',
        isActive: true,
      },
    }),
  ])

  console.log('Directory structure created:', directories.length + 2)



  // サンプル契約書の作成
  const sampleContracts = await Promise.all([
    prisma.contract.create({
      data: {
        title: '業務委託契約書（サンプル）',
        content: `# 業務委託契約書

## 第1条（目的）
本契約は、委託者と受託者との間で、以下の業務について委託することを目的とする。

## 第2条（業務内容）
受託者は、委託者より委託された以下の業務を実施する。
- Webアプリケーションの開発
- システムの保守・運用

## 第3条（契約期間）
本契約の期間は、2024年1月1日から2024年12月31日までとする。

## 第4条（報酬）
委託者は、受託者に対し、月額50万円の報酬を支払う。

## 第5条（秘密保持）
両当事者は、本契約の履行に関して知り得た相手方の秘密情報を第三者に開示してはならない。`,
        status: 'ACTIVE',
        contractNumber: 'BC-2024-001',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        ownerId: testUsers[0].id, // 管理者が作成
        directoryId: directories[1].id, // 業務ディレクトリ
        categoryId: categories[0].id, // 業務委託契約
      },
    }),
    prisma.contract.create({
      data: {
        title: '秘密保持契約書（NDA）',
        content: `# 秘密保持契約書

## 第1条（定義）
本契約において「秘密情報」とは、技術情報、営業情報、その他の情報をいう。

## 第2条（秘密保持義務）
受領者は、開示者から開示された秘密情報を厳重に管理し、第三者に開示または漏洩してはならない。

## 第3条（利用制限）
受領者は、秘密情報を本契約の目的以外に利用してはならない。

## 第4条（契約期間）
本契約の有効期間は、契約締結日から5年間とする。`,
        status: 'DRAFT',
        ownerId: testUsers[1].id, // 法務担当者が作成
        directoryId: directories[0].id, // 法務ディレクトリ
        categoryId: categories[4].id, // NDA
      },
    }),
    prisma.contract.create({
      data: {
        title: '雇用契約書（正社員）',
        content: `# 雇用契約書

## 第1条（雇用）
会社は、従業員を正社員として雇用する。

## 第2条（職務内容）
従業員は、会社の指示に従い、誠実に職務を遂行する。

## 第3条（勤務時間）
勤務時間は、午前9時から午後6時までとする。

## 第4条（給与）
基本給は月額30万円とする。`,
        status: 'ACTIVE',
        contractNumber: 'EMP-2024-001',
        startDate: new Date('2024-04-01'),
        ownerId: testUsers[0].id, // 管理者が作成
        directoryId: directories[2].id, // 人事ディレクトリ
        categoryId: categories[3].id, // 雇用契約
      },
    }),
  ])

  console.log('Sample contracts created:', sampleContracts.length)

  // バージョン履歴のサンプル作成
  await Promise.all([
    prisma.contractVersion.create({
      data: {
        version: 1,
        title: '業務委託契約書（サンプル）- 初版',
        content: '# 業務委託契約書（初版）\n\n初版の内容です。',
        changeNote: '初版作成',
        contractId: sampleContracts[0].id,
      },
    }),
    prisma.contractVersion.create({
      data: {
        version: 1,
        title: '秘密保持契約書（NDA）- 初版',
        content: '# 秘密保持契約書（初版）\n\n初版の内容です。',
        changeNote: '初版作成',
        contractId: sampleContracts[1].id,
      },
    }),
  ])

  console.log('Contract versions created')

  console.log('🎉 Seed completed successfully!')
  console.log('📊 Created sample data:')
  console.log(`  - ${testUsers.length} users`)
  console.log(`  - ${groups.length} groups`)
  console.log(`  - ${directories.length + 2} directories`)
  console.log(`  - ${categories.length} categories`)
  console.log(`  - ${sampleContracts.length} contracts`)
}

main()
  .catch(e => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
