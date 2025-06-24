import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from '@/app/api/directories/[id]/route'
import { factories, TestDataCleaner } from '../../../factories/all'

describe('/api/directories/[id]', () => {
  beforeEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories-id')
  })

  afterEach(async () => {
    await TestDataCleaner.cleanByPrefix('test-directories-id')
  })

  describe('GET', () => {
    test('存在するディレクトリの詳細を取得できる', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-get',
        path: '/test-directories-id-get',
        description: 'テスト用ディレクトリ詳細',
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`)
      const response = await GET(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.directory).toBeDefined()
      expect(result.directory.id).toBe(directory.id)
      expect(result.directory.name).toBe('test-directories-id-get')
      expect(result.directory.path).toBe('/test-directories-id-get')
      expect(result.directory.description).toBe('テスト用ディレクトリ詳細')
      expect(result.directory.children).toBeDefined()
      expect(result.directory.contracts).toBeDefined()
    })

    test('子ディレクトリが含まれる', async () => {
      const parentDir = await factories.directory.build({
        name: 'test-directories-id-parent',
        path: '/test-directories-id-parent',
      })

      const childDir = await factories.directory.build({
        name: 'child',
        path: '/test-directories-id-parent/child',
        parentId: parentDir.id,
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${parentDir.id}`)
      const response = await GET(request, { params: { id: parentDir.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.directory.children).toHaveLength(1)
      expect(result.directory.children[0].id).toBe(childDir.id)
      expect(result.directory.children[0].name).toBe('child')
    })

    test('契約書が含まれる', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-contracts',
        path: '/test-directories-id-contracts',
      })

      const contract = await factories.contract.build({
        title: 'テスト契約書',
        directoryId: directory.id,
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`)
      const response = await GET(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.directory.contracts).toHaveLength(1)
      expect(result.directory.contracts[0].id).toBe(contract.id)
      expect(result.directory.contracts[0].title).toBe('テスト契約書')
    })

    test('存在しないディレクトリで404エラー', async () => {
      const request = new NextRequest('http://localhost:3000/api/directories/nonexistent-id')
      const response = await GET(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ディレクトリが見つかりません')
    })

    test('非アクティブなディレクトリで404エラー', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-inactive',
        path: '/test-directories-id-inactive',
        isActive: false,
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`)
      const response = await GET(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ディレクトリが見つかりません')
    })
  })

  describe('PUT', () => {
    test('ディレクトリ名と説明を更新できる', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-put',
        path: '/test-directories-id-put',
        description: '元の説明',
      })

      const requestBody = {
        name: 'updated-name',
        description: '更新された説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.directory.name).toBe('updated-name')
      expect(result.directory.description).toBe('更新された説明')
      expect(result.directory.path).toBe('updated-name')
    })

    test('親ディレクトリを変更できる', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-move',
        path: '/test-directories-id-move',
      })

      const newParent = await factories.directory.build({
        name: 'new-parent',
        path: '/new-parent',
      })

      const requestBody = {
        name: 'test-directories-id-move',
        parentId: newParent.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.directory.parentId).toBe(newParent.id)
      expect(result.directory.path).toBe('/new-parent/test-directories-id-move')
    })

    test('ディレクトリ名が空でエラー', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-empty',
        path: '/test-directories-id-empty',
      })

      const requestBody = {
        name: '',
        description: '説明',
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('ディレクトリ名は必須です')
    })

    test('存在しない親ディレクトリIDでエラー', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-invalid-parent',
        path: '/test-directories-id-invalid-parent',
      })

      const requestBody = {
        name: 'test-directories-id-invalid-parent',
        parentId: 'invalid-parent-id',
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('親ディレクトリが見つかりません')
    })

    test('自分自身を親にしようとしてエラー', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-self-parent',
        path: '/test-directories-id-self-parent',
      })

      const requestBody = {
        name: 'test-directories-id-self-parent',
        parentId: directory.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('自分自身を親ディレクトリに設定できません')
    })

    test('循環参照を防ぐ', async () => {
      const parentDir = await factories.directory.build({
        name: 'test-directories-id-circular-parent',
        path: '/test-directories-id-circular-parent',
      })

      const childDir = await factories.directory.build({
        name: 'child',
        path: '/test-directories-id-circular-parent/child',
        parentId: parentDir.id,
      })

      // 親ディレクトリを子ディレクトリの子にしようとする
      const requestBody = {
        name: 'test-directories-id-circular-parent',
        parentId: childDir.id,
      }

      const request = new NextRequest(`http://localhost:3000/api/directories/${parentDir.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: parentDir.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('循環参照が発生します')
    })

    test('存在しないディレクトリで404エラー', async () => {
      const requestBody = {
        name: 'test-name',
      }

      const request = new NextRequest('http://localhost:3000/api/directories/nonexistent-id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await PUT(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ディレクトリが見つかりません')
    })
  })

  describe('DELETE', () => {
    test('空のディレクトリを削除できる', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-delete-empty',
        path: '/test-directories-id-delete-empty',
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result.message).toBe('ディレクトリを削除しました')
    })

    test('子ディレクトリがある場合は削除できない', async () => {
      const parentDir = await factories.directory.build({
        name: 'test-directories-id-delete-has-child',
        path: '/test-directories-id-delete-has-child',
      })

      await factories.directory.build({
        name: 'child',
        path: '/test-directories-id-delete-has-child/child',
        parentId: parentDir.id,
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${parentDir.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: parentDir.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('子ディレクトリが存在するため削除できません。先に子ディレクトリを削除してください。')
    })

    test('契約書がある場合は削除できない', async () => {
      const directory = await factories.directory.build({
        name: 'test-directories-id-delete-has-contract',
        path: '/test-directories-id-delete-has-contract',
      })

      await factories.contract.build({
        title: 'テスト契約書',
        directoryId: directory.id,
      })

      const request = new NextRequest(`http://localhost:3000/api/directories/${directory.id}`, {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: directory.id } })
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toBe('契約書が存在するため削除できません。先に契約書を移動または削除してください。')
    })

    test('存在しないディレクトリで404エラー', async () => {
      const request = new NextRequest('http://localhost:3000/api/directories/nonexistent-id', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: { id: 'nonexistent-id' } })
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toBe('ディレクトリが見つかりません')
    })
  })
}) 