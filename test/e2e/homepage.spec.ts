import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // ページが正常に読み込まれることを確認
    await expect(page).toHaveTitle(/Contract Management/)

    // 基本的なコンテンツが表示されることを確認
    await expect(page.locator('body')).toBeVisible()
  })

  test('should have proper navigation', async ({ page }) => {
    await page.goto('/')

    // ナビゲーションが存在することを確認（将来的に実装予定）
    // 現在はページが読み込まれることのみ確認
    await expect(page.locator('html')).toBeVisible()
  })
})
