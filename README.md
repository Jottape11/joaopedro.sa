# 🎬 Portfólio Netflix Edition — Checkpoint 3 (CP3)
> **FIAP — Engenharia de Software | Web Development & AI Engineering**  
> **Autor:** João Pedro Sá ([@Jottape11](https://github.com/Jottape11))  
> **Deploy:** [Vercel Production](https://cp3-portfolio.vercel.app) *(ou branch main)*  
> **Roteiro do Vídeo Técnico (Remotion):** [`docs/roteiro_entrevista_remotion.md`](./docs/roteiro_entrevista_remotion.md)

---

## 🌟 Visão Geral do Projeto

Este projeto consiste em uma Single Page Application (SPA) de portfólio cinematográfica inspirada no ecossistema e nos tokens visuais do **Netflix Studio** (Hawkins Design System). A plataforma consome dados dinâmicos da API do GitHub, renderiza documentações técnicas com um visualizador de Markdown estilizado, oferece suporte bilíngue completo (Português/Inglês), alternância de tema claro/escuro e gerenciamento administrativo com **BaaS híbrido (Supabase + LocalStorage)**.

O desenvolvimento foi conduzido através de um **Harness de Engenharia de IA** (`.ai/harness.md`) com governança estrita de código, 0 avisos de linter e cobertura de testes automatizados com **Vitest**.

---

## 🚀 Arquitetura & Tecnologias Utilizadas

```
Frontend SPA (Vite + React 19 + TypeScript)
├── UI & Estilização: Tailwind CSS v4 + Lucide React + Netflix Theme Tokens
├── Roteamento: React Router v7 com proteção de rotas (PrivateRoute)
├── Camada de Cache & Dados: TanStack Query v5 (staleTime 10min)
├── Formulários & Validação: React Hook Form + Zod
├── Internacionalização (i18n): LanguageContext (Português / English)
├── Preferências: ThemeContext (Modo Claro / Modo Escuro)
├── Backend as a Service (BaaS): Supabase PostgreSQL com RLS + Fallback Local
├── Governança & Linter: Oxlint (Rust-based)
└── Testes Automatizados: Vitest + Testing Library (19 testes unitários/integração)
```

---

## 📋 Conformidade com os 12 Requisitos do CP3 (FIAP)

| # | Requisito | Status | Implementação |
|---|-----------|--------|---------------|
| **1** | Roteamento com React Router | ✅ Concluído | Rotas para `/`, `/projetos`, `/projeto/:id`, `/contato`, `/login`, `/dashboard` e `*` (404 Not Found). |
| **2** | Integração com API REST e Estados de Interface | ✅ Concluído | Consumo da API do GitHub (`/users/Jottape11/repos`) com skeletons, shimmer, empty states e retry. |
| **3** | Gerenciamento de Estado com TanStack Query / Context | ✅ Concluído | TanStack Query para repositórios; Context API para Tema, Idioma e Autenticação. |
| **4** | Formulário com Validação Rigorosa e Prevenção de Duplicatas | ✅ Concluído | `react-hook-form` + `zod` com contador dinâmico de 20 caracteres mínimos e bloqueio de cliques duplos. |
| **5** | Autenticação e Dashboard Administrativo | ✅ Concluído | Rota protegida `/dashboard` com gestão de mensagens de contato e curadoria do Billboard Top 6. |
| **6** | Preferências do Visitante (Tema e Idioma) | ✅ Concluído | Alternância entre tema claro/escuro e idiomas Português/Inglês com persistência no `localStorage`. |
| **7** | Design System Responsivo e Acessível | ✅ Concluído | Interface fluida adaptada para smartphones, tablets e desktops (Hawkins Design System da Netflix). |
| **8** | Otimização de Performance e Bundle | ✅ Concluído | Divisão em chunks manuais (`supabase`, `icons`), lazy loading e remoção de libs pesadas (bundle vendor enxuto). |
| **9** | Testes Automatizados | ✅ Concluído | 19 testes automatizados com **Vitest** cobrindo schemas Zod, i18n, tema, serviços e Markdown. |
| **10** | Deploy Contínuo e Vídeo de Demonstração | ✅ Concluído | Configuração `vercel.json` e roteiro dinâmico estilo entrevista de emprego em [`docs/roteiro_entrevista_remotion.md`](./docs/roteiro_entrevista_remotion.md). |
| **11** | Controle de Versão e Git | ✅ Concluído | Padrão Conventional Commits (`feat:`, `fix:`, `docs:`) e branches estruturadas. |
| **12** | Governança de Código com Linter | ✅ Concluído | `oxlint` executado com **0 warnings e 0 errors** em mais de 50 arquivos. |

---

## 🎯 Principais Destaques do Produto

### 1. Billboard Hero com Rotação Automática (5s)
- Carrossel de títulos em destaque na Home com temporizador automático a cada 5 segundos.
- Controles manuais para avançar/retroceder e botões de ação ("Explorar Projeto" e "Mais Informações").

### 2. Trilhos Cinematográficos (Lolomo Rails) & Top 10
- Trilho **Top 10 Projetos no Brasil Hoje** com numerais vazados estilizados via CSS `text-stroke`.
- Trilhos temáticos: *Populares no Studio*, *Séries de Back-End & Python* e *Front-End & UI Engineering*.

### 3. Fotografia Real de Alta Resolução (Real-Life Key Art)
- Todas as imagens de banners e cards utilizam **fotografias reais** de estúdios, setups, centrais de dados e auditórios (sem desenhos/vetores e sem textos embutidos nas imagens).

### 4. Visualizador Profissional de Markdown (`MarkdownRenderer.tsx`)
- Renderização sintática rica do `README.md` oficial do GitHub de cada projeto.
- Blocos de código com identificação da linguagem e botão de cópia com um clique.
- Cabeçalhos estilizados com acentos vermelhos, checklists interativos e citações formatadas.

### 5. Central de Contato & Produção (`/contato`)
- Validação em tempo real com Zod (nome mín. 3, e-mail válido, assunto mín. 4, mensagem mín. 20 caracteres).
- Cards interativos com links diretos para GitHub (`@Jottape11`), LinkedIn, E-mail direto e localização FIAP.

### 6. Dashboard do Studio (`/dashboard`)
- 4 cartões de telemetria (Títulos no Catálogo, Destaques no Billboard, Mensagens Recebidas, Mensagens Pendentes).
- Caixa de mensagens com filtros (*Todas*, *Pendentes*, *Respondidas*), alternância de status e exclusão.
- Curadoria em tempo real dos projetos em destaque no Billboard da Home (máximo de 6 projetos).

### 7. Seção de Boas-Vindas & Sobre Mim (`/sobre` e Fluxo de Entrada)
- Exibida com animação imediatamente após a escolha do perfil em *Quem está assistindo?* e também acessível a qualquer momento pelo menu de navegação do Header.
- Apresentação personalizada de **João Pedro Sá** (formação FIAP 1ES 2026, foco Full-Stack com React 19, TypeScript, Python FastAPI e IA generativa).
- Mensagem dedicada conforme o perfil selecionado (Recrutador, Engenharia, Avaliador FIAP, Admin e Visitante) e botão direto para continuar para o catálogo.

### 8. Identidade Visual, Favicon & Header sem Artefatos de Scroll
- Favicon personalizado em SVG com o monograma "JP" em estilo fita 3D da Netflix.
- Título da aba padronizado para `João Pedro Sá | Portfólio`.
- Header translúcido com sombra orgânica e sem bordas inferiores que pudessem criar linhas brancas indesejadas no scroll.


---

## 🧪 Suíte de Testes Automatizados (Vitest)

O projeto possui **19 testes automatizados** distribuídos em 6 suítes:

```bash
# Executar a suíte de testes
npm test

# Executar os testes em modo watch
npm run test:watch
```

### Arquivos de Teste:
1. `src/test/contactSchema.test.ts`: Validações de esquema Zod para formulários (campos obrigatórios, limites de tamanho e regex de e-mail).
2. `src/test/contactService.test.ts`: Persistência, recuperação, alternância de status e deleção de mensagens.
3. `src/test/languageContext.test.tsx`: Inicialização em Português, alternância para Inglês e fornecimento de traduções i18n.
4. `src/test/themeContext.test.tsx`: Alternância entre tema claro e escuro, manipulação da classe `.dark` e persistência no storage.
5. `src/test/projectImages.test.ts`: Resolução de fotografias de alta resolução por slug e stack tecnológica.
6. `src/test/markdownRenderer.test.tsx`: Validação da renderização de títulos, blocos de código com cópia, listas e blockquotes.

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 20+)
- npm ou pnpm

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone https://github.com/Jottape11/joaopedro.sa.git
cd joaopedro.sa

# 2. Instalar as dependências
npm install

# 3. Executar o linter (Oxlint)
npm run lint

# 4. Executar os testes automatizados (Vitest)
npm test

# 5. Iniciar o servidor de desenvolvimento
npm run dev

# 6. Gerar o build de produção
npm run build
```

---

## 📹 Vídeo de Apresentação (Remotion.dev)

O roteiro do vídeo técnico foi concebido como uma **Entrevista de Emprego Técnica** entre um Staff Engineer entrevistador e o candidato João Pedro, com edição dinâmica através do [Remotion.dev](https://www.remotion.dev/):

- **Estrutura:** Split-screen de videochamada, foco no entrevistador, close no candidato e screencast do portfólio em Picture-in-Picture.
- **Duração:** 07 minutos e 45 segundos (respeitando o teto de 8 minutos da FIAP).
- **Roteiro Completo:** Acesse [`docs/roteiro_entrevista_remotion.md`](./docs/roteiro_entrevista_remotion.md).

---

## 🤖 Governança de IA (Harness Engineering)

Este projeto utilizou Inteligência Artificial como parceira de engenharia governada através dos arquivos:
- [`.ai/harness.md`](./.ai/harness.md): Ferramentas, modelo de IA, papéis, regras de arquitetura e convenção de pastas.
- [`.ai/rules.md`](./.ai/rules.md): Diretrizes de qualidade, proibição de tipos `any` e regras de commits.

---

## 📄 Licença & Autoria

Desenvolvido por **João Pedro Sá** como parte da avaliação formal do **Checkpoint 3 (CP3)** na **FIAP (2026)**.
Distribuído sob a licença MIT.
