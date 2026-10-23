import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/types/contact'
import { sendContactEmail } from '@/services/contact'

export const Contact: React.FC = () => {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const currentMessage = useWatch({ control, name: 'message' }) || ''

  const onSubmit = async (data: ContactFormData) => {
    setFeedback(null)
    try {
      const result = await sendContactEmail(data)
      setFeedback({ type: 'success', message: result.message })
      reset()
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Falha ao enviar mensagem. Tente novamente.',
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Mail className="w-4 h-4" />
          <span>Formulário de Contato</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Vamos conversar sobre novas oportunidades?
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          Preencha o formulário abaixo. Sua mensagem será enviada por e-mail e ficará salva no painel administrativo do portfólio.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="p-8 rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900 shadow-sm space-y-6">
        {/* Success or Error Feedback Banner */}
        {feedback && (
          <div
            role="alert"
            className={`p-4 rounded-2xl flex items-start gap-3 text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{feedback.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Campo Nome */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Seu Nome Completo <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ex.: Mariana Silva"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          {/* Campo E-mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Seu E-mail Corporativo ou Pessoal <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="mariana@empresa.com"
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Campo Assunto */}
          <div className="space-y-1.5">
            <label htmlFor="subject" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Assunto <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Ex.: Oportunidade de Desenvolvedor Front-end"
              {...register('subject')}
              aria-invalid={Boolean(errors.subject)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-all ${
                errors.subject
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
            {errors.subject && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.subject.message}</span>
              </p>
            )}
          </div>

          {/* Campo Mensagem com Contador */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="message" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Mensagem <span className="text-red-500">*</span>
              </label>
              <span
                className={`text-[11px] font-mono ${
                  currentMessage.length < 20
                    ? 'text-zinc-400 dark:text-zinc-500'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {currentMessage.length}/20 caracteres mínimos
              </span>
            </div>
            <textarea
              id="message"
              rows={4}
              placeholder="Olá João Pedro, vi o seu portfólio no GitHub e gostaria de conversar sobre um projeto..."
              {...register('message')}
              aria-invalid={Boolean(errors.message)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-zinc-50 dark:bg-zinc-800/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none transition-all resize-none ${
                errors.message
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              }`}
            />
            {errors.message && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message.message}</span>
              </p>
            )}
          </div>

          {/* Botão de Envio com Bloqueio de Duplicatas e Spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando Mensagem...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Info card */}
      <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-3">
        <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" />
        <p>
          As mensagens enviadas por aqui são protegidas e podem ser consultadas e marcadas como respondidas no{' '}
          <strong className="text-zinc-800 dark:text-zinc-200">Dashboard Administrativo</strong> do proprietário.
        </p>
      </div>
    </div>
  )
}
