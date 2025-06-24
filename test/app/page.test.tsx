import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/app/page'

// Next-auth/react のモック
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}))

// Next/navigation のモック
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const { useSession, signOut } = await import('next-auth/react')

// テストデータ
const mockSession = {
  user: {
    id: '1',
    name: 'テストユーザー',
    email: 'test@example.com',
  },
  expires: new Date(Date.now() + 2 * 86400 * 1000).toISOString(), // 2日後
}

describe('Home (Dashboard)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSession).mockClear()
    vi.mocked(signOut).mockClear()
  })

  describe('認証状態のテスト', () => {
    it('ローディング中の表示が正しく動作する', () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: 'loading',
        update: vi.fn(),
      })

      render(<Home />)

      expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    })

    it('認証済みユーザーのダッシュボードが表示される', () => {
      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })

      render(<Home />)

      // ヘッダーの確認
      expect(screen.getByText('契約書管理システム')).toBeInTheDocument()
      expect(screen.getByText('ようこそ、テストユーザーさん')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ログアウト' })).toBeInTheDocument()
    })

    it('ユーザー名がない場合はメールアドレスを表示する', () => {
      const sessionWithoutName = {
        user: {
          id: '1',
          email: 'test@example.com',
        },
        expires: new Date(Date.now() + 2 * 86400 * 1000).toISOString(), // 2日後
      }

      vi.mocked(useSession).mockReturnValue({
        data: sessionWithoutName,
        status: 'authenticated',
        update: vi.fn(),
      })

      render(<Home />)

      expect(screen.getByText('ようこそ、test@example.comさん')).toBeInTheDocument()
    })
  })

  describe('ダッシュボードコンテンツのテスト', () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })
    })

    it('統計カードが正しく表示される', () => {
      render(<Home />)

      // 各統計カードの確認
      expect(screen.getByText('総契約書数')).toBeInTheDocument()
      expect(screen.getByText('アクティブ契約')).toBeInTheDocument()
      expect(screen.getByText('ディレクトリ数')).toBeInTheDocument()
      expect(screen.getByText('参加グループ')).toBeInTheDocument()

      // 統計値の確認（初期値は0）
      const zeroValues = screen.getAllByText('0')
      expect(zeroValues.length).toBeGreaterThanOrEqual(4)
    })

    it('クイックアクションが表示される', () => {
      render(<Home />)

      expect(screen.getByText('クイックアクション')).toBeInTheDocument()
      expect(screen.getByText('新しい契約書を作成')).toBeInTheDocument()
      expect(screen.getByText('ディレクトリを管理')).toBeInTheDocument()
      expect(screen.getByText('グループを管理')).toBeInTheDocument()
    })

    it('最近の活動セクションが表示される', () => {
      render(<Home />)

      expect(screen.getByText('最近の活動')).toBeInTheDocument()
      expect(screen.getByText('アクティビティがありません')).toBeInTheDocument()
      expect(
        screen.getByText('契約書を作成すると、ここに最近の活動が表示されます。')
      ).toBeInTheDocument()
    })
  })

  describe('ユーザーインタラクションのテスト', () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })
      mockPush.mockClear()
    })

    it('ログアウトボタンをクリックするとsignOutが呼ばれる', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const logoutButton = screen.getByRole('button', { name: 'ログアウト' })
      await user.click(logoutButton)

      expect(vi.mocked(signOut)).toHaveBeenCalledTimes(1)
    })

    it('「新しい契約書を作成」カードをクリックすると契約書作成画面に遷移する', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const createContractCard = screen.getByText('新しい契約書を作成').closest('[class*="cursor-pointer"]')
      expect(createContractCard).toBeInTheDocument()

      await user.click(createContractCard!)

      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith('/contracts/new')
    })

    it('クイックアクションカードがクリック可能に設定されている', () => {
      render(<Home />)

      // クイックアクションのテキストが存在することを確認
      expect(screen.getByText('新しい契約書を作成')).toBeInTheDocument()
      expect(screen.getByText('ディレクトリを管理')).toBeInTheDocument()
      expect(screen.getByText('グループを管理')).toBeInTheDocument()

      // cursor-pointerクラスを持つ要素が存在することを確認
      const clickableCards = document.querySelectorAll('.cursor-pointer')
      expect(clickableCards.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('アクセシビリティテスト', () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })
    })

    it('適切な見出し構造が使用されている', () => {
      render(<Home />)

      // h1タグの確認
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('契約書管理システム')

      // h2タグの確認
      expect(screen.getByRole('heading', { level: 2, name: 'クイックアクション' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: '最近の活動' })).toBeInTheDocument()
    })

    it('適切なランドマークが設定されている', () => {
      render(<Home />)

      expect(screen.getByRole('banner')).toBeInTheDocument() // header
      expect(screen.getByRole('main')).toBeInTheDocument() // main
    })
  })

  describe('レスポンシブデザインのテスト', () => {
    beforeEach(() => {
      vi.mocked(useSession).mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: vi.fn(),
      })
    })

    it('レスポンシブグリッドレイアウトが設定されている', () => {
      render(<Home />)

      // 統計カードとクイックアクションのコンテンツが表示されていることを確認
      expect(screen.getByText('総契約書数')).toBeInTheDocument()
      expect(screen.getByText('新しい契約書を作成')).toBeInTheDocument()

      // gridクラスが適用された要素が存在することを確認
      const gridElements = document.querySelectorAll('[class*="grid"]')
      expect(gridElements.length).toBeGreaterThan(0)

      // レスポンシブクラスが適用された要素が存在することを確認
      const responsiveElements = document.querySelectorAll('[class*="sm:grid-cols"], [class*="lg:grid-cols"]')
      expect(responsiveElements.length).toBeGreaterThan(0)
    })
  })
}) 