# 🤖 Harness de Engenharia de IA - CP3 WebDev
> **Governança, Diretrizes e Workflow de Desenvolvimento Orientado a IA**  
> **Projeto:** CP3 - Portfolio, Stack & Harness Engineering (FIAP)  
> **Autor:** João Pedro Sá

---

## 1. Ferramenta & Modelo Utilizados

* **Ambiente de Engenharia:** Google Antigravity Agentic IDE.
* **Modelo Principal:** Gemini 3.8 Flash (High Reasoning) / Gemini 3.8 Pro.
* **Justificativa da Escolha:**
  - Janela de contexto massiva que permite correlacionar simultaneamente o edital oficial do Checkpoint 3, a árvore completa do código TypeScript e o esquema de banco sem perda de alinhamento.
  - Baixa latência e rigor arquitetural para refatoração e otimização de bundle em React 19.
  - Suporte nativo a execução autônoma de linters (`oxlint`), suítes de testes (`vitest`) e comandos de compilação sem intervenção manual repetitiva.
  - Excelente custo-benefício com plano educacional.

---

## 2. Padrões de Arquitetura & Código

O desenvolvimento seguiu rigorosamente a seguinte estrutura em `src/`:

```
src/
├── assets/          # SVGs, ícones e recursos estáticos
├── components/      # Componentes modulares com responsabilidade única
│   ├── common/      # ThemeToggle, LanguagePicker, MarkdownRenderer, EmptyState, ErrorMessage
│   ├── home/        # BillboardHero (Carrossel 5s), LolomoRail (Trilhos e Top 10)
│   ├── layout/      # Navbar (com avatar e dropdowns), Footer (4 colunas Netflix), RootLayout
│   └── projects/    # ProjectCard, ProjectQuickViewModal (Modal com leitor de README)
├── pages/           # Visualizações de rotas SPA (Home, Projects, ProjectDetails, Contact, Login, Dashboard, NotFound)
├── hooks/           # Custom hooks encapsulando lógica (useGitHub, useFeaturedProjects, useTheme, useLanguage, useAuth)
├── services/        # Clientes desacoplados (github, projectImages, contact, supabase)
├── context/         # Provedores de estado global (ThemeContext, LanguageContext, AuthContext)
├── types/           # Interfaces TypeScript estritas (github, contact, project, theme, language, auth)
└── test/            # Suíte de 19 testes automatizados com Vitest e Testing Library
```

### Regras de Governança Aplicadas pela IA:
1. **Tipagem Estrita:** Proibição de tipos `any`. Todos os retornos e props possuem tipagem estrita via interfaces TypeScript.
2. **Separação de Camadas:** Zero chamadas `fetch` em componentes de apresentação; toda requisição é delegada a `services/` ou gerenciada por `hooks/` com TanStack Query.
3. **Resiliência e Fallbacks:** Nenhuma falha de rede da API do GitHub ou do Supabase pode quebrar a tela do usuário. Tratamento com skeletons, empty states e fallback para LocalStorage.
4. **Sem Alucinações de Conteúdo:** Todas as fotos utilizadas são fotografias reais autenticadas (Unsplash Key Art) sem textos embutidos nem caricaturas.

---

## 3. Qualidade Contínua & Testes Automatizados

- **Linter em Rust:** `oxlint` configurado para execução instantânea, mantendo **0 warnings e 0 errors** em todos os ciclos de desenvolvimento.
- **Suíte de Testes com Vitest:**
  - 19 testes automatizados cobrindo esquemas de formulário (Zod), serviços de contato, alternância de tema, internacionalização (i18n), seletor de pôsteres e o parser de Markdown.
  - Execução via `npm test` integrada ao pipeline.

---

## 4. Pipeline de Edição de Vídeo com Remotion.dev

Para a gravação e entrega do vídeo de apresentação (Requisito 10):
- **Abordagem:** Formato de **Entrevista Técnica Simulada** entre um Staff Engineer entrevistador e o candidato João Pedro.
- **Edição Programática:** Composição em React através do [Remotion.dev](https://www.remotion.dev/), combinando layouts dinâmicos:
  1. *Split-Screen:* Grade de videochamada sincronizada com indicadores de áudio.
  2. *Interviewer-Cam:* Foco no personagem/avatar que conduz as perguntas do edital.
  3. *Candidate-Cam:* Close no candidato explicando os trade-offs de engenharia com lower thirds.
  4. *Screencast-PiP:* Gravação fluida da interface do portfólio rodando em tela cheia com a webcam no canto.
  5. *Code-Inspector:* Destaque sintático nos arquivos-chave do repositório.
- **Roteiro Cronometrado:** Documentado integralmente em [`docs/roteiro_entrevista_remotion.md`](../docs/roteiro_entrevista_remotion.md) para garantir duração precisa de até 07m45s.
