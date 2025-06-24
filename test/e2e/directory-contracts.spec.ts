import { test, expect } from '@playwright/test'
import { factories, scenarios, TestDataCleaner } from '../factories/all'

test.describe('ディレクトリ内契約書一覧機能', () => {
  test.afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('e2e-test')
  })

  test('ディレクトリ内の契約書一覧が正しく表示されること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ 
      name: 'e2e-test-directory',
      description: 'E2Eテスト用ディレクトリ'
    })
    const owner = await factories.user.build({ name: 'E2E Test User' })
    const category = await factories.category.build({ name: 'E2E Category' })

    // 複数の契約書を作成（新しい順を確認するため）
    await factories.contract.build({
      title: 'E2E Contract 1',
      status: 'ACTIVE',
      contractNumber: 'E2E-001',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
      createdAt: new Date('2024-01-01'),
    })

    await factories.contract.build({
      title: 'E2E Contract 2',
      status: 'DRAFT',
      contractNumber: 'E2E-002',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
      createdAt: new Date('2024-01-02'),
    })

    await factories.contract.build({
      title: 'E2E Contract 3',
      status: 'REVIEW',
      contractNumber: 'E2E-003',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
      createdAt: new Date('2024-01-03'),
    })

    // ページに移動
    await page.goto(`/directories/${directory.id}/contracts`)

    // ディレクトリ情報の確認
    await expect(page.getByText('e2e-test-directory')).toBeVisible()
    await expect(page.getByText('E2Eテスト用ディレクトリ')).toBeVisible()

    // 契約書一覧の確認
    await expect(page.getByText('契約書一覧')).toBeVisible()
    await expect(page.getByText('（3件）')).toBeVisible()

    // 契約書が新しい順に表示されることを確認
    const contractTitles = await page.locator('[data-testid="contract-title"]').allTextContents()
    expect(contractTitles).toEqual(['E2E Contract 3', 'E2E Contract 2', 'E2E Contract 1'])

    // 各契約書の詳細情報確認
    await expect(page.getByText('E2E Contract 1')).toBeVisible()
    await expect(page.getByText('アクティブ')).toBeVisible()
    await expect(page.getByText('契約番号: E2E-001')).toBeVisible()
    await expect(page.getByText('E2E Test User')).toBeVisible()

    await expect(page.getByText('E2E Contract 2')).toBeVisible()
    await expect(page.getByText('ドラフト')).toBeVisible()

    await expect(page.getByText('E2E Contract 3')).toBeVisible()
    await expect(page.getByText('レビュー中')).toBeVisible()
  })

  test('検索機能が正常に動作すること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ name: 'e2e-search-test' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    // 異なる名前の契約書を作成
    await factories.contract.build({
      title: 'NDA契約書',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await factories.contract.build({
      title: '業務委託契約書',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await factories.contract.build({
      title: '雇用契約書',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await page.goto(`/directories/${directory.id}/contracts`)

    // 初期状態では全ての契約書が表示される
    await expect(page.getByText('（3件）')).toBeVisible()
    await expect(page.getByText('NDA契約書')).toBeVisible()
    await expect(page.getByText('業務委託契約書')).toBeVisible()
    await expect(page.getByText('雇用契約書')).toBeVisible()

    // 検索実行
    const searchInput = page.getByPlaceholder('契約書名で検索...')
    await searchInput.fill('NDA')
    await page.getByRole('button', { name: '検索' }).click()

    // 検索結果の確認
    await expect(page.getByText('（1件）')).toBeVisible()
    await expect(page.getByText('NDA契約書')).toBeVisible()
    await expect(page.getByText('業務委託契約書')).not.toBeVisible()
    await expect(page.getByText('雇用契約書')).not.toBeVisible()

    // URLパラメータが更新されることを確認
    expect(page.url()).toContain('search=NDA')

    // 別の検索を実行
    await searchInput.fill('業務')
    await page.getByRole('button', { name: '検索' }).click()

    await expect(page.getByText('（1件）')).toBeVisible()
    await expect(page.getByText('業務委託契約書')).toBeVisible()
    await expect(page.getByText('NDA契約書')).not.toBeVisible()

    // 検索クリア
    await page.getByRole('button', { name: 'クリア' }).click()

    await expect(page.getByText('（3件）')).toBeVisible()
    await expect(page.getByText('NDA契約書')).toBeVisible()
    await expect(page.getByText('業務委託契約書')).toBeVisible()
    await expect(page.getByText('雇用契約書')).toBeVisible()
    expect(page.url()).not.toContain('search=')
  })

  test('ページネーション機能が正常に動作すること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ name: 'e2e-pagination-test' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    // 25件の契約書を作成
    for (let i = 1; i <= 25; i++) {
      await factories.contract.build({
        title: `Pagination Test Contract ${i.toString().padStart(2, '0')}`,
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`),
      })
    }

    await page.goto(`/directories/${directory.id}/contracts`)

    // 1ページ目の確認
    await expect(page.getByText('（25件）')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 25')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 16')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 15')).not.toBeVisible()

    // ページネーションコントロールの確認
    await expect(page.getByRole('button', { name: '前へ' })).toBeDisabled()
    await expect(page.getByRole('button', { name: '次へ' })).toBeEnabled()
    await expect(page.getByRole('button', { name: '1' })).toHaveClass(/default/)
    await expect(page.getByRole('button', { name: '2' })).toBeVisible()
    await expect(page.getByRole('button', { name: '3' })).toBeVisible()

    // 2ページ目へ移動
    await page.getByRole('button', { name: '次へ' }).click()

    await expect(page.getByText('Pagination Test Contract 15')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 06')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 25')).not.toBeVisible()
    await expect(page.getByText('Pagination Test Contract 05')).not.toBeVisible()

    // URLパラメータの確認
    expect(page.url()).toContain('page=2')

    // ページネーションコントロールの状態確認
    await expect(page.getByRole('button', { name: '前へ' })).toBeEnabled()
    await expect(page.getByRole('button', { name: '次へ' })).toBeEnabled()
    await expect(page.getByRole('button', { name: '2' })).toHaveClass(/default/)

    // 3ページ目（最後のページ）へ移動
    await page.getByRole('button', { name: '3' }).click()

    await expect(page.getByText('Pagination Test Contract 05')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 01')).toBeVisible()
    await expect(page.getByText('Pagination Test Contract 06')).not.toBeVisible()

    // 最後のページでは「次へ」ボタンが無効
    await expect(page.getByRole('button', { name: '前へ' })).toBeEnabled()
    await expect(page.getByRole('button', { name: '次へ' })).toBeDisabled()

    // 前のページに戻る
    await page.getByRole('button', { name: '前へ' }).click()

    expect(page.url()).toContain('page=2')
    await expect(page.getByText('Pagination Test Contract 15')).toBeVisible()
  })

  test('検索とページネーションの組み合わせが正常に動作すること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ name: 'e2e-search-pagination' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    // 「テスト」を含む契約書15件と含まない契約書5件を作成
    for (let i = 1; i <= 15; i++) {
      await factories.contract.build({
        title: `テスト契約書${i}`,
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`),
      })
    }

    for (let i = 1; i <= 5; i++) {
      await factories.contract.build({
        title: `Other契約書${i}`,
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })
    }

    await page.goto(`/directories/${directory.id}/contracts`)

    // 検索実行
    await page.getByPlaceholder('契約書名で検索...').fill('テスト')
    await page.getByRole('button', { name: '検索' }).click()

    // 検索結果の1ページ目確認
    await expect(page.getByText('（15件）')).toBeVisible()
    await expect(page.getByText('テスト契約書15')).toBeVisible()
    await expect(page.getByText('テスト契約書6')).toBeVisible()
    await expect(page.getByText('テスト契約書5')).not.toBeVisible()
    await expect(page.getByText('Other契約書1')).not.toBeVisible()

    // 2ページ目へ移動
    await page.getByRole('button', { name: '次へ' }).click()

    // URLパラメータの確認（検索条件が保持される）
    expect(page.url()).toContain('search=テスト')
    expect(page.url()).toContain('page=2')

    // 2ページ目の検索結果確認
    await expect(page.getByText('テスト契約書5')).toBeVisible()
    await expect(page.getByText('テスト契約書1')).toBeVisible()
    await expect(page.getByText('テスト契約書6')).not.toBeVisible()
    await expect(page.getByText('Other契約書1')).not.toBeVisible()
  })

  test('契約書クリックで詳細ページに遷移すること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ name: 'e2e-navigation-test' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    const contract = await factories.contract.build({
      title: 'Navigation Test Contract',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await page.goto(`/directories/${directory.id}/contracts`)

    // 契約書をクリック
    await page.getByText('Navigation Test Contract').click()

    // 契約書詳細ページに遷移することを確認
    await expect(page).toHaveURL(`/contracts/${contract.id}`)
  })

  test('ディレクトリ一覧ボタンで前のページに戻れること', async ({ page }) => {
    const directory = await factories.directory.build({ name: 'e2e-back-test' })

    await page.goto(`/directories/${directory.id}/contracts`)

    // ディレクトリ一覧ボタンをクリック
    await page.getByRole('button', { name: 'ディレクトリ一覧' }).click()

    // ディレクトリ一覧ページに遷移することを確認
    await expect(page).toHaveURL('/directories')
  })

  test('空のディレクトリでは適切なメッセージが表示されること', async ({ page }) => {
    const directory = await factories.directory.build({ name: 'e2e-empty-test' })

    await page.goto(`/directories/${directory.id}/contracts`)

    await expect(page.getByText('契約書がありません')).toBeVisible()
    await expect(page.getByText('このディレクトリには契約書が登録されていません')).toBeVisible()
    await expect(page.getByText('（0件）')).toBeVisible()
  })

  test('検索結果が空の場合に適切なメッセージが表示されること', async ({ page }) => {
    // テストデータ作成
    const directory = await factories.directory.build({ name: 'e2e-empty-search' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    await factories.contract.build({
      title: 'Existing Contract',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await page.goto(`/directories/${directory.id}/contracts`)

    // 存在しない文字列で検索
    await page.getByPlaceholder('契約書名で検索...').fill('存在しない契約書')
    await page.getByRole('button', { name: '検索' }).click()

    await expect(page.getByText('該当する契約書が見つかりません')).toBeVisible()
    await expect(page.getByText('検索条件を変更してお試しください')).toBeVisible()
    await expect(page.getByText('（0件）')).toBeVisible()
  })

  test('存在しないディレクトリIDの場合は404エラーページが表示されること', async ({ page }) => {
    await page.goto('/directories/nonexistent-id/contracts')

    // エラーページやエラーメッセージが表示されることを確認
    // （実際のエラーハンドリングの実装に依存）
    await expect(page.locator('body')).toContainText('見つかりません')
  })

  test('大文字小文字を区別しない検索が動作すること', async ({ page }) => {
    const directory = await factories.directory.build({ name: 'e2e-case-insensitive' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    await factories.contract.build({
      title: 'NDA Contract',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await page.goto(`/directories/${directory.id}/contracts`)

    // 小文字で検索
    await page.getByPlaceholder('契約書名で検索...').fill('nda')
    await page.getByRole('button', { name: '検索' }).click()

    await expect(page.getByText('NDA Contract')).toBeVisible()
    await expect(page.getByText('（1件）')).toBeVisible()

    // 大文字で検索
    await page.getByPlaceholder('契約書名で検索...').fill('CONTRACT')
    await page.getByRole('button', { name: '検索' }).click()

    await expect(page.getByText('NDA Contract')).toBeVisible()
    await expect(page.getByText('（1件）')).toBeVisible()
  })

  test('URLから直接検索パラメータを指定してアクセスできること', async ({ page }) => {
    const directory = await factories.directory.build({ name: 'e2e-url-params' })
    const owner = await factories.user.build()
    const category = await factories.category.build()

    await factories.contract.build({
      title: 'URL Test Contract',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    await factories.contract.build({
      title: 'Other Contract',
      ownerId: owner.id,
      directoryId: directory.id,
      categoryId: category.id,
    })

    // URLパラメータ付きでアクセス
    await page.goto(`/directories/${directory.id}/contracts?search=URL&page=1`)

    // 検索フィールドに初期値が設定されている
    await expect(page.getByPlaceholder('契約書名で検索...')).toHaveValue('URL')

    // 検索結果が表示される
    await expect(page.getByText('URL Test Contract')).toBeVisible()
    await expect(page.getByText('Other Contract')).not.toBeVisible()
    await expect(page.getByText('（1件）')).toBeVisible()
  })
})