import { describe, it, expect } from 'vitest'

// ユーティリティ関数のテスト例
describe('Utils', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should format contract status correctly', () => {
    const formatStatus = (status: string) => {
      const statusMap = {
        DRAFT: '下書き',
        REVIEW: 'レビュー中',
        ACTIVE: '有効',
        EXPIRED: '期限切れ',
        TERMINATED: '終了',
      }
      return statusMap[status as keyof typeof statusMap] || status
    }

    expect(formatStatus('DRAFT')).toBe('下書き')
    expect(formatStatus('ACTIVE')).toBe('有効')
    expect(formatStatus('UNKNOWN')).toBe('UNKNOWN')
  })
})
