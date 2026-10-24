import { describe, it, expect, beforeEach } from 'vitest'
import {
  getContactMessages,
  saveContactMessage,
  toggleMessageStatus,
  deleteContactMessage,
} from '@/services/contact'

describe('Serviço de Mensagens de Contato & Storage Local (Requisito 4 & 5)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('deve salvar uma nova mensagem e recuperá-la com status unread', () => {
    const data = {
      name: 'Carlos Tech',
      email: 'carlos@recruiter.com',
      subject: 'Proposta de Contratação',
      message: 'Olá João Pedro, gostaríamos de fazer uma oferta para nossa equipe.',
    }

    const saved = saveContactMessage(data)
    expect(saved.id).toBeDefined()
    expect(saved.status).toBe('unread')
    expect(saved.created_at).toBeDefined()

    const all = getContactMessages()
    expect(all).toHaveLength(1)
    expect(all[0].name).toBe('Carlos Tech')
  })

  it('deve alternar status da mensagem entre unread e replied', () => {
    const saved = saveContactMessage({
      name: 'Ana Avaliadora',
      email: 'ana@fiap.com.br',
      subject: 'Feedback CP3',
      message: 'Parabéns pela arquitetura e atenção aos detalhes no portfólio.',
    })

    const updated = toggleMessageStatus(saved.id)
    expect(updated[0].status).toBe('replied')

    const toggledBack = toggleMessageStatus(saved.id)
    expect(toggledBack[0].status).toBe('unread')
  })

  it('deve remover a mensagem quando solicitado', () => {
    const saved = saveContactMessage({
      name: 'Remover Teste',
      email: 'teste@remover.com',
      subject: 'Remover',
      message: 'Mensagem de teste que deve ser excluída pelo dashboard.',
    })

    expect(getContactMessages()).toHaveLength(1)

    const remaining = deleteContactMessage(saved.id)
    expect(remaining).toHaveLength(0)
    expect(getContactMessages()).toHaveLength(0)
  })
})

