import { test, expect } from '@playwright/test'

test.describe('契約書管理機能', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン処理（実際の認証システムがある場合はそれに合わせて調整）
    await page.goto('/login')
    // 管理者ユーザーでログイン
    await page.fill('[data-testid="email"]', 'admin@example.com')
    await page.fill('[data-testid="password"]', 'password')
    await page.click('[data-testid="login-button"]')

    // ダッシュボードページに遷移することを確認
    await expect(page).toHaveURL('/dashboard')
  })

  test('契約書一覧の表示', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 契約書一覧が表示されることを確認
    await expect(page.locator('[data-testid="contracts-list"]')).toBeVisible()

    // サンプル契約書が表示されることを確認
    await expect(page.locator('text=業務委託契約書（サンプル）')).toBeVisible()
    await expect(page.locator('text=秘密保持契約書（NDA）')).toBeVisible()

    // 契約書のステータスが表示されることを確認
    await expect(page.locator('[data-testid="contract-status-ACTIVE"]')).toBeVisible()
    await expect(page.locator('[data-testid="contract-status-DRAFT"]')).toBeVisible()
  })

  test('契約書の詳細表示', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 最初の契約書をクリック
    await page.click('[data-testid="contract-item"]:first-child')

    // 契約書詳細ページに遷移することを確認
    await expect(page).toHaveURL(/\/contracts\/[a-zA-Z0-9]+/)

    // 契約書の基本情報が表示されることを確認
    await expect(page.locator('[data-testid="contract-title"]')).toBeVisible()
    await expect(page.locator('[data-testid="contract-content"]')).toBeVisible()
    await expect(page.locator('[data-testid="contract-status"]')).toBeVisible()

    // オーナー情報が表示されることを確認
    await expect(page.locator('[data-testid="contract-owner"]')).toBeVisible()

    // バージョン履歴が表示されることを確認
    await expect(page.locator('[data-testid="version-history"]')).toBeVisible()

    // 編集・削除ボタンがオーナーに表示されることを確認
    await expect(page.locator('[data-testid="edit-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="delete-button"]')).toBeVisible()
  })

  test('新しい契約書の作成', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 新規作成ボタンをクリック
    await page.click('[data-testid="create-contract-button"]')

    // 契約書作成ページに遷移することを確認
    await expect(page).toHaveURL('/contracts/new')

    // フォームフィールドに入力
    await page.fill('[data-testid="contract-title"]', 'テスト契約書')
    await page.fill('[data-testid="contract-number"]', 'TEST-E2E-001')

    // カテゴリを選択
    await page.click('[data-testid="category-select"]')
    await page.click('[data-testid="category-option-業務委託契約"]')

    // ディレクトリを選択
    await page.click('[data-testid="directory-select"]')
    await page.click('[data-testid="directory-option-business"]')

    // 契約期間を設定
    await page.fill('[data-testid="start-date"]', '2024-01-01')
    await page.fill('[data-testid="end-date"]', '2024-12-31')

    // Markdownエディターに内容を入力
    await page.fill(
      '[data-testid="contract-content"]',
      `# テスト契約書

## 第1条（目的）
本契約はテストを目的として作成されました。

## 第2条（内容）
- テスト項目1
- テスト項目2
- テスト項目3`
    )

    // 保存ボタンをクリック
    await page.click('[data-testid="save-button"]')

    // 契約書詳細ページに遷移することを確認
    await expect(page).toHaveURL(/\/contracts\/[a-zA-Z0-9]+/)

    // 成功メッセージが表示されることを確認
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()

    // 作成した契約書の内容が表示されることを確認
    await expect(page.locator('text=テスト契約書')).toBeVisible()
    await expect(page.locator('text=TEST-E2E-001')).toBeVisible()
  })

  test('契約書の編集', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 最初の契約書をクリック
    await page.click('[data-testid="contract-item"]:first-child')

    // 編集ボタンをクリック
    await page.click('[data-testid="edit-button"]')

    // 編集ページに遷移することを確認
    await expect(page).toHaveURL(/\/contracts\/[a-zA-Z0-9]+\/edit/)

    // タイトルを変更
    await page.fill('[data-testid="contract-title"]', '更新されたテスト契約書')

    // 内容を変更
    await page.fill(
      '[data-testid="contract-content"]',
      `# 更新されたテスト契約書

## 第1条（目的）
本契約は更新されました。

## 第2条（変更内容）
- 内容を更新しました
- 新しい項目を追加しました`
    )

    // 変更メモを入力
    await page.fill('[data-testid="change-note"]', '契約内容を更新しました')

    // 保存ボタンをクリック
    await page.click('[data-testid="save-button"]')

    // 契約書詳細ページに戻ることを確認
    await expect(page).toHaveURL(/\/contracts\/[a-zA-Z0-9]+$/)

    // 更新された内容が表示されることを確認
    await expect(page.locator('text=更新されたテスト契約書')).toBeVisible()

    // バージョン履歴に新しいバージョンが追加されることを確認
    await expect(page.locator('[data-testid="version-2"]')).toBeVisible()
    await expect(page.locator('text=契約内容を更新しました')).toBeVisible()
  })

  test('権限がないユーザーのアクセス制御', async ({ page }) => {
    // 一般ユーザーでログイン
    await page.goto('/login')
    await page.fill('[data-testid="email"]', 'manager@example.com')
    await page.fill('[data-testid="password"]', 'password')
    await page.click('[data-testid="login-button"]')

    // 法務部の契約書（アクセス権限なし）に直接アクセスを試行
    await page.goto('/contracts/legal-contract-id')

    // アクセス拒否メッセージが表示されることを確認
    await expect(page.locator('[data-testid="access-denied"]')).toBeVisible()
    await expect(page.locator('text=この契約書へのアクセス権限がありません')).toBeVisible()

    // 契約書一覧では自分がアクセス可能な契約書のみ表示されることを確認
    await page.goto('/contracts')

    // 営業部でアクセス可能な契約書のみ表示される
    await expect(page.locator('[data-testid="accessible-contracts"]')).toBeVisible()

    // 法務部専用の契約書は表示されない
    await expect(page.locator('text=秘密保持契約書（NDA）')).not.toBeVisible()
  })

  test('契約書の削除（オーナーのみ）', async ({ page }) => {
    // 管理者でログイン済み（beforeEachで実行）

    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // テスト用の契約書を作成（削除テスト用）
    await page.click('[data-testid="create-contract-button"]')
    await page.fill('[data-testid="contract-title"]', '削除テスト契約書')
    await page.fill('[data-testid="contract-number"]', 'DELETE-TEST-001')
    await page.click('[data-testid="category-select"]')
    await page.click('[data-testid="category-option-業務委託契約"]')
    await page.click('[data-testid="directory-select"]')
    await page.click('[data-testid="directory-option-business"]')
    await page.fill('[data-testid="contract-content"]', '# 削除テスト用契約書')
    await page.click('[data-testid="save-button"]')

    // 契約書詳細ページで削除ボタンをクリック
    await page.click('[data-testid="delete-button"]')

    // 削除確認ダイアログが表示されることを確認
    await expect(page.locator('[data-testid="delete-confirmation"]')).toBeVisible()

    // 削除を確認
    await page.click('[data-testid="confirm-delete-button"]')

    // 契約書一覧ページに戻ることを確認
    await expect(page).toHaveURL('/contracts')

    // 削除成功メッセージが表示されることを確認
    await expect(page.locator('[data-testid="delete-success-message"]')).toBeVisible()

    // 削除された契約書が一覧に表示されないことを確認
    await expect(page.locator('text=削除テスト契約書')).not.toBeVisible()
  })

  test('契約書検索機能', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 検索ボックスに検索語を入力
    await page.fill('[data-testid="search-input"]', '業務委託')

    // 検索ボタンをクリック
    await page.click('[data-testid="search-button"]')

    // 検索結果が表示されることを確認
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible()

    // マッチする契約書が表示されることを確認
    await expect(page.locator('text=業務委託契約書（サンプル）')).toBeVisible()

    // マッチしない契約書は表示されないことを確認
    await expect(page.locator('text=秘密保持契約書（NDA）')).not.toBeVisible()

    // 検索をクリア
    await page.click('[data-testid="clear-search-button"]')

    // 全ての契約書が再び表示されることを確認
    await expect(page.locator('text=業務委託契約書（サンプル）')).toBeVisible()
    await expect(page.locator('text=秘密保持契約書（NDA）')).toBeVisible()
  })

  test('契約書フィルタリング', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // ステータスフィルターを適用
    await page.click('[data-testid="status-filter"]')
    await page.click('[data-testid="status-option-ACTIVE"]')

    // アクティブな契約書のみ表示されることを確認
    await expect(page.locator('[data-testid="contract-status-ACTIVE"]')).toBeVisible()
    await expect(page.locator('[data-testid="contract-status-DRAFT"]')).not.toBeVisible()

    // カテゴリフィルターを適用
    await page.click('[data-testid="category-filter"]')
    await page.click('[data-testid="category-option-NDA"]')

    // NDAカテゴリの契約書のみ表示されることを確認
    await expect(page.locator('text=秘密保持契約書（NDA）')).toBeVisible()
    await expect(page.locator('text=業務委託契約書（サンプル）')).not.toBeVisible()

    // フィルターをクリア
    await page.click('[data-testid="clear-filters-button"]')

    // 全ての契約書が再び表示されることを確認
    await expect(page.locator('text=業務委託契約書（サンプル）')).toBeVisible()
    await expect(page.locator('text=秘密保持契約書（NDA）')).toBeVisible()
  })

  test('DocuSign電子契約機能', async ({ page }) => {
    // 契約書一覧ページに移動
    await page.goto('/contracts')

    // 最初の契約書をクリック
    await page.click('[data-testid="contract-item"]:first-child')

    // 契約書詳細ページに遷移することを確認
    await expect(page).toHaveURL(/\/contracts\/[a-zA-Z0-9]+/)

    // DocuSign電子契約セクションが表示されることを確認
    await expect(page.locator('text=電子契約（DocuSign）')).toBeVisible()

    // 電子契約開始ボタンが表示されることを確認（権限がある場合）
    const startButton = page.locator('text=電子契約を開始')
    if (await startButton.isVisible()) {
      // 電子契約開始ボタンをクリック
      await startButton.click()

      // モーダルが開くことを確認
      await expect(page.locator('[role="dialog"]')).toBeVisible()
      await expect(page.locator('text=電子契約の開始')).toBeVisible()

      // フォームフィールドが表示されることを確認
      await expect(page.locator('label:has-text("件名")')).toBeVisible()
      await expect(page.locator('label:has-text("メッセージ")')).toBeVisible()
      await expect(page.locator('label:has-text("署名者")')).toBeVisible()

      // 件名を入力
      await page.fill('input[placeholder="電子署名の件名を入力"]', '【テスト】電子署名のお願い')

      // メッセージを入力
      await page.fill('textarea[placeholder="署名者へのメッセージ（省略可）"]', 'テスト用の電子署名です。')

      // 署名者情報を入力
      const signerEmailInputs = page.locator('input[placeholder="メールアドレス"]')
      const signerNameInputs = page.locator('input[placeholder="名前"]')

      await signerEmailInputs.nth(0).fill('signer1@example.com')
      await signerNameInputs.nth(0).fill('署名者1')

      await signerEmailInputs.nth(1).fill('signer2@example.com')
      await signerNameInputs.nth(1).fill('署名者2')

      // 署名者を追加ボタンをテスト
      await page.click('text=署名者を追加')
      await expect(signerEmailInputs).toHaveCount(3)

      // 3人目の署名者を入力
      await signerEmailInputs.nth(2).fill('signer3@example.com')
      await signerNameInputs.nth(2).fill('署名者3')

      // 電子契約開始ボタンをクリック
      await page.click('text=電子契約を開始')

      // 成功メッセージまたは処理中状態を確認
      await expect(page.locator('text=開始中...')).toBeVisible().or(
        page.locator('text=電子契約が開始されました').toBeVisible()
      )

      // モーダルが閉じることを確認
      await expect(page.locator('[role="dialog"]')).not.toBeVisible()

      // DocuSignエンベロープが表示されることを確認（成功した場合）
      // Note: テスト環境ではモックなので、実際のエンベロープは作成されない可能性があります
    } else {
      // 権限がない場合は、電子契約開始ボタンが表示されないことを確認
      console.log('電子契約開始権限がないため、ボタンが表示されていません')
    }

    // DocuSignエンベロープセクションが存在することを確認
    await expect(page.locator('text=まだ電子契約は開始されていません')).toBeVisible().or(
      page.locator('[data-testid="docusign-envelope"]').toBeVisible()
    )
  })
})
