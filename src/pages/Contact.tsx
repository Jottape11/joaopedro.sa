import React from 'react'
import { Mail, Send } from 'lucide-react'

export const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Mail className="w-4 h-4" />
          <span>Fale Comigo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Vamos conversar sobre novas oportunidades?
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Preencha o formulário abaixo para enviar uma mensagem direta para meu e-mail e para o painel de mensagens do portfólio.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300">
          💡 <strong>Fase 4:</strong> Implementaremos aqui a validação campo a campo com <code>React Hook Form + Zod</code> e envio com <code>EmailJS</code>.
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-4 opacity-75">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Seu Nome</label>
            <input
              type="text"
              disabled
              placeholder="Ex.: Mariana Silva"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Seu E-mail</label>
            <input
              type="email"
              disabled
              placeholder="mariana@empresa.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Mensagem</label>
            <textarea
              rows={4}
              disabled
              placeholder="Escreva sua mensagem aqui (mínimo 20 caracteres)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm cursor-not-allowed resize-none"
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Mensagem</span>
          </button>
        </form>
      </div>
    </div>
  )
}
