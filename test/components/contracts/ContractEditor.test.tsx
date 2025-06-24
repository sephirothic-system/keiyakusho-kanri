import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { ContractEditor, ContractData } from '@/components/contracts/ContractEditor'

// モックデータ
const mockDirectories = [
  { id: 'dir1', name: 'Legal', path: '/legal' },
  { id: 'dir2', name: 'HR', path: '/hr' },
]

const mockCategories = [
  { id: 'cat1', name: 'NDA', color: '#3B82F6' },
  { id: 'cat2', name: 'Employment', color: '#10B981' },
]

const mockContract: ContractData = {
  id: 'contract1',
  title: 'テスト契約書',
  content: '# テスト契約書\n\nこれはテスト用の契約書です。',
  status: 'DRAFT',
  contractNumber: 'TEST-001',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  directoryId: 'dir1',
  categoryId: 'cat1',
  owner: { name: 'テストユーザー', email: 'test@example.com' },
  directory: { name: 'Legal', path: '/legal' },
  category: { name: 'NDA', color: '#3B82F6' },
}

// next/dynamicを完全にモック
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    // MDEditorの代替コンポーネント
    return function MockMDEditor({ value, onChange, textareaProps }: any) {
      return (
        <div data-testid="md-editor">
          <textarea
            data-testid="content-textarea"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={textareaProps?.placeholder}
          />
        </div>
      )
    }
  },
}))

// sonnerをモック
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('ContractEditor', () => {
  const mockOnSave = vi.fn()
  const mockOnCancel = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('基本的な描画', () => {
    it('新規作成モードで基本要素が表示される', () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      // 基本的な要素が存在することを確認
      expect(screen.getByText('新しい契約書を作成')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('契約書のタイトルを入力')).toBeInTheDocument()
      expect(screen.getByTestId('md-editor')).toBeInTheDocument()
    })

    it('編集モードで基本要素が表示される', () => {
      render(
        <ContractEditor
          contract={mockContract}
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      expect(screen.getByText('契約書を編集')).toBeInTheDocument()
      expect(screen.getByDisplayValue('テスト契約書')).toBeInTheDocument()
    })
  })

  describe('フォーム操作', () => {
    it('タイトル入力が動作する', async () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByPlaceholderText('契約書のタイトルを入力')
      await user.type(titleInput, 'テスト契約書')
      expect(titleInput).toHaveValue('テスト契約書')
    })

    it('コンテンツ入力が動作する', async () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      const contentTextarea = screen.getByTestId('content-textarea')
      await user.clear(contentTextarea)
      await user.type(contentTextarea, 'テストコンテンツ')
      expect(contentTextarea).toHaveValue('テストコンテンツ')
    })
  })

  describe('ボタン操作', () => {
    it('キャンセルボタンが動作する', async () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      const cancelButton = screen.getByText('キャンセル')
      await user.click(cancelButton)
      expect(mockOnCancel).toHaveBeenCalled()
    })

    it('ローディング状態でボタンが無効化される', () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
          isLoading={true}
        />
      )

      // ローディング中のテキストが表示されることを確認
      expect(screen.getByText('保存中...')).toBeInTheDocument()
      
      // 実際のボタン要素を取得して無効化を確認
      const button = screen.getByRole('button', { name: /保存中/ })
      expect(button).toBeDisabled()
    })
  })

  describe('バリデーション', () => {
    it('必須フィールドのバリデーションが動作する', async () => {
      render(
        <ContractEditor
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      const saveButton = screen.getByText('保存')
      await user.click(saveButton)

      expect(screen.getByText('タイトルは必須です')).toBeInTheDocument()
      expect(screen.getByText('ディレクトリは必須です')).toBeInTheDocument()
      expect(mockOnSave).not.toHaveBeenCalled()
    })
  })

  describe('編集モード', () => {
    it('既存データが正しく表示される', () => {
      render(
        <ContractEditor
          contract={mockContract}
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      expect(screen.getByDisplayValue('テスト契約書')).toBeInTheDocument()
      expect(screen.getByDisplayValue('TEST-001')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2024-01-01')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2024-12-31')).toBeInTheDocument()
    })

    it('データ更新が動作する', async () => {
      mockOnSave.mockResolvedValueOnce(undefined)

      render(
        <ContractEditor
          contract={mockContract}
          directories={mockDirectories}
          categories={mockCategories}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByDisplayValue('テスト契約書')
      await user.clear(titleInput)
      await user.type(titleInput, '更新されたテスト契約書')

      const saveButton = screen.getByText('保存')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalled()
      })
    })
  })
}) 