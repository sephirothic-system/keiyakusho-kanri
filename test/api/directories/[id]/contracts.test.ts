import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { GET } from '@/app/api/directories/[id]/contracts/route'
import { factories, scenarios, TestDataCleaner } from '@/test/factories/all'
import { NextRequest } from 'next/server'

describe('/api/directories/[id]/contracts', () => {
  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test')
  })

  describe('GET', () => {
    it('ディレクトリ内の契約書一覧を正常に取得できること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-dir-contracts' })
      const owner = await factories.user.build()
      const category = await factories.category.build()
      
      // 複数の契約書を作成（新しい順でソートされることを確認するため）
      const contract1 = await factories.contract.build({
        title: 'test-contract-1',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        createdAt: new Date('2024-01-01'),
      })
      
      const contract2 = await factories.contract.build({
        title: 'test-contract-2',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        createdAt: new Date('2024-01-02'),
      })

      const contract3 = await factories.contract.build({
        title: 'test-contract-3',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
        createdAt: new Date('2024-01-03'),
      })

      // リクエスト作成
      const request = new NextRequest('http://localhost/api/directories/test/contracts')
      const params = { id: directory.id }

      // API実行
      const response = await GET(request, { params })
      const data = await response.json()

      // レスポンス確認
      expect(response.status).toBe(200)
      expect(data.contracts).toHaveLength(3)
      expect(data.directory.id).toBe(directory.id)
      expect(data.directory.name).toBe('test-dir-contracts')

      // 新しい順（createdAt desc）でソートされていることを確認
      expect(data.contracts[0].title).toBe('test-contract-3')
      expect(data.contracts[1].title).toBe('test-contract-2')
      expect(data.contracts[2].title).toBe('test-contract-1')

      // ページネーション情報確認
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        totalCount: 3,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      })
    })

    it('ページネーションが正常に動作すること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-pagination' })
      const owner = await factories.user.build()
      const category = await factories.category.build()

      // 15件の契約書を作成
      const contracts = []
      for (let i = 1; i <= 15; i++) {
        const contract = await factories.contract.build({
          title: `test-contract-${i.toString().padStart(2, '0')}`,
          ownerId: owner.id,
          directoryId: directory.id,
          categoryId: category.id,
          createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`),
        })
        contracts.push(contract)
      }

      // 1ページ目のリクエスト（limit=5）
      const request1 = new NextRequest('http://localhost/api/directories/test/contracts?page=1&limit=5')
      const response1 = await GET(request1, { params: { id: directory.id } })
      const data1 = await response1.json()

      expect(response1.status).toBe(200)
      expect(data1.contracts).toHaveLength(5)
      expect(data1.pagination).toEqual({
        page: 1,
        limit: 5,
        totalCount: 15,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: false,
      })

      // 新しい順になっていることを確認（15, 14, 13, 12, 11）
      expect(data1.contracts[0].title).toBe('test-contract-15')
      expect(data1.contracts[4].title).toBe('test-contract-11')

      // 2ページ目のリクエスト
      const request2 = new NextRequest('http://localhost/api/directories/test/contracts?page=2&limit=5')
      const response2 = await GET(request2, { params: { id: directory.id } })
      const data2 = await response2.json()

      expect(response2.status).toBe(200)
      expect(data2.contracts).toHaveLength(5)
      expect(data2.pagination).toEqual({
        page: 2,
        limit: 5,
        totalCount: 15,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: true,
      })

      // 3ページ目のリクエスト
      const request3 = new NextRequest('http://localhost/api/directories/test/contracts?page=3&limit=5')
      const response3 = await GET(request3, { params: { id: directory.id } })
      const data3 = await response3.json()

      expect(response3.status).toBe(200)
      expect(data3.contracts).toHaveLength(5)
      expect(data3.pagination).toEqual({
        page: 3,
        limit: 5,
        totalCount: 15,
        totalPages: 3,
        hasNextPage: false,
        hasPreviousPage: true,
      })
    })

    it('契約書名での部分一致検索が正常に動作すること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-search' })
      const owner = await factories.user.build()
      const category = await factories.category.build()

      // 異なる名前の契約書を作成
      const contract1 = await factories.contract.build({
        title: 'NDA契約書',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const contract2 = await factories.contract.build({
        title: '業務委託契約書',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const contract3 = await factories.contract.build({
        title: '雇用契約書',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // 「契約書」で検索
      const request1 = new NextRequest('http://localhost/api/directories/test/contracts?search=契約書')
      const response1 = await GET(request1, { params: { id: directory.id } })
      const data1 = await response1.json()

      expect(response1.status).toBe(200)
      expect(data1.contracts).toHaveLength(3)
      expect(data1.search).toBe('契約書')

      // 「NDA」で検索
      const request2 = new NextRequest('http://localhost/api/directories/test/contracts?search=NDA')
      const response2 = await GET(request2, { params: { id: directory.id } })
      const data2 = await response2.json()

      expect(response2.status).toBe(200)
      expect(data2.contracts).toHaveLength(1)
      expect(data2.contracts[0].title).toBe('NDA契約書')
      expect(data2.search).toBe('NDA')

      // 「業務」で検索
      const request3 = new NextRequest('http://localhost/api/directories/test/contracts?search=業務')
      const response3 = await GET(request3, { params: { id: directory.id } })
      const data3 = await response3.json()

      expect(response3.status).toBe(200)
      expect(data3.contracts).toHaveLength(1)
      expect(data3.contracts[0].title).toBe('業務委託契約書')

      // 存在しない文字列で検索
      const request4 = new NextRequest('http://localhost/api/directories/test/contracts?search=存在しない')
      const response4 = await GET(request4, { params: { id: directory.id } })
      const data4 = await response4.json()

      expect(response4.status).toBe(200)
      expect(data4.contracts).toHaveLength(0)
    })

    it('検索とページネーションの組み合わせが正常に動作すること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build({ name: 'test-search-pagination' })
      const owner = await factories.user.build()
      const category = await factories.category.build()

      // 「テスト」を含む契約書を8件作成
      for (let i = 1; i <= 8; i++) {
        await factories.contract.build({
          title: `テスト契約書${i}`,
          ownerId: owner.id,
          directoryId: directory.id,
          categoryId: category.id,
          createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`),
        })
      }

      // 「テスト」を含まない契約書を2件作成
      await factories.contract.build({
        title: 'NDA契約書',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      await factories.contract.build({
        title: '雇用契約書',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // 「テスト」で検索、1ページ目（limit=3）
      const request1 = new NextRequest('http://localhost/api/directories/test/contracts?search=テスト&page=1&limit=3')
      const response1 = await GET(request1, { params: { id: directory.id } })
      const data1 = await response1.json()

      expect(response1.status).toBe(200)
      expect(data1.contracts).toHaveLength(3)
      expect(data1.pagination.totalCount).toBe(8) // 「テスト」を含む契約書は8件
      expect(data1.pagination.totalPages).toBe(3) // 8件を3件ずつで3ページ

      // 新しい順になっていることを確認
      expect(data1.contracts[0].title).toBe('テスト契約書8')
      expect(data1.contracts[1].title).toBe('テスト契約書7')
      expect(data1.contracts[2].title).toBe('テスト契約書6')

      // 2ページ目
      const request2 = new NextRequest('http://localhost/api/directories/test/contracts?search=テスト&page=2&limit=3')
      const response2 = await GET(request2, { params: { id: directory.id } })
      const data2 = await response2.json()

      expect(response2.status).toBe(200)
      expect(data2.contracts).toHaveLength(3)
      expect(data2.contracts[0].title).toBe('テスト契約書5')
      expect(data2.contracts[1].title).toBe('テスト契約書4')
      expect(data2.contracts[2].title).toBe('テスト契約書3')
    })

    it('存在しないディレクトリIDを指定した場合404エラーが返されること', async () => {
      const request = new NextRequest('http://localhost/api/directories/nonexistent/contracts')
      const response = await GET(request, { params: { id: 'nonexistent' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('ディレクトリが見つかりません')
    })

    it('無効なページネーションパラメータの場合400エラーが返されること', async () => {
      const directory = await factories.directory.build()

      // 無効なページ番号
      const request1 = new NextRequest('http://localhost/api/directories/test/contracts?page=0')
      const response1 = await GET(request1, { params: { id: directory.id } })
      expect(response1.status).toBe(400)

      // 無効なlimit
      const request2 = new NextRequest('http://localhost/api/directories/test/contracts?limit=0')
      const response2 = await GET(request2, { params: { id: directory.id } })
      expect(response2.status).toBe(400)

      // limitが大きすぎる
      const request3 = new NextRequest('http://localhost/api/directories/test/contracts?limit=101')
      const response3 = await GET(request3, { params: { id: directory.id } })
      expect(response3.status).toBe(400)
    })

    it('契約書に関連データ（オーナー、カテゴリ）が正しく含まれていること', async () => {
      // テストデータ作成
      const directory = await factories.directory.build()
      const owner = await factories.user.build({
        name: 'テストユーザー',
        email: 'test@example.com',
      })
      const category = await factories.category.build({
        name: 'テストカテゴリ',
        color: '#ff0000',
      })

      const contract = await factories.contract.build({
        title: 'テスト契約書',
        status: 'ACTIVE',
        contractNumber: 'TEST-001',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      const request = new NextRequest('http://localhost/api/directories/test/contracts')
      const response = await GET(request, { params: { id: directory.id } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.contracts).toHaveLength(1)

      const returnedContract = data.contracts[0]
      expect(returnedContract.id).toBe(contract.id)
      expect(returnedContract.title).toBe('テスト契約書')
      expect(returnedContract.status).toBe('ACTIVE')
      expect(returnedContract.contractNumber).toBe('TEST-001')
      expect(returnedContract.startDate).toBeTruthy()
      expect(returnedContract.endDate).toBeTruthy()

      // オーナー情報
      expect(returnedContract.owner).toEqual({
        id: owner.id,
        name: 'テストユーザー',
        email: 'test@example.com',
      })

      // カテゴリ情報
      expect(returnedContract.category).toEqual({
        id: category.id,
        name: 'テストカテゴリ',
        color: '#ff0000',
      })
    })

    it('空のディレクトリの場合、空の配列が返されること', async () => {
      const directory = await factories.directory.build({ name: 'empty-directory' })

      const request = new NextRequest('http://localhost/api/directories/test/contracts')
      const response = await GET(request, { params: { id: directory.id } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.contracts).toHaveLength(0)
      expect(data.directory.id).toBe(directory.id)
      expect(data.pagination.totalCount).toBe(0)
      expect(data.pagination.totalPages).toBe(0)
    })

    it('大文字小文字を区別しない検索が動作すること', async () => {
      const directory = await factories.directory.build()
      const owner = await factories.user.build()
      const category = await factories.category.build()

      const contract = await factories.contract.build({
        title: 'NDA Contract',
        ownerId: owner.id,
        directoryId: directory.id,
        categoryId: category.id,
      })

      // 小文字で検索
      const request1 = new NextRequest('http://localhost/api/directories/test/contracts?search=nda')
      const response1 = await GET(request1, { params: { id: directory.id } })
      const data1 = await response1.json()

      expect(response1.status).toBe(200)
      expect(data1.contracts).toHaveLength(1)
      expect(data1.contracts[0].title).toBe('NDA Contract')

      // 大文字で検索
      const request2 = new NextRequest('http://localhost/api/directories/test/contracts?search=CONTRACT')
      const response2 = await GET(request2, { params: { id: directory.id } })
      const data2 = await response2.json()

      expect(response2.status).toBe(200)
      expect(data2.contracts).toHaveLength(1)
      expect(data2.contracts[0].title).toBe('NDA Contract')
    })
  })
})