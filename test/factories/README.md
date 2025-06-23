# 🏭 テストファクトリーシステム

Rails の factory_bot のような機能を TypeScript/Next.js/Prisma で実現するテストデータ生成システムです。

## 🚀 **基本的な使い方**

### 1. 単体ファクトリーの使用

```typescript
import { factories } from './factories/all'

// 基本的なユーザー作成
const user = await factories.user.build()

// 属性をオーバーライドしてユーザー作成
const adminUser = await factories.user.build({
  name: 'カスタム管理者',
  email: 'custom-admin@example.com',
})

// 特定タイプのユーザー作成
const admin = await factories.user.createAdmin()
const inactiveUser = await factories.user.createInactiveUser()

// 複数のユーザーを一度に作成
const users = await factories.user.buildList(5)
```

### 2. 関連データの自動生成

```typescript
// 契約書作成時に必要な関連データを自動生成
const contract = await factories.contract.build()
// ↑ オーナー、ディレクトリ、カテゴリが自動作成される

// 特定の関連データを指定
const owner = await factories.user.build()
const directory = await factories.directory.build()
const category = await factories.category.build()

const contract = await factories.contract.createWithRelations(owner, directory, category)
```

### 3. テストシナリオヘルパー

```typescript
import { scenarios } from './factories/all'

// 権限テスト用のセットアップ
const { owner, otherUser, group, directory, contract } = await scenarios.setupPermissionTest()

// 完全なテスト環境をセットアップ
const environment = await scenarios.setupCompleteEnvironment()
const { users, groups, directories, categories, contracts } = environment

// パフォーマンステスト用の大量データ
await scenarios.setupPerformanceTest({
  users: 50,
  contracts: 1000,
})
```

## 📝 **利用可能なファクトリー**

### UserFactory

```typescript
// 基本的なユーザー
const user = await factories.user.build()

// 管理者ユーザー
const admin = await factories.user.createAdmin({
  email: 'my-admin@example.com',
})

// 一般ユーザー
const regularUser = await factories.user.createRegularUser()

// 非アクティブユーザー
const inactiveUser = await factories.user.createInactiveUser()
```

### GroupFactory

```typescript
// 基本的なグループ
const group = await factories.group.build()

// 法務部グループ
const legalGroup = await factories.group.createLegalGroup()

// 営業部グループ
const businessGroup = await factories.group.createBusinessGroup()

// 管理者グループ
const adminGroup = await factories.group.createAdminGroup()
```

### DirectoryFactory

```typescript
// 基本的なディレクトリ
const directory = await factories.directory.build()

// ルートディレクトリ
const rootDir = await factories.directory.createRoot()

// 親ディレクトリ配下にサブディレクトリを作成
const subDir = await factories.directory.createWithParent(rootDir)

// 法務ディレクトリ
const legalDir = await factories.directory.createLegalDirectory(rootDir)

// 営業ディレクトリ
const businessDir = await factories.directory.createBusinessDirectory(rootDir)
```

### CategoryFactory

```typescript
// 基本的なカテゴリ
const category = await factories.category.build()

// NDAカテゴリ
const ndaCategory = await factories.category.createNDACategory()

// 業務カテゴリ
const businessCategory = await factories.category.createBusinessCategory()

// 雇用カテゴリ
const employmentCategory = await factories.category.createEmploymentCategory()
```

### ContractFactory

```typescript
// 基本的な契約書（関連データ自動生成）
const contract = await factories.contract.build()

// 特定のオーナーで契約書作成
const contract = await factories.contract.createForOwner(user)

// 特定のディレクトリに契約書作成
const contract = await factories.contract.createInDirectory(directory)

// NDA契約書
const nda = await factories.contract.createNDA()

// 業務委託契約書
const businessContract = await factories.contract.createBusinessContract()

// ドラフト状態の契約書
const draft = await factories.contract.createDraft()

// 期限切れの契約書
const expired = await factories.contract.createExpired()

// 完全な関連付きで契約書作成
const contract = await factories.contract.createWithRelations(owner, directory, category, {
  title: 'カスタムタイトル',
  status: 'ACTIVE',
})
```

## 🧹 **テストデータのクリーンアップ**

### 自動クリーンアップ

```typescript
import { TestDataCleaner } from './factories/all'

describe('テスト', () => {
  afterEach(async () => {
    // テストプレフィックス付きデータのみ削除
    await TestDataCleaner.cleanByPrefix('test')
  })
})
```

### 手動クリーンアップ

