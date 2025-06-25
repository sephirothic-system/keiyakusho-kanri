import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'
import DirectoryContractsPage from '@/app/directories/[id]/contracts/page'

// モック設定
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

// fetch APIのモック
const mockFetch = vi.fn()
global.fetch = mockFetch

// モックデータ
const mockDirectory = {
  id: 'dir-123',
  name: 'テストディレクトリ',
  path: '/test-directory',
  description: 'テスト用のディレクトリです',
}

const mockContracts = [
  {
    id: 'contract-1',
    title: 'NDA契約書',
    status: 'ACTIVE',
    contractNumber: 'NDA-001',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    owner: {
      id: 'user-1',
      name: '山田太郎',
      email: 'yamada@example.com',
    },
    category: {
      id: 'category-1',
      name: 'NDA',
      color: '#ff0000',
    },
  },
  {
    id: 'contract-2',
    title: '業務委託契約書',
    status: 'DRAFT',
    contractNumber: 'BIZ-001',
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    owner: {
      id: 'user-2',
      name: '佐藤花子',
      email: 'sato@example.com',
    },
    category: {
      id: 'category-2',
      name: '業務委託',
      color: '#00ff00',
    },
  },
]

const mockPagination = {
  page: 1,
  limit: 10,
  totalCount: 2,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
}

const mockApiResponse = {
  contracts: mockContracts,
  directory: mockDirectory,
  pagination: mockPagination,
  search: '',
}

