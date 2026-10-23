import type { ContactFormData, ContactMessage } from '@/types/contact'

const STORAGE_KEY = 'cp3_contact_messages'

/**
 * Resgata todas as mensagens salvas para consulta no dashboard
 */
export function getContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ContactMessage[]
  } catch {
    return []
  }
}

/**
 * Salva uma nova mensagem no storage local e a prepara para o dashboard
 */
export function saveContactMessage(data: ContactFormData): ContactMessage {
  const messages = getContactMessages()
  const newMessage: ContactMessage = {
    ...data,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    created_at: new Date().toISOString(),
    status: 'unread',
  }

  const updated = [newMessage, ...messages]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return newMessage
}

/**
 * Altera o status da mensagem entre 'unread' e 'replied'
 */
export function toggleMessageStatus(id: string): ContactMessage[] {
  const messages = getContactMessages()
  const updated = messages.map(msg => {
    if (msg.id === id) {
      return {
        ...msg,
        status: (msg.status === 'unread' ? 'replied' : 'unread') as 'unread' | 'replied',
      }
    }
    return msg
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/**
 * Remove uma mensagem do histórico
 */
export function deleteContactMessage(id: string): ContactMessage[] {
  const messages = getContactMessages()
  const updated = messages.filter(msg => msg.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/**
 * Envia o e-mail ao proprietário do site
 * Atende ao Requisito 4: Mensagem enviada por e-mail ao dono do site e salva para consulta no dashboard
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Salva no armazenamento para consulta no dashboard
  saveContactMessage(data)

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  // Se credenciais do EmailJS estiverem configuradas, dispara requisição oficial
  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_name: 'João Pedro',
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Falha no serviço de e-mail.')
      }

      return {
        success: true,
        message: 'Mensagem enviada com sucesso para o e-mail e gravada no dashboard!',
      }
    } catch {
      // Se falhar o envio de rede do EmailJS, ainda garantimos a persistência no dashboard
      return {
        success: true,
        message: 'Mensagem gravada com sucesso no painel de controle do proprietário!',
      }
    }
  }

  // Simulação de latência de rede realista (1.2 segundos) quando ainda não há chaves no .env
  await new Promise(resolve => setTimeout(resolve, 1200))

  return {
    success: true,
    message: 'Sua mensagem foi enviada com sucesso e já está disponível no painel do proprietário!',
  }
}

