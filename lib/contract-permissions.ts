import { PrismaClient, Permission } from './generated/prisma'

const prisma = new PrismaClient()

/**
 * 契約書への権限チェック結果
 */
export interface ContractPermission {
  canRead: boolean
  canWrite: boolean
  accessType: 'owner' | 'group' | 'admin' | 'none'
}

/**
 * ユーザーが管理者かどうかをチェック
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true } as any,
  })
  return (user as any)?.isAdmin ?? false
}

/**
 * 管理者権限が必要な操作の権限チェック
 */
export async function requireAdminPermission(userId: string): Promise<boolean> {
  return await isAdmin(userId)
}

/**
 * ユーザーが契約書にアクセスできるかチェック
 */
export async function checkContractPermission(
  userId: string,
  contractId: string
): Promise<ContractPermission> {
  // 管理者権限チェック
  if (await isAdmin(userId)) {
    return { canRead: true, canWrite: true, accessType: 'admin' }
  }

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
  // 管理者の場合は全ての契約書にアクセス可能
  if (await isAdmin(userId)) {
    return await prisma.contract.findMany({
      include: {
        owner: { select: { name: true, email: true } },
        directory: { select: { name: true, path: true } },
        category: { select: { name: true, color: true } },
        _count: { select: { versions: true } },
      },
      orderBy: { updatedAt: 'desc' },
    })
  }

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
  // 管理者権限チェック
  if (await isAdmin(userId)) {
    return { canRead: true, canWrite: true, accessType: 'admin' }
  }

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
  // 管理者の場合は全てのディレクトリにアクセス可能
  if (await isAdmin(userId)) {
    return await prisma.directory.findMany({
      include: {
        directoryAccess: {
          include: { group: { select: { name: true } } },
        },
        _count: { select: { contracts: true } },
      },
      orderBy: { path: 'asc' },
    })
  }

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

/**
 * ディレクトリアクセス権限を付与
 */
export async function grantDirectoryAccess(
  adminUserId: string,
  directoryId: string,
  groupId: string,
  permission: Permission
): Promise<{ success: boolean; error?: string }> {
  // 管理者権限チェック
  if (!(await requireAdminPermission(adminUserId))) {
    return { success: false, error: '管理者権限が必要です' }
  }

  try {
    // ディレクトリとグループの存在確認
    const [directory, group] = await Promise.all([
      prisma.directory.findUnique({ where: { id: directoryId } }),
      prisma.group.findUnique({ where: { id: groupId } }),
    ])

    if (!directory) {
      return { success: false, error: 'ディレクトリが見つかりません' }
    }

    if (!group) {
      return { success: false, error: 'グループが見つかりません' }
    }

    // 既存の権限を確認
    const existingAccess = await prisma.directoryAccess.findUnique({
      where: {
        directoryId_groupId: {
          directoryId,
          groupId,
        },
      },
    })

    if (existingAccess) {
      // 既存の権限を更新
      await prisma.directoryAccess.update({
        where: {
          directoryId_groupId: {
            directoryId,
            groupId,
          },
        },
        data: { permission },
      })
    } else {
      // 新しい権限を作成
      await prisma.directoryAccess.create({
        data: {
          directoryId,
          groupId,
          permission,
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error granting directory access:', error)
    return { success: false, error: 'サーバーエラーが発生しました' }
  }
}

/**
 * ディレクトリアクセス権限を削除
 */
export async function revokeDirectoryAccess(
  adminUserId: string,
  directoryId: string,
  groupId: string
): Promise<{ success: boolean; error?: string }> {
  // 管理者権限チェック
  if (!(await requireAdminPermission(adminUserId))) {
    return { success: false, error: '管理者権限が必要です' }
  }

  try {
    await prisma.directoryAccess.delete({
      where: {
        directoryId_groupId: {
          directoryId,
          groupId,
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error revoking directory access:', error)
    return { success: false, error: '権限が見つからないか、削除できませんでした' }
  }
}
