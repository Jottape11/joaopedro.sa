import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/types/contact'

describe('Validação do Formulário de Contato com Zod (Requisito 4 & 9)', () => {
  it('deve aceitar dados válidos com todos os campos preenchidos corretamente', () => {
    const validData = {
      name: 'Mariana Silva',
      email: 'mariana.silva@techcorp.com',
      subject: 'Oportunidade Engenheiro Front-End',
      message: 'Olá João Pedro, gostaríamos de agendar uma conversa técnica sobre suas experiências com React e TypeScript.',
    }

    const result = contactSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('deve rejeitar nome com menos de 3 caracteres', () => {
    const invalidData = {
      name: 'Jo',
      email: 'jo@empresa.com',
      subject: 'Oportunidade',
      message: 'Mensagem válida com mais de vinte caracteres para teste.',
    }

    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('mínimo 3')
    }
  })

  it('deve rejeitar e-mail inválido', () => {
    const invalidData = {
      name: 'Mariana Silva',
      email: 'email-invalido-sem-arroba',
      subject: 'Oportunidade',
      message: 'Mensagem válida com mais de vinte caracteres para teste.',
    }

    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('e-mail válido')
    }
  })

  it('deve rejeitar assunto com menos de 4 caracteres', () => {
    const invalidData = {
      name: 'Mariana Silva',
      email: 'mariana@empresa.com',
      subject: 'Oi',
      message: 'Mensagem válida com mais de vinte caracteres para teste.',
    }

    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('mínimo 4')
    }
  })

  it('deve rejeitar mensagem com menos de 20 caracteres mínimos', () => {
    const invalidData = {
      name: 'Mariana Silva',
      email: 'mariana@empresa.com',
      subject: 'Oportunidade',
      message: 'Muito curta', // 11 caracteres
    }

    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('mínimo 20')
    }
  })
})

