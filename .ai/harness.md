# 🤖 Harness de Engenharia de IA - CP3 WebDev

Este documento descreve a governança, as ferramentas, os modelos e as regras estabelecidas para guiar os agentes de Inteligência Artificial durante o desenvolvimento deste portfólio.

---

## 1. Ferramenta & Modelo Utilizados

* **Ambiente / Ferramenta:** Google Antigravity Agentic IDE.
* **Modelo Principal:** Gemini 3.8 Flash (High Reasoning) / Gemini 3.8 Pro.
* **Justificativa da Escolha:**
  - Janela de contexto massiva que permite ler simultaneamente o edital do projeto (Notion), os slides da disciplina da FIAP e o código-fonte sem perda de memória.
  - Baixa latência e alta precisão para refatoração de código TypeScript/React.
  - Capacidade nativa de pair-programming com execução de comandos, testes e linting via terminal integrado.
  - Além de ter o plano de estudante para acesso da ferramenta por um custo extremamente baixo em comparação as outras IAs.

---

## 2. Padrões de Arquitetura & Código

Qualquer código gerado ou modificado pela IA DEVE seguir rigorosamente esta estrutura de pastas em `src/`:

```
src/
├── assets/          # Imagens, SVGs e arquivos estáticos otimizados
├── components/      # Componentes visuais pequenos e reaproveitáveis (Single Responsibility)
│   ├── common/      # Botões, Badges, Modais, Toasts, Skeletons
│   ├── layout/      # Navbar, Footer, Container, Sidebar
│   └── projects/    # Cards de projeto, filtros, estados (loading/error/empty)
├── pages/           # Componentes de visualização de página (conectados às rotas)
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetails.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── hooks/           # Custom hooks encapsulando lógica de negócio (prefixo use...)
├── services/        # Clientes de API desacoplados (GitHub API, Supabase, Email)
├── context/         # Provedores de contexto React (ThemeContext, AuthContext)
├── types/           # Interfaces e tipos estritos do TypeScript
└── styles/          # Configurações globais de CSS / Tailwind
```

### Regras de Nomenclatura & Boas Práticas:
- **Componentes:** Sempre em `PascalCase` (ex.: `ProjectCard.tsx`, `Navbar.tsx`).
- **Hooks Customizados:** Sempre iniciando com `use` em `camelCase` (ex.: `useTheme.ts`, `useGitHubProjects.ts`).
- **Funções e Variáveis:** `camelCase`.
- **Tipagem Estrita:** Proibido o uso de `any`. Sempre definir interfaces ou types em `src/types/`.
- **Separação de Camadas:** Nunca fazer chamadas `fetch` diretas dentro de componentes visuais; isolar sempre em `services/` ou `hooks/`.

---

## 3. Política de Versionamento & Git

A IA e o desenvolvedor devem seguir a convenção de **Conventional Commits**:

- `feat:` Nova funcionalidade para o usuário (ex.: `feat: adiciona card de projeto com skeleton de loading`).
- `fix:` Correção de um bug (ex.: `fix: corrige redirecionamento de rota 404`).
- `docs:` Alterações em documentação (ex.: `docs: atualiza README com instrucoes de deploy`).
- `refactor:` Refatoração de código sem alterar comportamento externo.
- `chore:` Atualizações de configuração, dependências e build.

### Estratégia de Branches:
- `main`: Branch de produção conectada ao deploy contínuo da Vercel.
- `feature/<nome-da-funcionalidade>`: Branches individuais para desenvolvimento de cada requisito (ex.: `feature/theme-switcher`, `feature/github-integration`, `feature/dashboard`).
- `test/<nome>`: Branches dedicadas à cobertura de testes automatizados.

