import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // ここに認証が必要な場合のミドルウェア処理を書く
  function middleware(req) {
    // 特別な処理が必要な場合はここに記述
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // tokenが存在する場合（ログイン済み）のみアクセスを許可
        return !!token
      },
    },
  }
)

// 認証が必要なパス
export const config = {
  matcher: [
    /*
     * 以下のパスを除く全てのパスで認証をチェック:
     * - api/auth/* (NextAuth認証関連のAPI)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (認証関連のページ)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|auth).*)',
  ],
} 