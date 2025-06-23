import { Category } from '@/lib/generated/prisma'
import { BaseFactory, faker, testPrisma } from './index'

export class CategoryFactory extends BaseFactory<Category> {
  protected defaultAttributes(): Partial<Category> {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
    const uniqueSuffix = faker.string('', 8)

    return {
      name: faker.string(`test-category-${uniqueSuffix}`, 6),
      color: faker.choice(colors),
    }
  }

  protected async create(attributes: Partial<Category>): Promise<Category> {
    return testPrisma.category.create({
      data: {
        name: attributes.name || this.defaultAttributes().name!,
        color: attributes.color || this.defaultAttributes().color!,
        ...attributes,
      },
    })
  }

  // 便利メソッド
  async createNDACategory(overrides: Partial<Category> = {}): Promise<Category> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: faker.string(`test-nda-category-${uniqueSuffix}`, 6),
      color: '#8B5CF6',
      ...overrides,
    })
  }

  async createBusinessCategory(overrides: Partial<Category> = {}): Promise<Category> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: faker.string(`test-business-category-${uniqueSuffix}`, 6),
      color: '#3B82F6',
      ...overrides,
    })
  }

  async createEmploymentCategory(overrides: Partial<Category> = {}): Promise<Category> {
    const uniqueSuffix = faker.string('', 8)
    return this.build({
      name: faker.string(`test-employment-category-${uniqueSuffix}`, 6),
      color: '#EF4444',
      ...overrides,
    })
  }
}

export const categoryFactory = new CategoryFactory()
