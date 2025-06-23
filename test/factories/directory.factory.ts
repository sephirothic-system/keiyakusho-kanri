import { Directory } from '@/lib/generated/prisma'
import { BaseFactory, faker, testPrisma } from './index'

export class DirectoryFactory extends BaseFactory<Directory> {
  protected defaultAttributes(): Partial<Directory> {
    const uniqueSuffix = faker.string('', 8)
    const name = faker.string(`test-dir-${uniqueSuffix}`, 6)

    return {
      name,
      description: `テスト用ディレクトリ - ${name}`,
      path: `/test/${name}`,
      isActive: true,
    }
  }

  protected async create(attributes: Partial<Directory>): Promise<Directory> {
    return testPrisma.directory.create({
      data: {
        name: attributes.name || this.defaultAttributes().name!,
        description: attributes.description || this.defaultAttributes().description,
        path: attributes.path || this.defaultAttributes().path!,
        isActive: attributes.isActive ?? this.defaultAttributes().isActive,
        parentId: attributes.parentId,
        ...attributes,
      },
    })
  }

  // 親ディレクトリ付きで作成
  async createWithParent(
    parent: Directory,
    overrides: Partial<Directory> = {}
  ): Promise<Directory> {
    const uniqueSuffix = faker.string('', 8)
    const name = overrides.name || faker.string(`test-subdir-${uniqueSuffix}`, 6)

    return this.build({
      parentId: parent.id,
      path: `${parent.path}/${name}`,
      name,
      ...overrides,
    })
  }

  // ルートディレクトリ作成
  async createRoot(overrides: Partial<Directory> = {}): Promise<Directory> {
    const uniqueSuffix = faker.string('', 8)
    const name = overrides.name || faker.string(`test-root-${uniqueSuffix}`, 6)

    return this.build({
      name,
      path: `/${name}`,
      description: 'テスト用ルートディレクトリ',
      ...overrides,
    })
  }

  // 法務ディレクトリ作成
  async createLegalDirectory(
    parent?: Directory,
    overrides: Partial<Directory> = {}
  ): Promise<Directory> {
    const uniqueSuffix = faker.string('', 8)
    const name = faker.string(`test-legal-${uniqueSuffix}`, 6)
    const basePath = parent ? parent.path : '/test'

    return this.build({
      name,
      path: `${basePath}/${name}`,
      description: '法務関連ディレクトリ',
      parentId: parent?.id,
      ...overrides,
    })
  }

  // 営業ディレクトリ作成
  async createBusinessDirectory(
    parent?: Directory,
    overrides: Partial<Directory> = {}
  ): Promise<Directory> {
    const uniqueSuffix = faker.string('', 8)
    const name = faker.string(`test-business-${uniqueSuffix}`, 6)
    const basePath = parent ? parent.path : '/test'

    return this.build({
      name,
      path: `${basePath}/${name}`,
      description: '営業関連ディレクトリ',
      parentId: parent?.id,
      ...overrides,
    })
  }
}

export const directoryFactory = new DirectoryFactory()
