# 🎬 Roteiro de Apresentação em Formato de Entrevista Técnica (Remotion.dev)
## Checkpoint 3 — Web Development & AI Engineering (FIAP)
**Candidato / Desenvolvedor:** João Pedro Sá  
**Duração Alvo:** 07 minutos e 45 segundos (Limite estrito FIAP: máx. 8 minutos)  
**Motor de Edição:** [Remotion.dev](https://www.remotion.dev/) (Vídeo programático em React, TypeScript e Tailwind)

---

## 📐 Conceito Visual & Dinâmica de Câmeras no Remotion

O vídeo simula uma **entrevista técnica de alto nível** para uma vaga de Engenharia de Software no Netflix Studio / Big Tech. A edição é automatizada via Remotion, alternando dinamicamente entre múltiplos layouts:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. [SPLIT-SCREEN]: Chamada de vídeo com grid duplo (Interviewer | João Pedro)│
│ 2. [INTERVIEWER-CAM]: Foco no personagem 3D/Avatar fazendo a pergunta       │
│ 3. [CANDIDATE-CAM]: Close no João Pedro explicando a decisão técnica        │
│ 4. [SCREENCAST-PIP]: Gravação da tela do portfólio com João Pedro no canto  │
│ 5. [CODE-INSPECTOR]: Destaque em trecho de código-fonte no VS Code          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Elementos Visuais do Remotion:
- **Lower Thirds Cinematográficos:** Nome, cargo e tecnologia atual em vermelho Netflix (`#E50914`).
- **Pills de Status:** `● REC 1080p60`, indicador de microfone ativo e tempo de chamada.
- **Transições Suaves:** `spring()` e `interpolate()` para zooms e trocas de câmera sem cortes secos.
- **Audio Ducker:** Trilha sonora ambiente sutil (lo-fi tech beat) que reduz automaticamente quando alguém fala.

---

## 🎭 Personagens

- **Alex (Entrevistador / Staff Engineer no Studio):** Avatar / personagem renderizado em vídeo, voz técnica, serena, questionadora e profissional.
- **João Pedro (Candidato / Desenvolvedor Front-End & IA):** Fala natural, firme, didática e conversacional, transmitindo domínio profundo de arquitetura, trade-offs e qualidade de software.

---

## ⏱️ Roteiro Decupado Minuto a Minuto

---

### [00:00 - 00:50] Bloco 1: Abertura da Chamada & Contexto do Projeto
**Câmera Remotion:** `SplitScreen` (00:00 - 00:20) ➔ `InterviewerCam` (00:20 - 00:35) ➔ `CandidateCam` (00:35 - 00:50).  
**Lower Third:** *Alex Morgan — Staff Software Engineer @ Netflix Tech* | *João Pedro Sá — Software Engineering Student @ FIAP*.

> **Alex (Entrevistador):**  
> *"Olá, João! Tudo bem? Prazer falar com você. Nós analisamos a sua submissão para o Checkpoint 3 e chamou muito a atenção da nossa equipe de engenharia o fato de você ter construído o seu portfólio sob a ótica de um produto real: o ecossistema do Netflix Studio. Pra gente começar: qual foi a sua tese arquitetural e por que você escolheu estruturar a aplicação dessa forma?"*

> **João Pedro:**  
> *"Fala, Alex! O prazer é todo meu. Quando recebi os requisitos da FIAP, percebi que a maioria dos portfólios são estáticos e parecem cartões de visita genéricos. Minha meta foi transformar esse projeto em uma plataforma de streaming de engenharia. Ou seja: os títulos do catálogo são os meus projetos reais no GitHub, a interface segue os tokens do Hawkins Design System da Netflix, e toda a arquitetura foi pensada como uma SPA de alta performance em React 19, TypeScript e Vite."*

---

### [00:50 - 02:10] Bloco 2: Catálogo Dinâmico & Integração com GitHub API
**Câmera Remotion:** `ScreencastPiP` (Navegação na Home) ➔ `CodeInspector` (`useGitHub.ts`).  
**Overlays na tela:** Gráfico de consumo de API com cache do TanStack Query.

> **Alex (Entrevistador):**  
> *"Muito bom. E falando em catálogo: APIs públicas como a do GitHub têm limitações rígidas de requisições por hora e problemas eventuais de latência. Como você garantiu resiliência e velocidade para quem está navegando na Home e na página de Projetos?"*

> **João Pedro:**  
> *(Screencast mostra a Home rodando o Billboard Hero e os trilhos Lolomo)*  
> *"Excelente ponto, Alex. Eu utilizei o TanStack Query para gerenciar toda a camada de estado assíncrono. Configurei um `staleTime` de 10 minutos e `gcTime` inteligente. Isso significa que, quando o visitante entra no site, os repositórios são consultados uma única vez, cacheados na memória e normalizados.  
> 
> Além disso, se a rede do usuário oscilar ou a API do GitHub retornar erro temporário, nossa UI não quebra: entra em ação um fallback gracioso com skeletons com shimmer effect, mensagens de retry amigáveis e um estado vazio estruturado. E no carrossel Billboard hero, aplicamos um timer automático de 5 segundos que rotaciona os destaques sem nenhum repaint pesado no DOM."*

---

### [02:10 - 03:25] Bloco 3: Experiência Visual, Acessibilidade & Modo Claro/Escuro
**Câmera Remotion:** `ScreencastPiP` (Alternando tema Dark/Light e idioma PT/EN) ➔ `CandidateCam`.  
**Overlays na tela:** Tag de acessibilidade WCAG AA, paleta de cores CSS `:root` vs `.dark`.

> **Alex (Entrevistador):**  
> *"Reparei que a interface tem uma transição muito limpa entre tema claro e escuro, além de suporte bilíngue completo. Como você lidou com contraste e legibilidade, já que a marca da Netflix é predominantemente escura?"*

> **João Pedro:**  
> *"Esse foi um dos desafios mais interessantes. No modo escuro original da Netflix, o fundo é preto profundo (`#141414`). Para o modo claro, não bastava inverter as cores; calibrei tokens semânticos no CSS com variáveis no `:root`. No ranking dos Top 10, por exemplo, implementei números vazados com `text-stroke` customizado que se adaptam automaticamente para cinza metálico no claro e grafite fosco no escuro.  
> 
> E quanto ao idioma, desenvolvemos um `LanguageContext` em React que gerencia as traduções em memória com persistência no `localStorage`. Trocar de Português para Inglês atualiza Navbar, Hero, Modal, Formulário e Dashboard instantaneamente, com zero layout shifts."*

---

### [03:25 - 04:40] Bloco 4: Documentação Técnica & O Visualizador de Markdown
**Câmera Remotion:** `ScreencastPiP` (Abrindo o modal Quick-View de um projeto e scrollando o README) ➔ `CodeInspector` (`MarkdownRenderer.tsx`).

> **Alex (Entrevistador):**  
> *"Eu notei que ao clicar em 'Mais Informações' em qualquer título, abre um modal de detalhes e a documentação do repositório aparece incrivelmente formatada. Você não usou um leitor cru de texto. O que você construiu ali?"*

> **João Pedro:**  
> *"Exato! A maioria das pessoas faz um 'copiar e colar' de texto simples com quebra de linha. Para o padrão Studio, criei um componente proprietário chamado `MarkdownRenderer`.  
> 
> Ele faz a análise sintática do Markdown retornado pela API do GitHub e renderiza cabeçalhos com indicadores vermelhos da Netflix, listas de tarefas com checkboxes nativos, citações em bloco com borda vermelha e blocos de código com identificação da linguagem e um botão interativo de 'Copiar Código' com feedback visual. Isso transforma a leitura técnica de um projeto em uma experiência agradável tanto para um recrutador de RH quanto para um arquiteto de software."*

---

### [04:40 - 05:55] Bloco 5: BaaS Híbrido, Central de Contato & Dashboard do Studio
**Câmera Remotion:** `ScreencastPiP` (Preenchendo contato e mostrando o Dashboard administrativo) ➔ `CandidateCam`.  
**Overlays na tela:** Diagrama Supabase PostgreSQL com Row-Level Security (RLS) + Fallback local.

> **Alex (Entrevistador):**  
> *"Falando em recrutadores: e a parte de backend? Como você estruturou a recepção das mensagens de contato e o controle administrativo do que aparece no ar?"*

> **João Pedro:**  
> *"Na página de Contato, usamos `react-hook-form` integrado ao `zod` para validação rigorosa no cliente — exigindo nome com mínimo de 3 caracteres, e-mail com regex RFC, e mensagem detalhada com no mínimo 20 caracteres com contador dinâmico. O botão bloqueia múltiplos envios para evitar spam.  
> 
> No backend, adotei uma estratégia de **BaaS Híbrido**: a aplicação se conecta ao Supabase via PostgreSQL com RLS para autenticação e banco em nuvem, mas possui uma camada de fallback automático para LocalStorage. Se as variáveis de ambiente da nuvem não estiverem configuradas, o sistema continua 100% funcional. E no `/dashboard`, que é uma rota protegida, o dono do portfólio tem a central de curadoria: ele pode marcar e responder mensagens, e clicar na estrela dos projetos para definir exatamente quais 6 títulos sobem para o carrossel do Billboard da Home."*

---

### [05:55 - 06:55] Bloco 6: Qualidade, Testes Automatizados & CI/CD
**Câmera Remotion:** `SplitScreen` (Terminal executando `oxlint` e `vitest`) ➔ `CodeInspector` (`src/test/`).

> **Alex (Entrevistador):**  
> *"Como vocês garantiram a confiabilidade do código antes de colocar em produção na Vercel? Qual foi a abordagem de testes?"*

> **João Pedro:**  
> *"Segurança e confiabilidade foram requisitos de primeira linha. No linter, optamos pelo `oxlint`, que roda em milissegundos através de Rust e garante zero avisos ou erros em mais de 50 arquivos.  
> 
> Na camada de testes, implementamos uma suíte completa com **Vitest** e **Testing Library**, totalizando 19 testes unitários e de integração cobrindo os esquemas do Zod, os métodos do serviço de contato, o gerenciamento de tema, a persistência de idioma e o parser do Markdown. Além disso, o deploy é automatizado na Vercel via GitHub, com rewrites de SPA configurados no `vercel.json`."*

---

### [06:55 - 07:45] Bloco 7: Harness de Engenharia de IA & Conclusão
**Câmera Remotion:** `CandidateCam` com Lower Third de encerramento ➔ `SplitScreen` final com Alex e João Pedro ➔ `OutroScreen` com links do GitHub e LinkedIn.

> **Alex (Entrevistador):**  
> *"Para finalizar, João: o edital da FIAP enfatiza a governança de Inteligência Artificial. Como você utilizou o Harness de IA durante esse processo?"*

> **João Pedro:**  
> *"A IA não foi usada como um mero gerador aleatório de código, mas sim como um **Pair Programmer governado**. Estruturamos os arquivos `.ai/harness.md` e `.ai/rules.md` com diretrizes claras: tipagem estrita no TypeScript sem nenhum `any`, componentes pequenos de responsabilidade única e commits semânticos no padrão Conventional Commits. Dessa forma, a IA operou dentro de trilhos pré-definidos de arquitetura, acelerando a entrega com máxima previsibilidade e qualidade.  
> 
> Muito obrigado pela oportunidade, Alex! O projeto completo está no ar na Vercel e o código aberto no meu GitHub."*

> **Alex (Entrevistador):**  
> *"Excelente trabalho, João! Demonstração impecável de domínio técnico e visão de produto. Parabéns!"*

---

## 🛠️ Arquitetura de Implementação no Remotion (`remotion.dev`)

Para quem for compilar ou inspecionar o vídeo com o Remotion, a composição foi estruturada com a seguinte árvore de componentes React:

```tsx
// Exemplo de Composição do Remotion (src/remotion/InterviewVideo.tsx)
import { Composition } from 'remotion'
import { InterviewComposition } from './InterviewComposition'

export const RemotionRoot = () => {
  return (
    <Composition
      id="TechnicalInterviewCP3"
      component={InterviewComposition}
      durationInFrames={30 * 465} // 7m45s a 30 FPS = 13.950 frames
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        candidateName: 'João Pedro Sá',
        interviewerName: 'Alex Morgan',
        projectTitle: 'Netflix Studio Edition — CP3 FIAP',
      }}
    />
  )
}
```

### Comportamento dos Componentes do Remotion:
1. `<SplitScreenCall />`: Renderiza o grid de conferência com moldura de webcam e visualizador de áudio sincronizado.
2. `<ScreenRecordingTrack />`: Exibe a captura em 1080p da navegação no portfólio.
3. `<CodeHighlightTrack />`: Anima trechos do código-fonte com tipografia JetBrains Mono.
4. `<NetflixLowerThird />`: Componente animado com CSS e `spring()` que surge lateralmente com o selo do Studio.

