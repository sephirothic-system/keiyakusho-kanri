import { PrismaClient } from '@prisma/client'

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
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'テストユーザー',
    },
  })

  console.log('Test user created:', testUser.email)

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
        userId: testUser.id,
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
        userId: testUser.id,
        categoryId: categories[4].id, // NDA
      },
    }),
  ])

  console.log('Sample contracts created:', sampleContracts.length)

  // バージョン履歴のサンプル作成
  await prisma.contractVersion.create({
    data: {
      version: 1,
      title: '業務委託契約書（サンプル）- 初版',
      content: '# 業務委託契約書（初版）\n\n初版の内容です。',
      changeNote: '初版作成',
      contractId: sampleContracts[0].id,
    },
  })

  console.log('Contract version created')

  console.log('Seed completed successfully!')
}

main()
  .catch(e => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
