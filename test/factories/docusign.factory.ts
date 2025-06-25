import { BaseFactory } from './index'
import { DocuSignEnvelope, DocuSignSigner, PrismaClient } from '@/lib/generated/prisma'
import { faker } from './index'

const testPrisma = new PrismaClient()

export class DocuSignEnvelopeFactory extends BaseFactory<DocuSignEnvelope> {
  protected defaultAttributes(): Partial<DocuSignEnvelope> {
    const uniqueSuffix = faker.string('', 8)
    return {
      envelopeId: `test-envelope-${uniqueSuffix}`,
      status: 'CREATED',
      subject: faker.string(`test-envelope-subject-${uniqueSuffix}`, 10),
      message: faker.string('テスト用電子契約です', 20),
      templateId: null,
    }
  }

  protected async create(attributes: Partial<DocuSignEnvelope>): Promise<DocuSignEnvelope> {
    return testPrisma.docuSignEnvelope.create({
      data: {
        envelopeId: attributes.envelopeId!,
        contractId: attributes.contractId!,
        status: attributes.status || 'CREATED',
        subject: attributes.subject!,
        message: attributes.message || undefined,
        templateId: attributes.templateId || undefined,
      }
    })
  }

  // 依存関係付きでエンベロープを作成
  async createWithDependencies(
    overrides: Partial<DocuSignEnvelope> = {}
  ): Promise<DocuSignEnvelope> {
    // 契約書が指定されていない場合は作成
    if (!overrides.contractId) {
      const { contractFactory } = await import('./all')
      const contract = await contractFactory.createWithDependencies()
      overrides.contractId = contract.id
    }

    return this.build(overrides)
  }

  // 送信済みエンベロープを作成
  async createSent(overrides: Partial<DocuSignEnvelope> = {}): Promise<DocuSignEnvelope> {
    return this.createWithDependencies({
      status: 'SENT',
      ...overrides,
    })
  }

  // 完了済みエンベロープを作成
  async createCompleted(overrides: Partial<DocuSignEnvelope> = {}): Promise<DocuSignEnvelope> {
    return this.createWithDependencies({
      status: 'COMPLETED',
      completedAt: new Date(),
      ...overrides,
    })
  }

  // 署名者付きエンベロープを作成
  async createWithSigners(
    signerCount: number = 2,
    overrides: Partial<DocuSignEnvelope> = {}
  ): Promise<DocuSignEnvelope & { signers: DocuSignSigner[] }> {
    const envelope = await this.createWithDependencies(overrides)
    
    const signers = await Promise.all(
      Array.from({ length: signerCount }, async (_, index) => {
        return docuSignSignerFactory.build({
          envelopeId: envelope.id,
          routingOrder: index + 1,
        })
      })
    )

    return { ...envelope, signers }
  }
}

export class DocuSignSignerFactory extends BaseFactory<DocuSignSigner> {
  protected defaultAttributes(): Partial<DocuSignSigner> {
    const uniqueSuffix = faker.string('', 8)
    return {
      routingOrder: 1,
      email: `test-signer-${uniqueSuffix}@example.com`,
      name: faker.string(`test-signer-${uniqueSuffix}`, 8),
      status: 'CREATED',
    }
  }

  protected async create(attributes: Partial<DocuSignSigner>): Promise<DocuSignSigner> {
    return testPrisma.docuSignSigner.create({
      data: {
        envelopeId: attributes.envelopeId!,
        routingOrder: attributes.routingOrder!,
        email: attributes.email!,
        name: attributes.name!,
        status: attributes.status || 'CREATED',
        signedAt: attributes.signedAt || undefined,
      }
    })
  }

  // 送信済み署名者を作成
  async createSent(overrides: Partial<DocuSignSigner> = {}): Promise<DocuSignSigner> {
    return this.build({
      status: 'SENT',
      ...overrides,
    })
  }

  // 署名済み署名者を作成
  async createSigned(overrides: Partial<DocuSignSigner> = {}): Promise<DocuSignSigner> {
    return this.build({
      status: 'SIGNED',
      signedAt: new Date(),
      ...overrides,
    })
  }

  // 完了済み署名者を作成
  async createCompleted(overrides: Partial<DocuSignSigner> = {}): Promise<DocuSignSigner> {
    return this.build({
      status: 'COMPLETED',
      signedAt: new Date(),
      ...overrides,
    })
  }

  // 拒否した署名者を作成
  async createDeclined(overrides: Partial<DocuSignSigner> = {}): Promise<DocuSignSigner> {
    return this.build({
      status: 'DECLINED',
      ...overrides,
    })
  }
}

// ファクトリーインスタンスをエクスポート
export const docuSignEnvelopeFactory = new DocuSignEnvelopeFactory()
export const docuSignSignerFactory = new DocuSignSignerFactory()