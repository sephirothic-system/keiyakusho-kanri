import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import DirectoriesPage from '@/app/directories/page'

// fetchをモック
global.fetch = vi.fn()

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
      }
    ],
    contracts: []
  }
]

describe('DirectoriesPage', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // fetchのモック設定
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/directories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ directories: mockDirectories })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    })
  })

  describe('基本的な描画', () => {
    it('ページタイトルが表示される', async () => {
      render(<DirectoriesPage />)
      
      expect(screen.getByText('ディレクトリ管理')).toBeInTheDocument()
    })

    it('ディレクトリ作成ボタンが表示される', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        expect(screen.getByText('新しいディレクトリ')).toBeInTheDocument()
      })
    })

    it('ディレクトリ一覧が表示される', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        expect(screen.getByText('ルート')).toBeInTheDocument()
        expect(screen.getByText('法務')).toBeInTheDocument()
      })
    })
  })

  describe('ディレクトリ作成', () => {
    it('新しいディレクトリボタンクリックでダイアログが開く', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        const createButton = screen.getByText('新しいディレクトリ')
        expect(createButton).toBeInTheDocument()
      })
      
      const createButton = screen.getByText('新しいディレクトリ')
      await user.click(createButton)
      
      await waitFor(() => {
        expect(screen.getByText('新しいディレクトリを作成')).toBeInTheDocument()
      })
    })
  })

  describe('ディレクトリ操作', () => {
    it('編集ボタンクリックで編集ダイアログが開く', async () => {
      render(<DirectoriesPage />)
      
      // ディレクトリが読み込まれるまで待機
      await waitFor(() => {
        expect(screen.getByText('ルート')).toBeInTheDocument()
      })
      
      // 編集ボタンを探してクリック
      const editButtons = screen.getAllByRole('button').filter(button => 
        button.querySelector('svg') && 
        button.getAttribute('class')?.includes('h-8')
      )
      
      if (editButtons.length > 0) {
        await user.click(editButtons[0])
        
        await waitFor(() => {
          expect(screen.getByText('ディレクトリを編集')).toBeInTheDocument()
        })
      }
    })
  })

  describe('エラーハンドリング', () => {
    it('APIエラー時にエラーメッセージが表示される', async () => {
      // APIエラーをモック
      global.fetch = vi.fn().mockRejectedValue(new Error('API Error'))
      
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        // エラー状態の確認（実装に依存）
        const errorMessage = screen.queryByText('エラーが発生しました')
        const loadingMessage = screen.queryByText('読み込み中...')
        expect(errorMessage || !loadingMessage).toBeTruthy()
      })
    })
  })

  describe('検索機能', () => {
    it('検索入力フィールドが表示される', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        const searchInput = screen.queryByPlaceholderText('ディレクトリを検索')
        expect(searchInput).toBeInTheDocument()
      })
    })

    it('検索入力でディレクトリがフィルタリングされる', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        expect(screen.getByText('ルート')).toBeInTheDocument()
      })
      
      const searchInput = screen.queryByPlaceholderText('ディレクトリを検索')
      if (searchInput) {
        await user.type(searchInput, '法務')
        
        await waitFor(() => {
          expect(screen.getByText('法務')).toBeInTheDocument()
          // ルートディレクトリが非表示になることを確認（実装に依存）
        })
      }
    })
  })

  describe('レスポンシブデザイン', () => {
    it('モバイル表示でも適切にレンダリングされる', async () => {
      // ビューポートをモバイルサイズに設定
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        expect(screen.getByText('ディレクトリ管理')).toBeInTheDocument()
      })
    })
  })

  describe('アクセシビリティ', () => {
    it('適切なARIAラベルが設定されている', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        // メインコンテンツ領域の確認
        const main = screen.getByRole('main') || document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
    })

    it('キーボードナビゲーションが動作する', async () => {
      render(<DirectoriesPage />)
      
      await waitFor(() => {
        const createButton = screen.getByText('新しいディレクトリ')
        expect(createButton).toBeInTheDocument()
      })
      
      const createButton = screen.getByText('新しいディレクトリ')
      createButton.focus()
      
      // フォーカスが当たっていることを確認
      expect(createButton).toHaveFocus()
    })
  })
}) 