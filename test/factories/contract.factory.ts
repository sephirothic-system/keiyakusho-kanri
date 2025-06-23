import { Contract, ContractStatus, User, Directory, Category } from '@/lib/generated/prisma'
import { BaseFactory, faker, testPrisma } from './index'
import { userFactory } from './user.factory'
import { directoryFactory } from './directory.factory'
import { categoryFactory } from './category.factory'

export class ContractFactory extends BaseFactory<Contract> {
  protected defaultAttributes(): Partial<Contract> {
    const uniqueSuffix = faker.string('', 8)
    return {
      title: faker.string(`test-contract-${uniqueSuffix}`, 10),
      content: this.generateSampleContent(),
      status: faker.choice([
        'DRAFT',
        'REVIEW',
        'ACTIVE',
        'EXPIRED',
        'TERMINATED',
      ] as ContractStatus[]),
      contractNumber: `TEST-${faker.number(1000, 9999)}-${uniqueSuffix}`,
      startDate: faker.date(-30), // 30日前から
      endDate: faker.date(365), // 365日後まで
    }
  }

  protected async create(attributes: Partial<Contract>): Promise<Contract> {
    // 必要に応じて関連データを自動生成
    const finalAttributes = { ...attributes }

    // オーナーが指定されていない場合は作成
    if (!finalAttributes.ownerId) {
      const owner = await userFactory.build()
      finalAttributes.ownerId = owner.id
    }

    // ディレクトリが指定されていない場合は作成
    if (!finalAttributes.directoryId) {
      const directory = await directoryFactory.build()
      finalAttributes.directoryId = directory.id
    }

    // カテゴリが指定されていない場合は作成
    if (finalAttributes.categoryId === undefined) {
      const category = await categoryFactory.build()
      finalAttributes.categoryId = category.id
    }

    return testPrisma.contract.create({
      data: {
        title: finalAttributes.title || this.defaultAttributes().title!,
        content: finalAttributes.content || this.defaultAttributes().content!,
        status: finalAttributes.status || this.defaultAttributes().status!,
        contractNumber: finalAttributes.contractNumber || this.defaultAttributes().contractNumber,
        ownerId: finalAttributes.ownerId!,
        directoryId: finalAttributes.directoryId!,
        categoryId: finalAttributes.categoryId,
        startDate: finalAttributes.startDate || this.defaultAttributes().startDate,
        endDate: finalAttributes.endDate || this.defaultAttributes().endDate,
        ...finalAttributes,
      },
    })
  }

  // 特定のオーナーで作成
  async createForOwner(owner: User, overrides: Partial<Contract> = {}): Promise<Contract> {
    return this.build({
      ownerId: owner.id,
      ...overrides,
    })
  }

  // 特定のディレクトリに作成
  async createInDirectory(
    directory: Directory,
    overrides: Partial<Contract> = {}
  ): Promise<Contract> {
    return this.build({
      directoryId: directory.id,
      ...overrides,
    })
  }

  // 特定のカテゴリで作成
  async createWithCategory(
    category: Category,
    overrides: Partial<Contract> = {}
  ): Promise<Contract> {
    return this.build({
      categoryId: category.id,
      ...overrides,
    })
  }

  // 完全な関連付きで作成
  async createWithRelations(
    owner: User,
    directory: Directory,
    category: Category,
    overrides: Partial<Contract> = {}
  ): Promise<Contract> {
    return this.build({
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
      ...overrides,
    })
  }

  // NDA契約書作成
  async createNDA(overrides: Partial<Contract> = {}): Promise<Contract> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      title: faker.string(`test-nda-contract-${uniqueSuffix}`, 10),
      content: this.generateNDAContent(),
      status: 'ACTIVE',
      ...overrides,
    })
  }

  // 業務委託契約書作成
  async createBusinessContract(overrides: Partial<Contract> = {}): Promise<Contract> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      title: faker.string(`test-business-contract-${uniqueSuffix}`, 10),
      content: this.generateBusinessContent(),
      status: 'ACTIVE',
      contractNumber: `BC-${faker.number(1000, 9999)}-${uniqueSuffix}`,
      ...overrides,
    })
  }

  // ドラフト状態の契約書作成
  async createDraft(overrides: Partial<Contract> = {}): Promise<Contract> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      title: faker.string(`test-draft-contract-${uniqueSuffix}`, 10),
      status: 'DRAFT',
      contractNumber: null,
      startDate: null,
      endDate: null,
      ...overrides,
    })
  }

  // 期限切れ契約書作成
  async createExpired(overrides: Partial<Contract> = {}): Promise<Contract> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      title: faker.string(`test-expired-contract-${uniqueSuffix}`, 10),
      status: 'EXPIRED',
      startDate: faker.date(-365), // 1年前
      endDate: faker.date(-30), // 30日前
      ...overrides,
    })
  }

  // サンプルコンテンツ生成
  private generateSampleContent(): string {
    const uniqueSuffix = faker.string('', 6)
    return `# ${faker.string('契約書', 10)}-${uniqueSuffix}

## 第1条（目的）
本契約は、甲と乙との間で、以下の事項について定めることを目的とする。

## 第2条（内容）
${faker.string('契約内容', 10)}について詳細を定める。

## 第3条（期間）
本契約の期間は、契約締結日から1年間とする。

## 第4条（条件）
- 条件1: ${faker.string('条件', 6)}
- 条件2: ${faker.string('条件', 6)}
- 条件3: ${faker.string('条件', 6)}

## 第5条（その他）
本契約に定めのない事項については、双方協議の上決定する。`
  }

  private generateNDAContent(): string {
    return `# 秘密保持契約書

## 第1条（定義）
本契約において「秘密情報」とは、技術情報、営業情報、その他の情報をいう。

## 第2条（秘密保持義務）  
受領者は、開示者から開示された秘密情報を厳重に管理し、第三者に開示または漏洩してはならない。

## 第3条（利用制限）
受領者は、秘密情報を本契約の目的以外に利用してはならない。

## 第4条（契約期間）
本契約の有効期間は、契約締結日から5年間とする。`
  }

  private generateBusinessContent(): string {
    return `# 業務委託契約書

## 第1条（目的）
本契約は、委託者と受託者との間で、以下の業務について委託することを目的とする。

## 第2条（業務内容）
受託者は、委託者より委託された以下の業務を実施する。
- システム開発業務
- 保守・運用業務

## 第3条（契約期間）
本契約の期間は、契約締結日から1年間とする。

## 第4条（報酬）
委託者は、受託者に対し、月額50万円の報酬を支払う。`
  }
}

export const contractFactory = new ContractFactory()
