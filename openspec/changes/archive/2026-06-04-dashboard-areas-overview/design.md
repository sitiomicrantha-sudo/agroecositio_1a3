## Context

O dashboard atual (`src/app/(dashboard)/page.tsx`) exibe 4 cards estáticos com placeholders (Skeleton). A página de Áreas (`/areas`) tem um layout de 2 colunas completo com TreeView, formulários e painel de detalhes.

O objetivo é criar um card compacto no dashboard que resuma a estrutura da propriedade, permitindo consulta rápida sem navegar para a página de áreas.

## Goals / Non-Goals

**Goals:**
- Card de visão geral da estrutura da propriedade no dashboard
- Layout de 2 colunas: Talhões (esquerda) + Unidades (direita)
- Seleção de talhão para ver suas unidades
- Responsivo: mobile vira lista vertical
- Sem botões de ação (apenas consulta)
- Limite de 6 talhões visíveis com "Ver todos"

**Non-Goals:**
- Edição ou criação de áreas no dashboard
- Formulários de qualquer tipo
- Exibição de detalhes completos (painel de detalhes)
- Estado de cultivo (futuro)
- Filtros ou ordenação

## Decisions

### Decisão 1: Componente isolado

**Escolha:** Criar `AreaOverviewCard.tsx` em `src/components/dashboard/`

**Alternativas consideradas:**
- Reutilizar TreeView da página de áreas: Requer muitas props opcionais para desabilitar botões
- Criar componente novo e simples: Mais controle, menos complexidade

**Razão:** Componente novo permite controle total sobre o que é exibido sem sobrecarregar o TreeView existente. O TreeView tem muitas props de interação que não são necessárias no dashboard.

### Decisão 2: Span 2 no grid

**Escolha:** Card ocupa 2 colunas no grid do dashboard (largura total)

**Layout desktop:**
```
┌───────────────┐ ┌───────────────┐
│    Clima      │ │  Atividades   │
└───────────────┘ └───────────────┘
┌─────────────────────────────────┐
│    Estrutura da Propriedade     │
│  ┌─────────────┬──────────────┐ │
│  │  Talhões    │  Unidades    │ │
│  └─────────────┴──────────────┘ │
└─────────────────────────────────┘
┌───────────────┐ ┌───────────────┐
│  Produção     │ │   (futuro)    │
└───────────────┘ └───────────────┘
```

**Razão:** O card de áreas é mais informativo que os outros cards. Ocupar 2 colunas permite mostrar as duas colunas (Talhões + Unidades) sem ficar apertado.

### Decisão 3: Dados via endpoints existentes

**Escolha:** Buscar dados de `/api/properties`, `/api/talhoes`, `/api/unidades`

**Alternativas consideradas:**
- Criar endpoint dedicado /api/dashboard/areas: Mais complexo, sem necessidade agora
- Reutilizar endpoints existentes: Mais simples, dados já disponíveis

**Razão:** Para o volume de dados atual (1 propriedade, 8 talhões, 7 unidades), os endpoints existentes são suficientes. Não há necessidade de otimização.

### Decisão 4: Seleção de talhão via state local

**Escolha:** state local `selectedTalhaoId` controla qual talhão mostra unidades

**Razão:** Simples, sem necessidade de URL state ou contexto global. O card é auto-contido.

### Decisão 5: Limite de 6 talhões

**Escolha:** Mostrar no máximo 6 talhões, com link "Ver todos" se houver mais

**Razão:** Evita card excessivamente grande. 6 talhões é suficiente para visão geral. Links "Ver todos" navegam para /areas.

## Risks / Trade-offs

### Risco 1: Performance com muitas requisições
**Risco:** Buscar unidades para cada talhão gera N+1 requests
**Mitigação:** Buscar todos os talhões primeiro, depois buscar unidades do talhão selecionado apenas

### Risco 2: Card pode ficar pesado no mobile
**Risco:** Duas colunas no mobile podem ficar apertadas
**Mitigação:** No mobile, empilhar colunas (talhões acima, unidades abaixo)

## Migration Plan

Sem migração necessária. Mudança puramente de frontend.

## Open Questions

- Deve haver animação de transição ao selecionar talhão?
- O card deve ter estado de loading próprio ou usar o skeleton do dashboard?
