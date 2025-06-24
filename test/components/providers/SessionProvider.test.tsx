import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SessionProvider } from '@/components/providers/SessionProvider'

// Next-auth/react のモック
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-auth-session-provider">{children}</div>
  ),
}))

describe('SessionProvider', () => {
  it('子要素が正しくレンダリングされる', () => {
    render(
      <SessionProvider>
        <div data-testid="test-child">テスト子要素</div>
      </SessionProvider>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('テスト子要素')).toBeInTheDocument()
  })

  it('NextAuthSessionProviderでラップされている', () => {
    render(
      <SessionProvider>
        <div>テストコンテンツ</div>
      </SessionProvider>
    )

    expect(screen.getByTestId('next-auth-session-provider')).toBeInTheDocument()
  })

  it('複数の子要素を正しく処理する', () => {
    render(
      <SessionProvider>
        <div data-testid="child-1">子要素1</div>
        <div data-testid="child-2">子要素2</div>
        <span data-testid="child-3">子要素3</span>
      </SessionProvider>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })

  it('空の子要素でもエラーが発生しない', () => {
    expect(() => {
      render(<SessionProvider>{null}</SessionProvider>)
    }).not.toThrow()
  })
}) 