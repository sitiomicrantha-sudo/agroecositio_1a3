## ADDED Requirements

### Requirement: Card de visão geral das áreas no dashboard
O sistema SHALL exibir um card "Estrutura da Propriedade" no dashboard com layout de 2 colunas (Talhões + Unidades) para consulta rápida.

#### Scenario: Card exibe propriedade
- **WHEN** dashboard é carregado
- **THEN** card exibe nome da propriedade e área total em ha

#### Scenario: Coluna de talhões
- **WHEN** card é exibido
- **THEN** coluna esquerda mostra lista de talhões ativos com: dot colorido da zona, nome, área em ha

#### Scenario: Coluna de unidades
- **WHEN** card é exibido
- **THEN** coluna direita exibe "Selecione um talhão" quando nenhum está selecionado

### Requirement: Seleção de talhão no card
O sistema SHALL permitir selecionar um talhão no card para ver suas unidades.

#### Scenario: Clique no talhão
- **WHEN** usuário clica em um talhão na coluna esquerda
- **THEN** coluna direita exibe unidades do talhão selecionado com: nome, tipo, área em m²

#### Scenario: Talhão selecionado visualmente
- **WHEN** um talhão está selecionado
- **THEN** talhão selecionado tem fundo verde-50 e borda esquerda verde

#### Scenario: Nenhum talhão selecionado
- **WHEN** card é carregado
- **THEN** nenhum talhão está selecionado por padrão

### Requirement: Limitação de talhões visíveis
O sistema SHALL exibir no máximo 6 talhões no card.

#### Scenario: Menos de 6 talhões
- **WHEN** propriedade possui menos de 6 talhões ativos
- **THEN** card exibe todos os talhões

#### Scenario: Mais de 6 talhões
- **WHEN** propriedade possui mais de 6 talhões ativos
- **THEN** card exibe os 6 primeiros e link "Ver todos os talhões →"

#### Scenario: Link "Ver todos" navega
- **WHEN** usuário clica em "Ver todos os talhões →"
- **THEN** sistema navega para página /areas

### Requirement: Layout responsivo
O sistema SHALL exibir o card em layout adaptativo conforme tamanho da tela.

#### Scenario: Desktop (lg+)
- **WHEN** tela é maior que 1024px
- **THEN** card ocupa 2 colunas no grid, interno mostra Talhões e Unidades lado a lado

#### Scenario: Mobile
- **WHEN** tela é menor que 1024px
- **THEN** card ocupa largura total, interno empilha Talhões acima e Unidades abaixo

### Requirement: Sem botões de ação
O sistema SHALL exibir o card apenas para consulta, sem botões de adicionar, editar ou arquivar.

#### Scenario: Card sem botões
- **WHEN** card é renderizado
- **THEN** nenhum botão de ação (adicionar, editar, arquivar) é exibido

#### Scenario: Apenas seleção
- **WHEN** usuário interage com o card
- **THEN** única interação permitida é selecionar um talhão

### Requirement: Navegação para página completa
O sistema SHALL permitir navegar para a página de áreas completa.

#### Scenario: Clique no nome da propriedade
- **WHEN** usuário clica no nome da propriedade no card
- **THEN** sistema navega para /areas

#### Scenario: Clique em "Ver todos"
- **WHEN** usuário clica em "Ver todos os talhões →"
- **THEN** sistema navega para /areas
