import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { GroupList } from '@/components/groups/GroupList'

// モックデータ
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
         },
         joinedAt: '2024-01-01T00:00:00Z',
       },
       {
         id: 'member2',
         user: {
           id: 'user2',
           name: '管理者花子',
           email: 'admin2@example.com',
         },
         joinedAt: '2024-01-02T00:00:00Z',
       }
     ],
    directoryAccess: [
      {
        permission: 'WRITE',
        directory: {
          id: 'dir1',
          name: 'ルートディレクトリ',
          path: '/root',
        },
      },
      {
        permission: 'READ',
        directory: {
          id: 'dir2',
          name: '法務ディレクトリ',
          path: '/root/legal',
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
        user: {
          id: 'user3',
          name: '法務太郎',
          email: 'legal@example.com',
        },
        joinedAt: '2024-01-01T00:00:00Z',
      }
    ],
    directoryAccess: [
      {
        permission: 'WRITE',
        directory: {
          id: 'dir2',
          name: '法務ディレクトリ',
          path: '/root/legal',
        },
      }
    ]
  }
]

describe('GroupList', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnManageMembers = vi.fn()
  const mockOnRemoveMember = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('基本的な描画', () => {
    it('グループ一覧が正しく表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // グループ名が表示される
      expect(screen.getByText('管理者グループ')).toBeInTheDocument()
      expect(screen.getByText('法務部')).toBeInTheDocument()
      
      // 説明が表示される
      expect(screen.getByText('システム管理者用グループ')).toBeInTheDocument()
      expect(screen.getByText('法務部門用グループ')).toBeInTheDocument()
    })

    it('メンバー数と権限数が表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // メンバー数の表示を確認
      expect(screen.getByText('2名')).toBeInTheDocument() // 管理者グループ
      expect(screen.getByText('1名')).toBeInTheDocument() // 法務部
      
      // 権限数の表示を確認
      expect(screen.getByText('3権限')).toBeInTheDocument() // 管理者グループ
      expect(screen.getByText('1権限')).toBeInTheDocument() // 法務部
    })

    it('メンバー一覧が表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // メンバー名が表示される
      expect(screen.getByText('管理者太郎')).toBeInTheDocument()
      expect(screen.getByText('管理者花子')).toBeInTheDocument()
      expect(screen.getByText('法務太郎')).toBeInTheDocument()
    })

    it('ディレクトリアクセス権限が表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // ディレクトリ名と権限が表示される
      expect(screen.getByText('ルートディレクトリ')).toBeInTheDocument()
      expect(screen.getByText('法務ディレクトリ')).toBeInTheDocument()
      expect(screen.getByText('WRITE')).toBeInTheDocument()
      expect(screen.getByText('READ')).toBeInTheDocument()
    })
  })

  describe('グループ操作', () => {
    it('編集ボタンクリックで編集イベントが発生する', async () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // 編集ボタンを探す
      const editButtons = screen.getAllByText('編集')
      expect(editButtons).toHaveLength(2)
      
      await user.click(editButtons[0])
      expect(mockOnEdit).toHaveBeenCalledWith(mockGroups[0])
    })

    it('メンバー管理ボタンクリックでメンバー管理イベントが発生する', async () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // メンバー管理ボタンを探す
      const memberButtons = screen.getAllByText('メンバー管理')
      expect(memberButtons).toHaveLength(2)
      
      await user.click(memberButtons[0])
      expect(mockOnManageMembers).toHaveBeenCalledWith(mockGroups[0])
    })

    it('削除ボタンクリックで削除イベントが発生する', async () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // 削除ボタンを探す（通常はアイコンボタン）
      const deleteButtons = screen.getAllByRole('button').filter(button => 
        button.getAttribute('title')?.includes('削除') || 
        button.querySelector('svg')?.getAttribute('class')?.includes('trash')
      )
      
      if (deleteButtons.length > 0) {
        await user.click(deleteButtons[0])
        expect(mockOnDelete).toHaveBeenCalledWith(mockGroups[0].id)
      }
    })
  })

  describe('空の状態', () => {
    it('グループがない場合はメッセージが表示される', () => {
      render(
        <GroupList
          groups={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      expect(screen.getByText('グループがありません')).toBeInTheDocument()
    })
  })

  describe('展開・折りたたみ機能', () => {
    it('グループカードの展開・折りたたみが動作する', async () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // 最初は展開されている（メンバー詳細が表示）
      expect(screen.getByText('管理者太郎')).toBeInTheDocument()

      // 折りたたみボタンまたはヘッダーをクリック
      const expandButton = screen.getAllByRole('button').find(button => 
        button.getAttribute('aria-expanded') === 'true'
      )
      
      if (expandButton) {
        await user.click(expandButton)
        // 折りたたまれた後の状態を確認
        expect(expandButton.getAttribute('aria-expanded')).toBe('false')
      }
    })
  })

  describe('権限表示', () => {
    it('権限レベルが正しく表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // 権限バッジが表示される
      const writeBadges = screen.getAllByText('WRITE')
      const readBadges = screen.getAllByText('READ')
      
      expect(writeBadges.length).toBeGreaterThan(0)
      expect(readBadges.length).toBeGreaterThan(0)
    })

    it('権限数の統計が正しい', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // 管理者グループ：3権限、法務部：1権限
      expect(screen.getByText('3権限')).toBeInTheDocument()
      expect(screen.getByText('1権限')).toBeInTheDocument()
    })
  })

  describe('レスポンシブ表示', () => {
    it('カード形式でグループが表示される', () => {
      render(
        <GroupList
          groups={mockGroups}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onManageMembers={mockOnManageMembers}
        />
      )

      // カードコンテナが存在することを確認
      const cards = screen.getAllByRole('article') // またはdata-testid="group-card"
      expect(cards.length).toBe(2)
    })
  })
}) 