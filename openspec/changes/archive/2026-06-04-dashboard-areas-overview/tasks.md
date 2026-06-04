## 1. Componente Base

- [x] 1.1 Criar diretório `src/components/dashboard/`
- [x] 1.2 Criar componente `AreaOverviewCard.tsx` com estrutura básica (Card com 2 colunas)
- [x] 1.3 Definir interface `AreaOverviewCardProps` (data, onSelectTalhao, etc.)

## 2. Dados

- [x] 2.1 Implementar fetch de propriedade via `/api/properties`
- [x] 2.2 Implementar fetch de talhões via `/api/talhoes?propertyId=...`
- [x] 2.3 Implementar fetch de unidades via `/api/unidades?talhaoId=...` (apenas quando talhão selecionado)
- [x] 2.4 Adicionar state local `selectedTalhaoId` e `talhoes`, `unidades`, `property`

## 3. Coluna de Talhões

- [x] 3.1 Renderizar lista de talhões ativos (máximo 6)
- [x] 3.2 Exibir dot colorido da zona, nome e área em ha para cada talhão
- [x] 3.3 Adicionar indicador visual de seleção (fundo verde-50, borda esquerda verde)
- [x] 3.4 Adicionar link "Ver todos os talhões →" quando mais de 6 talhões

## 4. Coluna de Unidades

- [x] 4.1 Exibir "Selecione um talhão" quando nenhum selecionado
- [x] 4.2 Renderizar lista de unidades do talhão selecionado
- [x] 4.3 Exibir nome, tipo e área em m² para cada unidade

## 5. Layout Responsivo

- [x] 5.1 Desktop: card span-2 no grid, interno 2 colunas lado a lado
- [x] 5.2 Mobile: empilhar colunas (talhões acima, unidades abaixo)
- [x] 5.3 Ajustar paddings e tamanhos de fonte para mobile

## 6. Interação

- [x] 6.1 Implementar handler de clique no talhão para selecionar
- [x] 6.2 Implementar navegação ao clicar no nome da propriedade → /areas
- [x] 6.3 Implementar navegação ao clicar em "Ver todos" → /areas

## 7. Dashboard

- [x] 7.1 Substituir card "Áreas Ativas" estático pelo novo `AreaOverviewCard`
- [x] 7.2 Ajustar grid do dashboard para acomodar card span-2
- [x] 7.3 Remover imports de Skeleton não utilizados se aplicável
