import { Group } from '@/lib/generated/prisma'
import { BaseFactory, faker, testPrisma } from './index'

export class GroupFactory extends BaseFactory<Group> {
  protected defaultAttributes(): Partial<Group> {
    const uniqueSuffix = faker.string('', 8)
    return {
      name: faker.string(`test-group-${uniqueSuffix}`, 6),
      description: `テスト用グループ - ${faker.string('desc', 6)}`,
      isActive: true,
    }
  }

  protected async create(attributes: Partial<Group>): Promise<Group> {
    return testPrisma.group.create({
      data: {
        name: attributes.name || this.defaultAttributes().name!,
        description: attributes.description || this.defaultAttributes().description,
        isActive: attributes.isActive ?? this.defaultAttributes().isActive,
        ...attributes,
      },
    })
  }

  // 便利メソッド
  async createLegalGroup(overrides: Partial<Group> = {}): Promise<Group> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Legal-Group-${uniqueSuffix}`,
      description: '法務部門グループ',
      ...overrides,
    })
  }

  async createBusinessGroup(overrides: Partial<Group> = {}): Promise<Group> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Business-Group-${uniqueSuffix}`,
      description: '営業部門グループ',
      ...overrides,
    })
  }

  async createAdminGroup(overrides: Partial<Group> = {}): Promise<Group> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Admin-Group-${uniqueSuffix}`,
      description: '管理者グループ',
      ...overrides,
    })
  }
}

export const groupFactory = new GroupFactory()
