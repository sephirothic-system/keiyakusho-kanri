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
    // 既存ユーザーがisAdmin=falseの場合は更新
    if (!existingUser.isAdmin) {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: { isAdmin: true },
      })
      console.log('既存のテストユーザーを管理者に更新しました:', {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        isAdmin: updatedUser.isAdmin,
      })
      return updatedUser
    }
    console.log('テストユーザーは既に管理者として存在します:', {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      isAdmin: existingUser.isAdmin,
    })
    return existingUser
  }

  // テストユーザーを作成
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      isActive: true,
      isAdmin: true,
    },
  })

  console.log('テストユーザーが作成されました:', {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
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
