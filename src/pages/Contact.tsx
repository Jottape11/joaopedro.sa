import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clapperboard,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons'
import { contactSchema, type ContactFormData } from '@/types/contact'
import { sendContactEmail } from '@/services/contact'
import { useLanguage } from '@/hooks/useLanguage'

export const Contact: React.FC = () => {
  const { t } = useLanguage()
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
      await sendContactEmail(data)
      setFeedback({ type: 'success', message: t.contact.successMessage })
      reset()
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Falha ao enviar mensagem. Tente novamente.',
      })
    }
  }

  const directChannels = [
    {
      title: 'GitHub',
      subtitle: t.contact.githubCard,
      handle: '@Jottape11',
      url: 'https://github.com/Jottape11',
      icon: GithubIcon,
      accent: 'hover:border-zinc-400 dark:hover:border-zinc-500',
    },
    {
      title: 'LinkedIn',
      subtitle: t.contact.linkedinCard,
      handle: 'João Pedro Sá',
      url: 'https://www.linkedin.com/in/joaopedrosa/',
      icon: LinkedinIcon,
      accent: 'hover:border-blue-500/60 dark:hover:border-blue-400/60',
    },
    {
      title: 'E-mail',
      subtitle: t.contact.emailCard,
      handle: 'joaopedro.sa@outlook.com',
      url: 'mailto:joaopedro.sa@outlook.com',
      icon: Mail,
      accent: 'hover:border-[#E50914]/60',
    },
    {
      title: 'Campus FIAP',
      subtitle: t.contact.locationCard,
      handle: 'São Paulo, SP — Brasil',
      url: 'https://www.fiap.com.br',
      icon: MapPin,
      accent: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4 sm:py-6">
      {/* Top Billboard Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/25 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>{t.contact.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
          {t.contact.title}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-[#b3b3b3] leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Grid: Form & Direct Contact Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form (7 cols) */}
        <div className="lg:col-span-7 bg-white/95 dark:bg-[#181818]/95 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-white uppercase tracking-wide">
                Briefing & Mensagem Direta
              </h2>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-[#a3a3a3]">
              BaaS Sync Active
            </span>
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div
              role="alert"
              className={`p-4 rounded-xl flex items-start gap-3 text-sm animate-fadeIn ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#E50914]/10 text-red-700 dark:text-red-300 border border-[#E50914]/30'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
              )}
              <p className="leading-relaxed font-medium">{feedback.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Campo Nome */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#b3b3b3]">
                {t.contact.nameLabel} <span className="text-[#E50914]">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder={t.contact.namePlaceholder}
                {...register('name')}
                aria-invalid={Boolean(errors.name)}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-zinc-50 dark:bg-[#232323] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-[#E50914] focus:ring-2 focus:ring-[#E50914]/25'
                    : 'border-zinc-300 dark:border-white/10 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-[#E50914] flex items-center gap-1.5 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            {/* Campo E-mail */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#b3b3b3]">
                {t.contact.emailLabel} <span className="text-[#E50914]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder={t.contact.emailPlaceholder}
                {...register('email')}
                aria-invalid={Boolean(errors.email)}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-zinc-50 dark:bg-[#232323] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none transition-all ${
                  errors.email
                    ? 'border-[#E50914] focus:ring-2 focus:ring-[#E50914]/25'
                    : 'border-zinc-300 dark:border-white/10 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-[#E50914] flex items-center gap-1.5 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Campo Assunto */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#b3b3b3]">
                {t.contact.subjectLabel} <span className="text-[#E50914]">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder={t.contact.subjectPlaceholder}
                {...register('subject')}
                aria-invalid={Boolean(errors.subject)}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-zinc-50 dark:bg-[#232323] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none transition-all ${
                  errors.subject
                    ? 'border-[#E50914] focus:ring-2 focus:ring-[#E50914]/25'
                    : 'border-zinc-300 dark:border-white/10 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20'
                }`}
              />
              {errors.subject && (
                <p className="text-xs text-[#E50914] flex items-center gap-1.5 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject.message}</span>
                </p>
              )}
            </div>

            {/* Campo Mensagem */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#b3b3b3]">
                  {t.contact.messageLabel} <span className="text-[#E50914]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono transition-colors ${
                    currentMessage.length < 20
                      ? 'text-zinc-400 dark:text-zinc-500'
                      : 'text-emerald-600 dark:text-emerald-400 font-bold'
                  }`}
                >
                  {currentMessage.length}/20 {t.contact.minChars}
                </span>
              </div>
              <textarea
                id="message"
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                {...register('message')}
                aria-invalid={Boolean(errors.message)}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-zinc-50 dark:bg-[#232323] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none transition-all resize-none ${
                  errors.message
                    ? 'border-[#E50914] focus:ring-2 focus:ring-[#E50914]/25'
                    : 'border-zinc-300 dark:border-white/10 focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/20'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-[#E50914] flex items-center gap-1.5 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message.message}</span>
                </p>
              )}
            </div>

            {/* Botão de Envio com estilo Netflix */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#E50914]/25 hover:shadow-[#E50914]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.contact.sendingButton}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.contact.sendButton}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header of Direct Channels */}
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E50914]" />
              <span>{t.contact.directChannelsTitle}</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-[#a3a3a3]">
              {t.contact.directChannelsSubtitle}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {directChannels.map(channel => {
              const Icon = channel.icon
              return (
                <a
                  key={channel.title}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group p-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#181818] hover:bg-zinc-50 dark:hover:bg-[#202020] transition-all flex items-center justify-between gap-4 shadow-sm ${channel.accent}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-[#252525] text-zinc-800 dark:text-zinc-200 group-hover:text-[#E50914] group-hover:scale-110 transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-zinc-900 dark:text-white">
                          {channel.title}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-[#a3a3a3] block truncate">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0" />
                </a>
              )
            })}
          </div>

          {/* BaaS & Security Pill */}
          <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-[#181818]/80 border border-zinc-200 dark:border-white/10 text-xs text-zinc-600 dark:text-[#a3a3a3] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.contact.securityNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
