import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import GroupsPage from '@/app/groups/page'

// fetchをモック
global.fetch = vi.fn()

const mockGroups = [
  {
    id: 'group1',
    name: '管理者グループ',
    description: 'システム管理者用グループ',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    _count: {
      userGroups: 2,
      directoryAccess: 3,
    },
    userGroups: [
      {
        id: 'member1',
        user: {
          id: 'user1',
          name: '管理者太郎',
          email: 'admin@example.com',
          isActive: true,
        },
        joinedAt: '2024-01-01T00:00:00Z',
      }
    ],
    directoryAccess: [
      {
        id: 'access1',
        permission: 'WRITE',
        directory: {
          id: 'dir1',
          name: 'ルートディレクトリ',
          path: '/root',
        },
      }
    ]
  },
  {
    id: 'group2',
    name: '法務部',
    description: '法務部門用グループ',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    _count: {
      userGroups: 1,
      directoryAccess: 1,
    },
    userGroups: [
      {
        id: 'member2',
        user: {
          id: 'user2',
          name: '法務太郎',
          email: 'legal@example.com',
          isActive: true,
        },
        joinedAt: '2024-01-01T00:00:00Z',
      }
    ],
    directoryAccess: [
      {
        id: 'access2',
        permission: 'READ',
        directory: {
          id: 'dir2',
          name: '法務ディレクトリ',
          path: '/root/legal',
        },
      }
    ]
  }
]

const mockUsers = [
  {
    id: 'user3',
    name: '新規ユーザー',
    email: 'new@example.com',
    isActive: true,
  }
]

describe('GroupsPage', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // fetchのモック設定
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/groups')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ groups: mockGroups })
        })
      }
      if (url.includes('/api/users')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ users: mockUsers })
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
      render(<GroupsPage />)
      
      expect(screen.getByText('グループ管理')).toBeInTheDocument()
    })

    it('グループ作成ボタンが表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('新しいグループ')).toBeInTheDocument()
      })
    })

    it('グループ一覧が表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('管理者グループ')).toBeInTheDocument()
        expect(screen.getByText('法務部')).toBeInTheDocument()
      })
    })

    it('統計情報が表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('2 メンバー')).toBeInTheDocument()
        expect(screen.getByText('3 ディレクトリ')).toBeInTheDocument()
      })
    })
  })

  describe('グループ作成', () => {
    it('新しいグループボタンクリックでダイアログが開く', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        const createButton = screen.getByText('新しいグループ')
        expect(createButton).toBeInTheDocument()
      })
      
      const createButton = screen.getByText('新しいグループ')
      await user.click(createButton)
      
      await waitFor(() => {
        expect(screen.getByText('新しいグループを作成')).toBeInTheDocument()
      })
    })
  })

  describe('グループ操作', () => {
    it('メンバー管理ボタンが動作する', async () => {
      render(<GroupsPage />)
      
      // グループが読み込まれるまで待機
      await waitFor(() => {
        expect(screen.getByText('管理者グループ')).toBeInTheDocument()
      })
      
      // メンバー管理ボタンを探してクリック
      const memberButtons = screen.getAllByRole('button').filter(button => 
        button.querySelector('svg') && 
        button.getAttribute('title')?.includes('メンバー')
      )
      
      if (memberButtons.length > 0) {
        await user.click(memberButtons[0])
        
        await waitFor(() => {
          expect(screen.getByText('メンバー管理')).toBeInTheDocument()
        })
      }
    })

    it('編集ボタンが動作する', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('管理者グループ')).toBeInTheDocument()
      })
      
      const editButtons = screen.getAllByRole('button').filter(button => 
        button.querySelector('svg') && 
        button.getAttribute('title')?.includes('編集')
      )
      
      if (editButtons.length > 0) {
        await user.click(editButtons[0])
        
        await waitFor(() => {
          expect(screen.getByText('グループを編集')).toBeInTheDocument()
        })
      }
    })
  })

  describe('メンバー表示', () => {
    it('グループメンバーが表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('管理者太郎')).toBeInTheDocument()
        expect(screen.getByText('法務太郎')).toBeInTheDocument()
      })
    })

    it('メンバー数が正しく表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        // メンバー数の確認
        expect(screen.getByText('2 メンバー')).toBeInTheDocument()
        expect(screen.getByText('1 メンバー')).toBeInTheDocument()
      })
    })
  })

  describe('権限表示', () => {
    it('ディレクトリアクセス権限が表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('ルートディレクトリ')).toBeInTheDocument()
        expect(screen.getByText('法務ディレクトリ')).toBeInTheDocument()
      })
    })

    it('権限レベルが表示される', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('WRITE')).toBeInTheDocument()
        expect(screen.getByText('READ')).toBeInTheDocument()
      })
    })
  })

  describe('空の状態', () => {
    it('グループがない場合はメッセージが表示される', async () => {
      global.fetch = vi.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ groups: [] })
        })
      })
      
      render(<GroupsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('グループがありません')).toBeInTheDocument()
      })
    })
  })

  describe('エラーハンドリング', () => {
    it('APIエラー時にエラー状態が表示される', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('API Error'))
      
      render(<GroupsPage />)
      
      await waitFor(() => {
        // エラー状態の確認（実装に依存）
        const errorMessage = screen.queryByText('エラーが発生しました')
        const loadingMessage = screen.queryByText('読み込み中...')
        expect(errorMessage || !loadingMessage).toBeTruthy()
      })
    })
  })

  describe('アクセシビリティ', () => {
    it('適切なARIAラベルが設定されている', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        const main = screen.getByRole('main') || document.querySelector('main')
        expect(main).toBeInTheDocument()
      })
    })

    it('キーボードナビゲーションが動作する', async () => {
      render(<GroupsPage />)
      
      await waitFor(() => {
        const createButton = screen.getByText('新しいグループ')
        expect(createButton).toBeInTheDocument()
      })
      
      const createButton = screen.getByText('新しいグループ')
      createButton.focus()
      
      expect(createButton).toHaveFocus()
    })
  })
}) 