## Requirements

### Requirement: Layout 3 colunas na página Áreas
O sistema SHALL exibir a estrutura de áreas em layout de 3 colunas: coluna 1 lista Glebas, coluna 2 lista Talhões da Gleba selecionada, coluna 3 exibe grade de cards com Unidades Menores do Talhão selecionado.

#### Scenario: Sem glebas cadastradas
- **WHEN** não há glebas cadastradas
- **THEN** sistema exibe estado vazio nas 3 colunas e botão "Criar Propriedade" (se aplicável)

#### Scenario: Seleção de gleba
- **WHEN** usuário clica em uma Gleba na coluna 1
- **THEN** coluna 2 exibe todos os Talhões daquela Gleba com badge de Zona colorido, coluna 3 exibe grade de Unidades do primeiro Talhão

#### Scenario: Seleção de talhão
- **WHEN** usuário clica em um Talhão na coluna 2
- **THEN** coluna 3 exibe grade de cards de todas as Unidades Menores daquele Talhão, com herança visual de Zona (dot colorido herdado do Talhão)

#### Scenario: Nenhum talhão na gleba
- **WHEN** usuário seleciona Gleba que não possui Talhões
- **THEN** coluna 2 exibe estado vazio e botão "Adicionar Talhão", coluna 3 não é exibida

#### Scenario: Grade de unidades
- **WHEN** coluna 3 exibe Unidades Menores
- **THEN** sistema exibe cards em grid responsivo (2 colunas até 4 itens, 3 colunas até 12, 4 colunas acima)

#### Scenario: Reconstrução da árvore equilibrada
- **WHEN** usuário cadastra/arquiva/edita qualquer item (gleba, talhão, unidade)
- **THEN** sistema reconstrói árvore em consulta única agregada e atualiza colunas sem requisições excessivas

#### Scenario: Detecção de correspondência entre grupos
- **WHEN** sistema recebe resposta de API com dados de Glebas e Talhões
- **THEN** todos os registros são indexados por `id` e correspondência é feita por chave estrangeira (`glebaId`, `talhaoId`) — nenhuma item ficará sem grupo ou desagrupado

### Requirement: Painel de Detalhes
O sistema SHALL exibir um painel de detalhes do item selecionado na parte inferior da página Áreas.

#### Scenario: Detalhes de Gleba
- **WHEN** usuário seleciona uma Gleba
- **THEN** painel exibe: nome, área total, quantidade de Talhões, notas, e ações (Editar, Arquivar)

#### Scenario: Detalhes de Talhão
- **WHEN** usuário seleciona um Talhão
- **THEN** painel exibe: nome, área, Zona (com cor e ícone), quantidade de Unidades, Gleba pai, e ações (Editar, Arquivar)

#### Scenario: Detalhes de Unidade
- **WHEN** usuário seleciona uma Unidade Menor
- **THEN** painel exibe: nome, tipo, área (m²), Talhão pai, Zona herdada, e ações (Editar, Arquivar)

### Requirement: Herança visual de Zona em Unidades
O sistema SHALL exibir a Zona de cada Unidade Menor herdada do Talhão pai através de dot colorido e label nos cards da coluna 3.

#### Scenario: Card de unidade exibe zona herdada
- **WHEN** sistema renderiza card de Unidade na coluna 3
- **THEN** card exibe dot colorido (hex da Zona do Talhão pai) e label da Zona
