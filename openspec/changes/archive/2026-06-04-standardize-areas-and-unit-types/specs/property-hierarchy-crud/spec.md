## MODIFIED Requirements

### Requirement: Hierarquia de Talhões
O sistema SHALL permitir cadastrar Talhões vinculados à Propriedade. Cada Talhão possui Nome, Área (em m²), Zona (referência à constante estática) e Status.

#### Scenario: Criar Talhão
- **WHEN** usuário clica em "Adicionar Talhão"
- **THEN** sistema exibe formulário com campos Nome, Área (em m²) e Zona (dropdown com zonas estáticas) e cria o Talhão vinculado à Propriedade com Status='active'

#### Scenario: Editar Talhão
- **WHEN** usuário clica em "Editar" em um Talhão
- **THEN** sistema exibe formulário pré-preenchido com Zona atual selecionada e salva alterações

#### Scenario: Zona no formulário de Talhão
- **WHEN** formulário de Talhão é exibido
- **THEN** dropdown de Zona mostra as 5 zonas estáticas com ícone + nome + label, sem necessidade de busca à API

#### Scenario: Listar Talhões
- **WHEN** usuário visualiza a Tree View
- **THEN** sistema exibe todos os Talhões ativos da Propriedade, com badge de Zona colorido

### Requirement: Hierarquia de Unidades Menores
O sistema SHALL permitir cadastrar Unidades Menores vinculadas a um Talhão. Cada Unidade possui Nome/Numeração, Tipo (via tabela tipos_unidade), Área (em m², opcional) e Status.

#### Scenario: Criar Unidade Menor
- **WHEN** usuário expande um Talhão e clica em "Adicionar Unidade"
- **THEN** sistema exibe formulário inline com campos Nome, Tipo (dropdown de tipos_unidade), Área (m², opcional) e cria a Unidade com Status='active'

#### Scenario: Adicionar Múltiplas Unidades
- **WHEN** usuário está no formulário de nova Unidade Menor
- **THEN** sistema exibe botão "Adicionar outro" para criar múltiplas unidades sem fechar o formulário

#### Scenario: Editar Unidade Menor
- **WHEN** usuário clica em "Editar" em uma Unidade Menor
- **THEN** sistema exibe formulário pré-preenchido e salva alterações

#### Scenario: Listar Unidades Menores
- **WHEN** usuário expande um Talhão na Tree View
- **THEN** sistema exibe todas as Unidades Menores ativas daquele Talhão com seu Tipo

#### Scenario: Select de tipo busca da API
- **WHEN** formulário de Unidade é exibido
- **THEN** dropdown de Tipo busca opções da tabela `tipos_unidade` via API
