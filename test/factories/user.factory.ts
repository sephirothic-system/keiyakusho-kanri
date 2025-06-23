import { User } from '@/lib/generated/prisma'
import { BaseFactory, faker, testPrisma } from './index'

export class UserFactory extends BaseFactory<User> {
  protected defaultAttributes(): Partial<User> {
    const uniqueSuffix = faker.string('', 8)
    return {
      email: faker.email(`test-user-${uniqueSuffix}`),
      name: faker.string('test-user', 10),
      isActive: true,
    }
  }

  protected async create(attributes: Partial<User>): Promise<User> {
    return testPrisma.user.create({
      data: {
        email: attributes.email || this.defaultAttributes().email!,
        name: attributes.name || this.defaultAttributes().name!,
        isActive: attributes.isActive ?? this.defaultAttributes().isActive,
        ...attributes,
      },
    })
  }

  // 便利メソッド
  async createAdmin(overrides: Partial<User> = {}): Promise<User> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Admin User ${uniqueSuffix}`,
      email: faker.email(`test-admin-${uniqueSuffix}`),
      ...overrides,
    })
  }

  async createRegularUser(overrides: Partial<User> = {}): Promise<User> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Regular User ${uniqueSuffix}`,
      email: faker.email(`test-regular-${uniqueSuffix}`),
      ...overrides,
    })
  }

  async createInactiveUser(overrides: Partial<User> = {}): Promise<User> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: `Inactive User ${uniqueSuffix}`,
      email: faker.email(`test-inactive-${uniqueSuffix}`),
      isActive: false,
      ...overrides,
    })
  }
}

export const userFactory = new UserFactory()
