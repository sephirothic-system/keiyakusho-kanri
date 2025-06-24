import { test, expect } from '@playwright/test'

test.describe('ログイン機能 E2E テスト', () => {
  test.beforeEach(async ({ page }) => {
    // ログインページにアクセス
    await page.goto('/auth/signin')
  })

  test.describe('ログインページの表示', () => {
    test('ログインページが正しく表示される', async ({ page }) => {
      // タイトルを確認
      await expect(page.getByText('契約書管理システム')).toBeVisible()
      await expect(page.getByText('ログイン')).toBeVisible()
      await expect(page.getByText('契約書管理システムにログインしてください')).toBeVisible()

      // フォーム要素を確認
      await expect(page.getByLabel('メールアドレス')).toBeVisible()
      await expect(page.getByLabel('パスワード')).toBeVisible()
      await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible()

      // プレースホルダーを確認
      await expect(page.getByPlaceholder('your@email.com')).toBeVisible()
      await expect(page.getByPlaceholder('パスワードを入力')).toBeVisible()
    })

    test('フォームフィールドが正しいタイプで表示される', async ({ page }) => {
      const emailInput = page.getByLabel('メールアドレス')
      const passwordInput = page.getByLabel('パスワード')

      await expect(emailInput).toHaveAttribute('type', 'email')
      await expect(passwordInput).toHaveAttribute('type', 'password')
      await expect(emailInput).toHaveAttribute('required')
      await expect(passwordInput).toHaveAttribute('required')
    })
  })

  test.describe('ログイン成功ケース', () => {
    test('正しい認証情報でログインできる', async ({ page }) => {
      // テストユーザーの認証情報
      const email = 'test@example.com'
      const password = 'testpassword123'

      // フォームに入力
      await page.getByLabel('メールアドレス').fill(email)
      await page.getByLabel('パスワード').fill(password)

      // ログインボタンをクリック
      await page.getByRole('button', { name: 'ログイン' }).click()

      // ローディング状態を確認
      await expect(page.getByText('ログイン中...')).toBeVisible()

      // ログイン成功後、ホームページにリダイレクトされることを確認
      await expect(page).toHaveURL('/')

      // ログイン状態を確認（セッション情報があるか）
      // 注意: 実際のアプリケーションでは、ログイン後の表示要素を確認する
    })

    test('ローディング中はフォームが無効化される', async ({ page }) => {
      const email = 'test@example.com'
      const password = 'testpassword123'

      await page.getByLabel('メールアドレス').fill(email)
      await page.getByLabel('パスワード').fill(password)

      // ログインボタンをクリック
      await page.getByRole('button', { name: 'ログイン' }).click()

      // ローディング中はフォーム要素が無効化されることを確認
      await expect(page.getByLabel('メールアドレス')).toBeDisabled()
      await expect(page.getByLabel('パスワード')).toBeDisabled()
      await expect(page.getByRole('button', { name: 'ログイン中...' })).toBeDisabled()
    })
  })

  test.describe('ログイン失敗ケース', () => {
    test('存在しないメールアドレスでログインエラーが表示される', async ({ page }) => {
      const email = 'nonexistent@example.com'
      const password = 'anypassword'

      await page.getByLabel('メールアドレス').fill(email)
      await page.getByLabel('パスワード').fill(password)
      await page.getByRole('button', { name: 'ログイン' }).click()

      // エラーメッセージを確認
      await expect(
        page.getByText('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。')
      ).toBeVisible()

      // エラーアイコンが表示されることを確認
      await expect(page.locator('[role="alert"]')).toBeVisible()

      // フォームがリセットされないことを確認
      await expect(page.getByLabel('メールアドレス')).toHaveValue(email)
      await expect(page.getByLabel('パスワード')).toHaveValue(password)
    })

    test('間違ったパスワードでログインエラーが表示される', async ({ page }) => {
      const email = 'test@example.com'
      const password = 'wrongpassword'

      await page.getByLabel('メールアドレス').fill(email)
      await page.getByLabel('パスワード').fill(password)
      await page.getByRole('button', { name: 'ログイン' }).click()

      // エラーメッセージを確認
      await expect(
        page.getByText('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。')
      ).toBeVisible()
    })

    test('再送信時にエラーメッセージがクリアされる', async ({ page }) => {
      // 最初の失敗
      await page.getByLabel('メールアドレス').fill('test@example.com')
      await page.getByLabel('パスワード').fill('wrongpassword')
      await page.getByRole('button', { name: 'ログイン' }).click()

      await expect(
        page.getByText('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。')
      ).toBeVisible()

      // パスワードを修正して再送信
      await page.getByLabel('パスワード').fill('testpassword123')
      await page.getByRole('button', { name: 'ログイン' }).click()

      // エラーメッセージが消えることを確認
      await expect(
        page.getByText('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。')
      ).not.toBeVisible()
    })
  })

  test.describe('フォームバリデーション', () => {
    test('空のメールアドレスでは送信できない', async ({ page }) => {
      await page.getByLabel('パスワード').fill('password123')
      await page.getByRole('button', { name: 'ログイン' }).click()

      // HTML5バリデーションによりフォームが送信されないことを確認
      await expect(page.getByLabel('メールアドレス')).toBeFocused()

      // ページが移動しないことを確認
      await expect(page).toHaveURL('/auth/signin')
    })

    test('空のパスワードでは送信できない', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('test@example.com')
      await page.getByRole('button', { name: 'ログイン' }).click()

      // HTML5バリデーションによりフォームが送信されないことを確認
      await expect(page.getByLabel('パスワード')).toBeFocused()

      // ページが移動しないことを確認
      await expect(page).toHaveURL('/auth/signin')
    })

    test('無効なメールアドレス形式では送信できない', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('invalid-email')
      await page.getByLabel('パスワード').fill('password123')
      await page.getByRole('button', { name: 'ログイン' }).click()

      // HTML5バリデーションによりフォームが送信されないことを確認
      await expect(page.getByLabel('メールアドレス')).toBeFocused()

      // ページが移動しないことを確認
      await expect(page).toHaveURL('/auth/signin')
    })
  })

  test.describe('アクセシビリティ', () => {
    test('キーボードナビゲーションが正しく動作する', async ({ page }) => {
      // Tabキーでフォーカス移動
      await page.keyboard.press('Tab')
      await expect(page.getByLabel('メールアドレス')).toBeFocused()

      await page.keyboard.press('Tab')
      await expect(page.getByLabel('パスワード')).toBeFocused()

      await page.keyboard.press('Tab')
      await expect(page.getByRole('button', { name: 'ログイン' })).toBeFocused()
    })

    test('Enterキーでフォーム送信できる', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('test@example.com')
      await page.getByLabel('パスワード').fill('testpassword123')

      // Enterキーで送信
      await page.getByLabel('パスワード').press('Enter')

      // ローディング状態になることを確認
      await expect(page.getByText('ログイン中...')).toBeVisible()
    })

    test('エラーメッセージがスクリーンリーダーで読み上げ可能', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('wrong@example.com')
      await page.getByLabel('パスワード').fill('wrongpassword')
      await page.getByRole('button', { name: 'ログイン' }).click()

      // role="alert"がエラーメッセージに設定されていることを確認
      const errorAlert = page.locator('[role="alert"]')
      await expect(errorAlert).toBeVisible()
      await expect(errorAlert).toContainText('ログインに失敗しました')
    })
  })

  test.describe('レスポンシブデザイン', () => {
    test('モバイル画面でも正しく表示される', async ({ page }) => {
      // モバイル画面サイズに設定
      await page.setViewportSize({ width: 375, height: 667 })

      // フォームが正しく表示されることを確認
      await expect(page.getByText('契約書管理システム')).toBeVisible()
      await expect(page.getByLabel('メールアドレス')).toBeVisible()
      await expect(page.getByLabel('パスワード')).toBeVisible()
      await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible()

      // フォームが画面幅に収まることを確認
      const loginForm = page.locator('form').first()
      const boundingBox = await loginForm.boundingBox()
      expect(boundingBox?.width).toBeLessThanOrEqual(375)
    })

    test('タブレット画面でも正しく表示される', async ({ page }) => {
      // タブレット画面サイズに設定
      await page.setViewportSize({ width: 768, height: 1024 })

      // フォームが正しく表示されることを確認
      await expect(page.getByText('契約書管理システム')).toBeVisible()
      await expect(page.getByLabel('メールアドレス')).toBeVisible()
      await expect(page.getByLabel('パスワード')).toBeVisible()
      await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible()
    })
  })
})
