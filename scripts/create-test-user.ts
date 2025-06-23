import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  const email = 'test@example.com'
  const password = 'testpassword123'
  const name = 'テストユーザー'

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 12)

  // 既存のユーザーをチェック
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('テストユーザーは既に存在します')
    return existingUser
  }

  // テストユーザーを作成
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      isActive: true,
    },
  })

  console.log('テストユーザーが作成されました:', {
    id: user.id,
    email: user.email,
    name: user.name,
  })

  return user
}

async function main() {
  try {
    await createTestUser()
  } catch (error) {
    console.error('テストユーザーの作成でエラーが発生しました:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
