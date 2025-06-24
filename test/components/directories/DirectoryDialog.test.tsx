import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { DirectoryDialog } from '@/components/directories/DirectoryDialog'

// モックデータ
const mockAvailableParents = [
  {
    id: 'dir1',
    name: 'ルート',
    path: 'root',
    description: 'ルートディレクトリ',
    parentId: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'dir2',
    name: '法務',
    path: 'root/legal',
    description: '法務部門',
    parentId: 'dir1',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
]

const mockDirectory = {
  id: 'dir1',
  name: 'テストディレクトリ',
  path: 'test',
  description: 'テスト用ディレクトリ',
  parentId: null,
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('DirectoryDialog', () => {
  const mockOnSubmit = vi.fn()
  const mockOnOpenChange = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('新規作成モード', () => {
    it('新規作成フォームが正しく表示される', () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      expect(screen.getByText('新しいディレクトリを作成')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('ディレクトリ名を入力してください')).toBeInTheDocument()
      expect(screen.getByText('作成')).toBeInTheDocument()
      expect(screen.getByText('キャンセル')).toBeInTheDocument()
    })

    it('有効なデータで作成ができる', async () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      const nameInput = screen.getByPlaceholderText('ディレクトリ名を入力してください')
      const saveButton = screen.getByText('作成')

      await user.type(nameInput, '新しいディレクトリ')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: '新しいディレクトリ',
          description: undefined,
          parentId: undefined,
        })
      })
    })
  })

  describe('編集モード', () => {
    it('編集フォームが正しく表示される', () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          directory={mockDirectory}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      expect(screen.getByText('ディレクトリを編集')).toBeInTheDocument()
      expect(screen.getByDisplayValue('テストディレクトリ')).toBeInTheDocument()
      expect(screen.getByDisplayValue('テスト用ディレクトリ')).toBeInTheDocument()
      expect(screen.getByText('更新')).toBeInTheDocument()
    })
  })

  describe('バリデーション', () => {
    it('名前が空の場合はエラーが表示される', async () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      const saveButton = screen.getByText('作成')
      await user.click(saveButton)

      expect(screen.getByText('ディレクトリ名は必須です')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('ダイアログの操作', () => {
    it('キャンセルボタンでダイアログが閉じる', async () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      const cancelButton = screen.getByText('キャンセル')
      await user.click(cancelButton)

      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
    })

    it('閉じられた状態では表示されない', () => {
      render(
        <DirectoryDialog
          open={false}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      expect(screen.queryByText('新しいディレクトリを作成')).not.toBeInTheDocument()
    })
  })

  describe('パスプレビュー', () => {
    it('入力されたディレクトリ名でパスが更新される', async () => {
      render(
        <DirectoryDialog
          open={true}
          onOpenChange={mockOnOpenChange}
          availableParents={mockAvailableParents}
          onSubmit={mockOnSubmit}
        />
      )

      const nameInput = screen.getByPlaceholderText('ディレクトリ名を入力してください')
      await user.type(nameInput, 'new-directory')

      expect(screen.getByText('/new-directory')).toBeInTheDocument()
    })
  })
}) 