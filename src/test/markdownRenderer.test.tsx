import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer'

describe('Visualizador de Markdown Estilizado (MarkdownRenderer)', () => {
  it('deve renderizar títulos formatados', () => {
    const markdown = `# Arquitetura do Sistema\n\n## Componentes Principais\n\n### Detalhes Técnicos`
    render(<MarkdownRenderer content={markdown} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Arquitetura do Sistema')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Componentes Principais')
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Detalhes Técnicos')
  })

  it('deve renderizar blocos de código com linguagem e botão de cópia', () => {
    const markdown = '```typescript\nconst message: string = "Hello Studio";\nconsole.log(message);\n```'
    render(<MarkdownRenderer content={markdown} />)

    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText(/const message: string/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copiar/i })).toBeInTheDocument()
  })

  it('deve renderizar citações em bloco (blockquotes)', () => {
    const markdown = '> Este projeto adota os padrões arquiteturais da Netflix.'
    render(<MarkdownRenderer content={markdown} />)

    const quote = screen.getByText(/Este projeto adota os padrões arquiteturais da Netflix/i)
    expect(quote).toBeInTheDocument()
  })

  it('deve renderizar listas e itens de tarefa', () => {
    const markdown = `- Item 1\n- Item 2\n- [x] Tarefa Concluída\n- [ ] Tarefa Pendente`
    render(<MarkdownRenderer content={markdown} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText(/Tarefa Concluída/)).toBeInTheDocument()
  })
})
