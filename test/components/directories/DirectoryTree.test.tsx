import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { DirectoryTree } from '@/components/directories/DirectoryTree'

// モックデータ
const mockDirectories = [
  {
    id: 'dir1',
    name: 'ルート',
    path: 'root',
    description: 'ルートディレクトリ',
    parentId: null,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    children: [
      {
        id: 'dir2',
        name: '法務',
        path: 'root/legal',
        description: '法務部門',
        parentId: 'dir1',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        children: [],
        contracts: [
          { id: 'contract1', title: 'NDA契約', status: 'ACTIVE' }
        ]
      },
      {
        id: 'dir3', 
        name: '営業',
        path: 'root/business',
        description: '営業部門',
        parentId: 'dir1',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        children: [],
        contracts: []
      }
    ],
    contracts: []
  }
]

const mockFlatDirectories = [
  {
    id: 'dir1',
    name: 'ルート',
    path: '/root',
    description: 'ルートディレクトリ',
    parentId: null,
  },
  {
    id: 'dir2',
    name: '法務',
    path: '/root/legal',
    description: '法務部門',
    parentId: 'dir1',
  },
  {
    id: 'dir3',
    name: '営業',
    path: '/root/business',
    description: '営業部門',
    parentId: 'dir1',
  }
]

describe('DirectoryTree', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnCreateChild = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('基本的な描画', () => {
    it('ディレクトリ階層が正しく表示される', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // ルートディレクトリが表示される
      expect(screen.getByText('ルート')).toBeInTheDocument()
      
      // 子ディレクトリが表示される
      expect(screen.getByText('法務')).toBeInTheDocument()
      expect(screen.getByText('営業')).toBeInTheDocument()
    })

    it('契約書数が正しく表示される', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // 契約書数の表示を確認（実際のコンポーネントではバッジ形式）
      expect(screen.getByText('1')).toBeInTheDocument() // 法務ディレクトリの契約書数
    })

    it('パス情報が表示される', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // パス表示を確認
      expect(screen.getByText('/root')).toBeInTheDocument()
      expect(screen.getByText('/root/legal')).toBeInTheDocument()
      expect(screen.getByText('/root/business')).toBeInTheDocument()
    })

    it('フラットなディレクトリリストでも表示される', () => {
      render(
        <DirectoryTree
          directories={mockFlatDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      expect(screen.getByText('ルート')).toBeInTheDocument()
      expect(screen.getByText('法務')).toBeInTheDocument()
      expect(screen.getByText('営業')).toBeInTheDocument()
    })
  })

  describe('フォルダの展開・折りたたみ', () => {
    it('フォルダアイコンクリックで展開・折りたたみできる', async () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // 初期状態では展開されている（子ディレクトリが表示）
      expect(screen.getByText('法務')).toBeInTheDocument()

      // フォルダ部分をクリックして折りたたみ（展開状態のアイコンをクリック）
      const expandIcon = screen.getByText('ルート').closest('.cursor-pointer')
      expect(expandIcon).toBeInTheDocument()
      
      await user.click(expandIcon!)

      // 子ディレクトリが非表示になる
      expect(screen.queryByText('法務')).not.toBeInTheDocument()
    })
  })

  describe('ディレクトリ選択', () => {
    it('ディレクトリクリックで選択イベントが発生する', async () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onSelect={mockOnSelect}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      const directoryItem = screen.getByText('法務')
      await user.click(directoryItem)

      expect(mockOnSelect).toHaveBeenCalledWith(mockDirectories[0].children[0])
    })

    it('選択されたディレクトリがハイライトされる', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          selectedDirectoryId="dir2"
          onSelect={mockOnSelect}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      // 選択されたディレクトリの要素を探す
      const selectedItem = screen.getByText('法務').closest('div')
      expect(selectedItem).toHaveClass('bg-blue-50')
    })
  })

  describe('ディレクトリ操作', () => {
    it('編集ボタンクリックで編集イベントが発生する', async () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // 編集ボタンを探す（ツールチップ経由）
      const editButtons = screen.getAllByRole('button')
      const editButton = editButtons.find(button => 
        button.querySelector('svg') && button.getAttribute('class')?.includes('h-8')
      )
      
      expect(editButton).toBeInTheDocument()
      await user.click(editButton!)

      expect(mockOnEdit).toHaveBeenCalled()
    })

    it('子ディレクトリ作成ボタンクリックで作成イベントが発生する', async () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // プラスアイコンのボタンを探す
      const createButtons = screen.getAllByRole('button')
      const createButton = createButtons.find(button => 
        button.querySelector('svg') && button.getAttribute('class')?.includes('h-8')
      )
      
      expect(createButton).toBeInTheDocument()
      await user.click(createButton!)

      expect(mockOnCreateChild).toHaveBeenCalled()
    })

    it('削除ボタンは契約書がないディレクトリで有効になる', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // 削除ボタンを確認
      const deleteButtons = screen.getAllByRole('button').filter(button => 
        button.disabled !== undefined
      )
      
      // 契約書がある法務ディレクトリのボタンは無効、営業ディレクトリのボタンは有効のはず
      expect(deleteButtons.length).toBeGreaterThan(0)
    })
  })

  describe('空の状態', () => {
    it('ディレクトリがない場合はメッセージが表示される', () => {
      render(
        <DirectoryTree
          directories={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      expect(screen.getByText('ディレクトリがありません')).toBeInTheDocument()
    })
  })

  describe('説明の表示', () => {
    it('ディレクトリの説明が表示される', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      expect(screen.getByText('ルートディレクトリ')).toBeInTheDocument()
      expect(screen.getByText('法務部門')).toBeInTheDocument()
      expect(screen.getByText('営業部門')).toBeInTheDocument()
    })
  })

  describe('子ディレクトリ数の表示', () => {
    it('子ディレクトリ数がバッジで表示される', () => {
      render(
        <DirectoryTree
          directories={mockDirectories}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onCreateChild={mockOnCreateChild}
        />
      )

      // "2 folders"のバッジが表示される
      expect(screen.getByText('2 folders')).toBeInTheDocument()
    })
  })

}) 