import { PrismaClient, Permission } from './generated/prisma'

const prisma = new PrismaClient()

/**
 * 契約書への権限チェック結果
 */
export interface ContractPermission {
  canRead: boolean
  canWrite: boolean
  accessType: 'owner' | 'group' | 'none'
}

/**
 * ユーザーが契約書にアクセスできるかチェック
 */
export async function checkContractPermission(
  userId: string,
  contractId: string
): Promise<ContractPermission> {
  // 契約書とその所有者、ディレクトリ情報を取得
  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: {
      owner: true,
      directory: {
        include: {
          directoryAccess: {
            include: {
              group: {
                include: {
                  userGroups: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!contract) {
    return { canRead: false, canWrite: false, accessType: 'none' }
  }

  // 1. オーナー権限チェック
  if (contract.ownerId === userId) {
    return { canRead: true, canWrite: true, accessType: 'owner' }
  }

  // 2. グループ権限チェック
  const userGroups = await prisma.userGroup.findMany({
    where: { userId },
    include: { group: true },
  })

  const userGroupIds = userGroups.map(ug => ug.groupId)

  // ディレクトリへのアクセス権限をチェック
  const directoryAccess = contract.directory.directoryAccess.find(access =>
    userGroupIds.includes(access.groupId)
  )

  if (directoryAccess) {
    const canWrite = directoryAccess.permission === Permission.WRITE
    return {
      canRead: true,
      canWrite,
      accessType: 'group',
    }
  }

  return { canRead: false, canWrite: false, accessType: 'none' }
}

/**
 * ユーザーがアクセス可能な契約書一覧を取得
 */
export async function getAccessibleContracts(userId: string) {
  // ユーザーのグループIDを取得
  const userGroups = await prisma.userGroup.findMany({
    where: { userId },
    select: { groupId: true },
  })
  const userGroupIds = userGroups.map(ug => ug.groupId)

  // オーナーの契約書 + グループでアクセス可能な契約書
  const contracts = await prisma.contract.findMany({
    where: {
      OR: [
        // オーナーの契約書
        { ownerId: userId },
        // グループでアクセス可能な契約書
        {
          directory: {
            directoryAccess: {
              some: {
                groupId: { in: userGroupIds },
              },
            },
          },
        },
      ],
    },
    include: {
      owner: { select: { name: true, email: true } },
      directory: { select: { name: true, path: true } },
      category: { select: { name: true, color: true } },
      _count: { select: { versions: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return contracts
}

/**
 * ディレクトリへのアクセス権限をチェック
 */
export async function checkDirectoryPermission(
  userId: string,
  directoryId: string
): Promise<ContractPermission> {
  const userGroups = await prisma.userGroup.findMany({
    where: { userId },
    select: { groupId: true },
  })
  const userGroupIds = userGroups.map(ug => ug.groupId)

  const directoryAccess = await prisma.directoryAccess.findFirst({
    where: {
      directoryId,
      groupId: { in: userGroupIds },
    },
  })

  if (directoryAccess) {
    const canWrite = directoryAccess.permission === Permission.WRITE
    return {
      canRead: true,
      canWrite,
      accessType: 'group',
    }
  }

  return { canRead: false, canWrite: false, accessType: 'none' }
}

/**
 * ユーザーがアクセス可能なディレクトリ一覧を取得
 */
export async function getAccessibleDirectories(userId: string) {
  const userGroups = await prisma.userGroup.findMany({
    where: { userId },
    select: { groupId: true },
  })
  const userGroupIds = userGroups.map(ug => ug.groupId)

  const directories = await prisma.directory.findMany({
    where: {
      directoryAccess: {
        some: {
          groupId: { in: userGroupIds },
        },
      },
    },
    include: {
      directoryAccess: {
        where: { groupId: { in: userGroupIds } },
        include: { group: { select: { name: true } } },
      },
      _count: { select: { contracts: true } },
    },
    orderBy: { path: 'asc' },
  })

  return directories
}

/**
 * 権限チェック用のミドルウェア関数
 */
export function requireContractPermission(permission: 'read' | 'write') {
  return async (userId: string, contractId: string): Promise<boolean> => {
    const perms = await checkContractPermission(userId, contractId)

    if (permission === 'read') {
      return perms.canRead
    } else {
      return perms.canWrite
    }
  }
}