```typescript
// すべてのテストデータを削除
await TestDataCleaner.cleanAll()

// 特定のプレフィックスのデータのみ削除
await TestDataCleaner.cleanByPrefix('specific-test')
```

## 🎯 **実際のテスト例**

### 権限テスト

```typescript
import { scenarios, TestDataCleaner } from './factories/all'

describe('契約書権限テスト', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  it('オーナーは読み書き可能', async () => {
    const { owner, contract } = await scenarios.setupPermissionTest()

    const result = await checkContractPermission(owner.id, contract.id)

    expect(result.canRead).toBe(true)
    expect(result.canWrite).toBe(true)
  })

  it('グループ権限でアクセス可能', async () => {
    const { otherUser, group, contract } = await scenarios.setupPermissionTest()

    // 他のユーザーをグループに追加
    await testPrisma.userGroup.create({
      data: { userId: otherUser.id, groupId: group.id },
    })

    const result = await checkContractPermission(otherUser.id, contract.id)

    expect(result.canRead).toBe(true)
  })
})
```

### 複雑なシナリオテスト

```typescript
it('複数のディレクトリと権限の組み合わせテスト', async () => {
  // 完全な環境をセットアップ
  const env = await scenarios.setupCompleteEnvironment()

  // 法務ユーザーは法務ディレクトリに書き込み可能
  const legalContracts = await getAccessibleContracts(env.users.legalUser.id, 'WRITE')
  expect(legalContracts.length).toBeGreaterThan(0)

  // 営業ユーザーは法務ディレクトリに読み取りのみ
  const businessReadAccess = await checkDirectoryPermission(
    env.users.businessUser.id,
    env.directories.legalDir.id,
    'READ'
  )
  expect(businessReadAccess.canRead).toBe(true)
  expect(businessReadAccess.canWrite).toBe(false)
})
```

## 🔧 **カスタマイズ**

### 独自のファクトリー作成

```typescript
import { BaseFactory, faker, testPrisma } from './index'

export class CustomFactory extends BaseFactory<YourModel> {
  protected defaultAttributes(): Partial<YourModel> {
    return {
      name: faker.string('custom'),
      value: faker.number(1, 100),
    }
  }

  protected async create(attributes: Partial<YourModel>): Promise<YourModel> {
    return testPrisma.yourModel.create({
      data: attributes as any,
    })
  }

  // カスタムメソッド
  async createSpecialType(overrides: Partial<YourModel> = {}): Promise<YourModel> {
    return this.build({
      type: 'special',
      ...overrides,
    })
  }
}
```

## 🎭 **ランダムデータ生成**

```typescript
import { faker } from './factories/all'

// ランダムな文字列
const randomString = faker.string('prefix', 10)

// ランダムなメールアドレス
const email = faker.email('user')

// ランダムな数値
const number = faker.number(1, 100)

// ランダムな日付
const futureDate = faker.date(30) // 30日後
const pastDate = faker.date(-30) // 30日前

// 配列からランダム選択
const status = faker.choice(['ACTIVE', 'INACTIVE', 'PENDING'])
```

## 🚀 **パフォーマンス最適化**

- **並列実行**: 複数のファクトリーは並列で実行される
- **最小限のデータ**: 必要最小限のデータのみ生成
- **効率的なクリーンアップ**: プレフィックスベースの選択的削除
- **トランザクション**: 必要に応じてトランザクション内でデータ生成

## 🔗 **他のテストとの組み合わせ**

```typescript
// E2Eテストでの使用
test('契約書作成フロー', async ({ page }) => {
  const { admin } = await scenarios.setupCompleteEnvironment()

  // ログイン処理
  await page.goto('/login')
  await page.fill('[data-testid="email"]', admin.email)
  // ... 以下テスト処理
})

// API テストでの使用
test('GET /api/contracts/:id', async () => {
  const { owner, contract } = await scenarios.setupPermissionTest()

  const response = await request(app).get(`/api/contracts/${contract.id}`).set('user-id', owner.id)

  expect(response.status).toBe(200)
})
```

## 💡 **ベストプラクティス**

1. **データの分離**: テスト間でデータが競合しないようプレフィックスを使用
2. **クリーンアップ**: 各テスト後に必ずデータをクリーンアップ
3. **最小限のデータ**: テストに必要な最小限のデータのみ作成
4. **再利用可能**: 共通のシナリオはヘルパーとして抽出
5. **可読性**: テストの意図が分かりやすいファクトリー名を使用
