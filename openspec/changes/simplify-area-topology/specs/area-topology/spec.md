## REMOVED Requirements

### Requirement: Coluna de Glebas
**Reason**: Nível Gleba removido da hierarquia
**Migration**: Usuário deve selecionar Talhão diretamente na coluna esquerda (ex-Glebas)

## MODIFIED Requirements

### Requirement: Layout 3 colunas na página Áreas
O sistema SHALL exibir a estrutura de áreas em layout de 2 colunas: coluna 1 lista Talhões da Propriedade, coluna 2 exibe grade de cards com Unidades Menores do Talhão selecionado. Painel de detalhes na parte inferior.

#### Scenario: Sem talhões cadastrados
- **WHEN** não há talhões cadastrados
- **THEN** sistema exibe estado vazio nas 2 colunas e botão "Adicionar Talhão"

#### Scenario: Seleção de talhão
- **WHEN** usuário clica em um Talhão na coluna 1
- **THEN** coluna 2 exibe grade de Unidades Menores daquele Talhão com badge de Zona colorido (herdado do Talhão)

#### Scenario: Detalhes de Talhão
- **WHEN** usuário seleciona um Talhão
- **THEN** painel de detalhes exibe: nome, área, Zona (com cor e ícone), quantidade de Unidades, Propriedade pai, e ações (Editar, Arquivar)

#### Scenario: Grade de unidades
- **WHEN** coluna 2 exibe Unidades Menores
- **THEN** sistema exibe cards em grid responsivo (2 colunas até 4 itens, 3 colunas até 12, 4 colunas acima)

#### Scenario: Reconstrução da árvore equilibrada
- **WHEN** usuário cadastra/arquiva/edita qualquer item (talhão, unidade)
- **THEN** sistema reconstrói árvore em consulta única agregada e atualiza colunas sem requisições excessivas

#### Scenario: Detecção de correspondência entre grupos
- **WHEN** sistema recebe resposta de API com dados de Talhões e Unidades
- **THEN** todos os registros são indexados por `id` e correspondência é feita por chave estrangeira (`propertyId`, `talhaoId`) — nenhuma item ficará sem grupo ou desagrupado

### Requirement: Painel de Detalhes
O sistema SHALL exibir um painel de detalhes do item selecionado na parte inferior da página Áreas.

#### Scenario: Detalhes de Gleba (REMOVIDO — não há mais nível Gleba)
- **WHEN** usuário seleciona uma Gleba
- **THEN** [REMOVIDO — nível Gleba não existe mais]

#### Scenario: Detalhes de Talhão
- **WHEN** usuário seleciona um Talhão
- **THEN** painel exibe: nome, área, Zona (com cor e ícone), quantidade de Unidades, Propriedade pai, e ações (Editar, Arquivar)

#### Scenario: Detalhes de Unidade
- **WHEN** usuário seleciona uma Unidade Menor
- **THEN** painel exibe: nome, tipo, área (m²), Talhão pai, Zona herdada, e ações (Editar, Arquivar)

### Requirement: Herança visual de Zona em Unidades
O sistema SHALL exibir a Zona de cada Unidade Menor herdada do Talhão pai através de dot colorido e label nos cards da coluna 2.

#### Scenario: Card de unidade exibe zona herdada
- **WHEN** sistema renderiza card de Unidade na coluna 2
- **THEN** card exibe dot colorido (hex da Zona do Talhão pai) e label da Zona
