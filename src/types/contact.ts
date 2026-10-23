import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome não pode ultrapassar 100 caracteres'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Insira um endereço de e-mail válido (ex.: nome@dominio.com)'),
  subject: z
    .string()
    .min(4, 'O assunto deve ter no mínimo 4 caracteres')
    .max(100, 'O assunto não pode ultrapassar 100 caracteres'),
  message: z
    .string()
    .min(20, 'A mensagem deve ter no mínimo 20 caracteres')
    .max(1000, 'A mensagem não pode ultrapassar 1000 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export interface ContactMessage extends ContactFormData {
  id: string
  created_at: string
  status: 'unread' | 'replied'
}