describe('DirectoryContractsPage', () => {
  const mockPush = vi.fn()
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Router モック
    ;(useRouter as any).mockReturnValue({
      push: mockPush,
    })

    // SearchParams モック
    ;(useSearchParams as any).mockReturnValue({
      get: (key: string) => mockSearchParams.get(key),
    })

    // 成功レスポンスのデフォルト設定
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockApiResponse),
    })
  })

  afterEach(() => {
    mockSearchParams.forEach((_, key) => {
      mockSearchParams.delete(key)
    })
  })

  it('正常にレンダリングされること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    // ローディング表示の確認
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()

    // API呼び出し完了後のコンテンツ確認
    await waitFor(() => {
      expect(screen.getByText('テストディレクトリ')).toBeInTheDocument()
    })

    expect(screen.getByText('テスト用のディレクトリです')).toBeInTheDocument()
    expect(screen.getByText('契約書一覧')).toBeInTheDocument()
    expect(screen.getByText('（2件）')).toBeInTheDocument()
  })

  it('契約書一覧が正しく表示されること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('NDA契約書')).toBeInTheDocument()
    })

    // 1つ目の契約書
    expect(screen.getByText('NDA契約書')).toBeInTheDocument()
    expect(screen.getByText('アクティブ')).toBeInTheDocument()
    expect(screen.getByText('契約番号: NDA-001')).toBeInTheDocument()
    expect(screen.getByText('山田太郎')).toBeInTheDocument()

    // 2つ目の契約書
    expect(screen.getByText('業務委託契約書')).toBeInTheDocument()
    expect(screen.getByText('ドラフト')).toBeInTheDocument()
    expect(screen.getByText('契約番号: BIZ-001')).toBeInTheDocument()
    expect(screen.getByText('佐藤花子')).toBeInTheDocument()
  })

  it('検索機能が正常に動作すること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('契約書名で検索...')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('契約書名で検索...')
    const searchButton = screen.getByRole('button', { name: /検索/ })

    // 検索文字を入力
    fireEvent.change(searchInput, { target: { value: 'NDA' } })
    fireEvent.click(searchButton)

    // 検索APIが呼ばれることを確認
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/directories/dir-123/contracts?page=1&limit=10&search=NDA'
      )
    })
  })

  it('検索クリア機能が正常に動作すること', async () => {
    // 検索状態から開始
    mockSearchParams.set('search', 'NDA')
    
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('NDA')).toBeInTheDocument()
    })

    const clearButton = screen.getByRole('button', { name: /クリア/ })
    fireEvent.click(clearButton)

    // クリア後のAPI呼び出し確認
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/directories/dir-123/contracts?page=1&limit=10'
      )
    })
  })

  it('ページネーション機能が正常に動作すること', async () => {
    // 複数ページのモックデータ
    const multiPageResponse = {
      ...mockApiResponse,
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: false,
      },
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(multiPageResponse),
    })

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument()
    })

    const nextButton = screen.getByRole('button', { name: /次へ/ })
    fireEvent.click(nextButton)

    // ページ2への遷移確認
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/directories/dir-123/contracts?page=2&limit=10'
      )
    })
  })

  it('契約書クリックで詳細ページに遷移すること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('NDA契約書')).toBeInTheDocument()
    })

    const contractElement = screen.getByText('NDA契約書').closest('div')
    fireEvent.click(contractElement!)

    expect(mockPush).toHaveBeenCalledWith('/contracts/contract-1')
  })

  it('ディレクトリ一覧ボタンで前のページに戻れること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ディレクトリ一覧/ })).toBeInTheDocument()
    })

    const backButton = screen.getByRole('button', { name: /ディレクトリ一覧/ })
    fireEvent.click(backButton)

    expect(mockPush).toHaveBeenCalledWith('/directories')
  })

  it('APIエラー時にエラーメッセージが表示されること', async () => {
    const { toast } = require('sonner')
    
    mockFetch.mockRejectedValue(new Error('API Error'))

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('契約書の取得に失敗しました')
    })
  })

  it('404エラー時に適切なエラーメッセージが表示されること', async () => {
    const { toast } = require('sonner')
    
    mockFetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: 'ディレクトリが見つかりません' }),
    })

    render(<DirectoryContractsPage params={{ id: 'nonexistent' }} />)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('ディレクトリが見つかりません')
    })
  })

  it('契約書が存在しない場合に適切なメッセージが表示されること', async () => {
    const emptyResponse = {
      contracts: [],
      directory: mockDirectory,
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      search: '',
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(emptyResponse),
    })

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('契約書がありません')).toBeInTheDocument()
    })

    expect(screen.getByText('このディレクトリには契約書が登録されていません')).toBeInTheDocument()
  })

  it('検索結果が空の場合に適切なメッセージが表示されること', async () => {
    const emptySearchResponse = {
      contracts: [],
      directory: mockDirectory,
      pagination: {
        page: 1,
        limit: 10,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      search: 'nonexistent',
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(emptySearchResponse),
    })

    // 検索パラメータを設定
    mockSearchParams.set('search', 'nonexistent')

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('該当する契約書が見つかりません')).toBeInTheDocument()
    })

    expect(screen.getByText('検索条件を変更してお試しください')).toBeInTheDocument()
  })

  it('URLパラメータの検索条件が初期値として設定されること', async () => {
    mockSearchParams.set('search', 'initial-search')
    mockSearchParams.set('page', '2')

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('initial-search')).toBeInTheDocument()
    })

    // 初期API呼び出しで検索パラメータが使用されることを確認
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/directories/dir-123/contracts?page=2&limit=10&search=initial-search'
    )
  })

  it('契約書ステータスが正しく表示されること', async () => {
    const statusTestResponse = {
      contracts: [
        {
          ...mockContracts[0],
          status: 'REVIEW',
        },
        {
          ...mockContracts[1],
          status: 'EXPIRED',
        },
      ],
      directory: mockDirectory,
      pagination: mockPagination,
      search: '',
    }

    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(statusTestResponse),
    })

    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('レビュー中')).toBeInTheDocument()
    })

    expect(screen.getByText('期限切れ')).toBeInTheDocument()
  })

  it('カテゴリが正しく表示されること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      expect(screen.getByText('NDA')).toBeInTheDocument()
    })

    expect(screen.getByText('業務委託')).toBeInTheDocument()
  })

  it('日付フォーマットが正しく適用されること', async () => {
    render(<DirectoryContractsPage params={{ id: 'dir-123' }} />)

    await waitFor(() => {
      // 日本語フォーマットの日付が表示されることを確認
      expect(screen.getByText(/作成: 2024\/1\/1/)).toBeInTheDocument()
    })

    expect(screen.getByText(/開始: 2024\/1\/1/)).toBeInTheDocument()
    expect(screen.getByText(/終了: 2024\/12\/31/)).toBeInTheDocument()
  })
})