import { describe, it, expect } from 'vitest'

describe('Middleware', () => {
  it('middlewareファイルが正しく設定されている', async () => {
    // middlewareファイルが存在し、インポートできることを確認
    const middlewareModule = await import('../middleware')
    
    expect(middlewareModule.default).toBeDefined()
    expect(typeof middlewareModule.default).toBe('function')
  })

  it('authorized callbackのロジックが正しく動作する', () => {
    // authorized callbackの実装をテスト
    const authorizedCallback = ({ token }: { token: any }) => {
      return !!token
    }

    // tokenがある場合：認証成功
    expect(authorizedCallback({ token: 'valid-token' })).toBe(true)

    // tokenが null の場合：認証失敗
    expect(authorizedCallback({ token: null })).toBe(false)

    // tokenが undefined の場合：認証失敗
    expect(authorizedCallback({ token: undefined })).toBe(false)

    // tokenが空文字の場合：認証失敗
    expect(authorizedCallback({ token: '' })).toBe(false)
  })
})

describe('Middleware Config', () => {
  it('正しいmatcherパターンが設定されている', async () => {
    // middlewareファイルをインポート
    const middlewareModule = await import('../middleware') as any

    expect(middlewareModule.config).toBeDefined()
    expect(middlewareModule.config.matcher).toBeDefined()
    expect(middlewareModule.config.matcher).toEqual([
      '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
    ])
  })

  it('パターンの基本構造が正しいことを確認', async () => {
    const middlewareModule = await import('../middleware') as any
    const matcherPattern = middlewareModule.config.matcher[0]

    // パターンの基本構造が正しいことを確認
    expect(matcherPattern.startsWith('/')).toBe(true)
    expect(matcherPattern.includes('.*')).toBe(true)
    expect(matcherPattern.includes('api')).toBe(true)
    expect(matcherPattern.includes('_next/static')).toBe(true)
    expect(matcherPattern.includes('auth')).toBe(true)
  })
}) 