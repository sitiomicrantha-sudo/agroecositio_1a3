## ADDED Requirements

### Requirement: Treeview iniciando a partir de gleba
O sistema SHALL exibir o treeview iniciando apenas a partir do nível de gleba, excluindo níveis superiores como fazenda e propriedade.

#### Scenario: Treeview carregado
- **WHEN** o treeview é carregado na página /areas
- **THEN** os itens exibidos começam a partir do nível de gleba

#### Scenario: Níveis superiores ocultos
- **WHEN** o treeview é renderizado
- **THEN** níveis acima de gleba (fazenda, propriedade) não são exibidos na árvore

### Requirement: Navegação no treeview de glebas
O sistema SHALL permitir navegação completa na estrutura de glebas dentro do treeview.

#### Scenario: Expansão de gleba
- **WHEN** o usuário clica em uma gleba no treeview
- **THEN** a gleba é expandida mostrando seus subníveis (se existentes)

#### Scenario: Seleção de gleba
- **WHEN** o usuário seleciona uma gleba no treeview
- **THEN** os dados da gleba são exibidos no painel de detalhes

#### Scenario: Colapso de gleba
- **WHEN** o usuário clica em uma gleba expandida
- **THEN** a gleba é colapsada ocultando seus subníveis

### Requirement: Dados da propriedade no treeview
O sistema SHALL exibir informações da propriedade no cabeçalho ou tooltip do treeview para contexto.

#### Scenario: Informações da propriedade visíveis
- **WHEN** o treeview é exibido
- **THEN** informações básicas da propriedade (nome, área total) são visíveis no cabeçalho do treeview

#### Scenario: Tooltip com detalhes da propriedade
- **WHEN** o usuário passa o mouse sobre o cabeçalho do treeview
- **THEN** um tooltip com detalhes adicionais da propriedade é exibido
