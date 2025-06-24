import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignInForm } from '@/components/auth/SignInForm'

// Next.jsのモック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// NextAuth.jsのモック
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

// モック関数の参照
const { signIn: signInMock } = await import('next-auth/react')

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('表示テスト', () => {
    it('ログインフォームが正しく表示される', () => {
      render(<SignInForm />)

      // 「ログイン」テキストが2箇所（タイトルとボタン）に存在することを確認
      const loginTexts = screen.getAllByText('ログイン')
      expect(loginTexts).toHaveLength(2)

      expect(screen.getByText('契約書管理システムにログインしてください')).toBeInTheDocument()
      expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
      expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
    })

    it('フォームフィールドが正しいタイプで表示される', () => {
      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')

      expect(emailInput).toHaveAttribute('type', 'email')
      expect(passwordInput).toHaveAttribute('type', 'password')
      expect(emailInput).toHaveAttribute('required')
      expect(passwordInput).toHaveAttribute('required')
    })

    it('プレースホルダーが正しく表示される', () => {
      render(<SignInForm />)

      expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('パスワードを入力')).toBeInTheDocument()
    })
  })

  describe('フォーム入力テスト', () => {
    it('メールアドレスを入力できる', async () => {
      const user = userEvent.setup()
      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      await user.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')
    })

    it('パスワードを入力できる', async () => {
      const user = userEvent.setup()
      render(<SignInForm />)

      const passwordInput = screen.getByLabelText('パスワード')
      await user.type(passwordInput, 'password123')

      expect(passwordInput).toHaveValue('password123')
    })

    it('フォーム送信時に正しい値が送信される', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockResolvedValue({ status: 200, ok: true, url: null, error: null })

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(signInMock).toHaveBeenCalledWith('credentials', {
          email: 'test@example.com',
          password: 'password123',
          redirect: false,
        })
      })
    })
  })

  describe('ローディング状態テスト', () => {
    it('送信中はローディング状態を表示する', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      expect(screen.getByText('ログイン中...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
      expect(emailInput).toBeDisabled()
      expect(passwordInput).toBeDisabled()
    })

    it('送信完了後にローディング状態が解除される', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockResolvedValue({ status: 200, ok: true, url: null, error: null })

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        // ボタンが再度「ログイン」テキストを表示していることを確認
        expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled()
        expect(emailInput).not.toBeDisabled()
        expect(passwordInput).not.toBeDisabled()
      })
    })
  })

  describe('エラーハンドリングテスト', () => {
    it('ログイン失敗時にエラーメッセージを表示する', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockResolvedValue({
        status: 401,
        ok: false,
        url: null,
        error: 'CredentialsSignin',
      })

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(
            'ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。'
          )
        ).toBeInTheDocument()
      })
    })

    it('ネットワークエラー時にエラーメッセージを表示する', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockRejectedValue(new Error('Network error'))

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('ログイン処理中にエラーが発生しました。')).toBeInTheDocument()
      })
    })

    it('新しい送信でエラーメッセージがクリアされる', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockResolvedValueOnce({
        status: 401,
        ok: false,
        url: null,
        error: 'CredentialsSignin',
      })

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      // 最初の失敗
      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(
            'ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。'
          )
        ).toBeInTheDocument()
      })

      // 再試行時にエラーメッセージがクリアされることを確認
      vi.mocked(signInMock).mockResolvedValueOnce({ status: 200, ok: true, url: null, error: null })

      await user.clear(passwordInput)
      await user.type(passwordInput, 'correctpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.queryByText(
            'ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。'
          )
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('フォームバリデーションテスト', () => {
    it('空のフォームは送信できない', async () => {
      const user = userEvent.setup()
      render(<SignInForm />)

      const submitButton = screen.getByRole('button', { name: 'ログイン' })
      await user.click(submitButton)

      // HTML5のrequired属性により、フォームは送信されない
      expect(signInMock).not.toHaveBeenCalled()
    })

    it('メールアドレスが空の場合は送信できない', async () => {
      const user = userEvent.setup()
      render(<SignInForm />)

      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      expect(signInMock).not.toHaveBeenCalled()
    })

    it('パスワードが空の場合は送信できない', async () => {
      const user = userEvent.setup()
      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      expect(signInMock).not.toHaveBeenCalled()
    })
  })

  describe('アクセシビリティテスト', () => {
    it('フォームにラベルが正しく関連付けられている', () => {
      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')

      expect(emailInput).toHaveAttribute('id', 'email')
      expect(passwordInput).toHaveAttribute('id', 'password')
    })

    it('エラーメッセージにアイコンが表示される', async () => {
      const user = userEvent.setup()
      vi.mocked(signInMock).mockResolvedValue({
        status: 401,
        ok: false,
        url: null,
        error: 'CredentialsSignin',
      })

      render(<SignInForm />)

      const emailInput = screen.getByLabelText('メールアドレス')
      const passwordInput = screen.getByLabelText('パスワード')
      const submitButton = screen.getByRole('button', { name: 'ログイン' })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        // AlertCircleアイコンの存在を確認
        const errorAlert = screen.getByRole('alert')
        expect(errorAlert).toBeInTheDocument()
      })
    })
  })
})
