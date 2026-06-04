## Why

O dashboard atual exibe apenas cards estáticos com placeholder (Skeleton). O usuário precisa navegar até a página de Áreas para ver a estrutura da propriedade. Um card de visão geral no dashboard permite consulta rápida sem sair da tela principal, melhorando a experiência do dia a dia no sítio.

## What Changes

- Adiciona card "Estrutura da Propriedade" no dashboard com layout de 2 colunas (Talhões + Unidades)
- Card ocupa largura total (span 2) em desktop, largura total em mobile
- Coluna esquerda lista talhões ativos com zona colorida e área em ha
- Coluna direita exibe unidades do talhão selecionado com área em m²
- Clique no talhão seleciona e mostra suas unidades na coluna direita
- Botões de adicionar/editar/arquivar NÃO são exibidos (apenas consulta)
- Limite de 6 talhões visíveis com link "Ver todos" para página completa
- Card é responsivo: mobile vira lista vertical (talhões acima, unidades abaixo)
- Click no nome da propriedade ou "Ver todos" navega para /areas

## Capabilities

### New Capabilities
- `dashboard-areas-card`: Card de visão geral da estrutura da propriedade no dashboard, com visualização compacta de talhões e unidades sem botões de ação.

### Modified Capabilities
(nenhuma alteração em specs existentes)

## Impact

- Frontend: Novo componente `AreaOverviewCard.tsx` em `src/components/dashboard/`
- Dashboard: `src/app/(dashboard)/page.tsx` — substitui card "Áreas Ativas" estático pelo novo componente
- Dados: Reutiliza endpoints existentes (`/api/properties`, `/api/talhoes`, `/api/unidades`)
- Nenhum backend alterado
- Nenhum banco de dados alterado
