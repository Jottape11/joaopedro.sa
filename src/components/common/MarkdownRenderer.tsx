import React, { useState } from 'react'
import { Copy, Check, Terminal, ExternalLink, ChevronRight } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
  className?: string
  maxHeightClass?: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  maxHeightClass = 'max-h-[500px]',
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Parser leve de Markdown em blocos estruturados
  const parseBlocks = (markdown: string) => {
    const lines = markdown.split('\n')
    const blocks: React.ReactNode[] = []
    let inCodeBlock = false
    let codeLanguage = ''
    let codeBuffer: string[] = []
    let listBuffer: string[] = []
    let blockIndex = 0

    const flushList = () => {
      if (listBuffer.length > 0) {
        const items = [...listBuffer]
        listBuffer = []
        blocks.push(
          <ul key={`list-${blockIndex++}`} className="space-y-1.5 my-3 pl-2">
            {items.map((item, i) => {
              // Task list item: - [x] or - [ ]
              const isChecked = item.startsWith('[x] ') || item.startsWith('[X] ')
              const isUnchecked = item.startsWith('[ ] ')
              const text = isChecked || isUnchecked ? item.slice(4) : item

              return (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {isChecked ? (
                    <span className="w-4 h-4 rounded-xs bg-[#46D369] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  ) : isUnchecked ? (
                    <span className="w-4 h-4 rounded-xs border border-zinc-400 dark:border-zinc-600 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-1" />
                  )}
                  <span>{parseInline(text)}</span>
                </li>
              )
            })}
          </ul>,
        )
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Início ou fim de bloco de código ```
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          flushList()
          inCodeBlock = true
          codeLanguage = line.trim().replace(/^```/, '') || 'bash'
          codeBuffer = []
        } else {
          inCodeBlock = false
          const codeText = codeBuffer.join('\n')
          const currentIndex = blockIndex++
          blocks.push(
            <div
              key={`code-${currentIndex}`}
              className="my-3 rounded-lg overflow-hidden border border-zinc-300 dark:border-white/10 bg-zinc-900 text-zinc-100 shadow-md"
            >
              <div className="flex items-center justify-between px-3.5 py-2 bg-black/60 border-b border-white/10 text-xs">
                <span className="flex items-center gap-1.5 font-mono text-[#E50914] font-semibold text-[11px] uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{codeLanguage || 'CODE'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(codeText, currentIndex)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copiar código"
                >
                  {copiedIndex === currentIndex ? (
                    <>
                      <Check className="w-3 h-3 text-[#46D369]" />
                      <span className="text-[#46D369] font-medium">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-zinc-200 no-scrollbar selection:bg-[#E50914] selection:text-white">
                <code>{codeText}</code>
              </pre>
            </div>,
          )
          codeBuffer = []
        }
        continue
      }

      if (inCodeBlock) {
        codeBuffer.push(line)
        continue
      }

      // Headers (#, ##, ###)
      if (line.startsWith('# ')) {
        flushList()
        blocks.push(
          <h1
            key={`h1-${blockIndex++}`}
            className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-5 mb-2 pb-2 border-b border-zinc-200 dark:border-white/10 tracking-tight"
          >
            {parseInline(line.slice(2))}
          </h1>,
        )
        continue
      }
      if (line.startsWith('## ')) {
        flushList()
        blocks.push(
          <h2
            key={`h2-${blockIndex++}`}
            className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mt-4 mb-2 tracking-tight flex items-center gap-2"
          >
            <span className="w-1.5 h-4 rounded-full bg-[#E50914]" />
            <span>{parseInline(line.slice(3))}</span>
          </h2>,
        )
        continue
      }
      if (line.startsWith('### ')) {
        flushList()
        blocks.push(
          <h3
            key={`h3-${blockIndex++}`}
            className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 mt-3 mb-1 tracking-tight"
          >
            {parseInline(line.slice(4))}
          </h3>,
        )
        continue
      }

      // Blockquote (> )
      if (line.startsWith('> ')) {
        flushList()
        blocks.push(
          <div
            key={`quote-${blockIndex++}`}
            className="my-3 pl-3.5 py-2 border-l-3 border-[#E50914] bg-zinc-100/70 dark:bg-white/5 rounded-r-md text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic"
          >
            {parseInline(line.slice(2))}
          </div>,
        )
        continue
      }

      // List item (- or * or numbered)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        listBuffer.push(line.trim().slice(2))
        continue
      }

      // Linha vazia
      if (!line.trim()) {
        flushList()
        continue
      }

      // Linhas horizontais (---)
      if (line.trim() === '---' || line.trim() === '***') {
        flushList()
        blocks.push(<hr key={`hr-${blockIndex++}`} className="my-4 border-zinc-200 dark:border-white/10" />)
        continue
      }

      // Parágrafo regular
      flushList()
      blocks.push(
        <p
          key={`p-${blockIndex++}`}
          className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed my-2"
        >
          {parseInline(line)}
        </p>,
      )
    }

    flushList()
    return blocks
  }

  // Parse inline Markdown: bold, italic, inline code, links, images
  const parseInline = (text: string): React.ReactNode => {
    // Substituição segura por tokens
    const elements: React.ReactNode[] = []
    let lastIndex = 0

    // Combina todos os padrões
    const masterRegex = /(!?\[([^\]]*)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g
    let match: RegExpExecArray | null

    while ((match = masterRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index))
      }

      const fullMatch = match[0]

      if (fullMatch.startsWith('![')) {
        // Image / Badge
        const alt = match[2]
        const src = match[3]
        elements.push(
          <img
            key={match.index}
            src={src}
            alt={alt}
            className="inline-block h-5 max-w-full my-0.5 mr-1 align-middle rounded-xs"
            loading="lazy"
          />,
        )
      } else if (fullMatch.startsWith('[')) {
        // Link
        const linkText = match[2]
        const url = match[3]
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 text-[#E50914] hover:underline font-medium"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>,
        )
      } else if (fullMatch.startsWith('`')) {
        // Inline code
        const code = match[4]
        elements.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-zinc-200 dark:bg-white/10 text-red-600 dark:text-red-400 font-semibold"
          >
            {code}
          </code>,
        )
      } else if (fullMatch.startsWith('**')) {
        // Bold
        const boldText = match[5]
        elements.push(
          <strong key={match.index} className="font-bold text-zinc-900 dark:text-white">
            {boldText}
          </strong>,
        )
      }

      lastIndex = match.index + fullMatch.length
    }

    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex))
    }

    return elements.length > 0 ? elements : text
  }

  return (
    <div
      className={`overflow-y-auto no-scrollbar scroll-smooth pr-1 space-y-1 ${maxHeightClass} ${className}`}
    >
      {parseBlocks(content)}
    </div>
  )
}
