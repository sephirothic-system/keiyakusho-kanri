import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            契約書管理システム
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
