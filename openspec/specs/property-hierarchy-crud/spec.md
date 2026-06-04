## Requirements

### Requirement: Hierarquia de Propriedade
O sistema SHALL manter exatamente uma (1) Propriedade no sistema. A Propriedade é a raiz da hierarquia e contém Nome, Localização, Área Total e Proprietário.

#### Scenario: Criar Propriedade
- **WHEN** usuário preenche o formulário de Propriedade com Nome, Localização, Área Total e Proprietário
- **THEN** sistema salva a Propriedade no banco e exibe na Tree View como raiz

#### Scenario: Editar Propriedade
- **WHEN** usuário clica em "Editar" na Propriedade
- **THEN** sistema exibe formulário pré-preenchido e salva alterações ao confirmar

#### Scenario: Apenas uma Propriedade
- **WHEN** já existe uma Propriedade cadastrada
- **THEN** sistema não exibe opção de criar nova Propriedade, apenas editar a existente

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

### Requirement: Soft Delete (Arquivamento)
O sistema SHALL implementar exclusão lógica (Soft Delete) através do campo Status. Nenhuma área deve ser removida fisicamente do banco de dados.

#### Scenario: Arquivar Unidade Menor
- **WHEN** usuário clica em "Arquivar" em uma Unidade Menor
- **THEN** sistema exibe modal de confirmação e ao confirmar altera Status para 'Arquivado'

#### Scenario: Arquivar Talhão com filhos
- **WHEN** usuário arquiva um Talhão que possui Unidades Menores ativas
- **THEN** sistema arquiva o Talhão e todas as suas Unidades Menores filhas (cascade)

### Requirement: Filtro de Visualização
O sistema SHALL exibir um toggle "Ocultar Áreas Arquivadas" com estado padrão ativado.

#### Scenario: Toggle ativado (padrão)
- **WHEN** toggle está ativado
- **THEN** Tree View exibe apenas áreas com Status='Ativo'

#### Scenario: Toggle desativado
- **WHEN** usuário desativa o toggle
- **THEN** Tree View exibe todas as áreas (Ativas e Arquivadas), com áreas arquivadas visualmente diferenciadas (ex: opaco, cinza)

### Requirement: Reativar Área
O sistema SHALL permitir reativar áreas arquivadas quando o toggle de exibir arquivados está ativo.

#### Scenario: Reativar Unidade Menor
- **WHEN** toggle está desativado e usuário clica em "Reativar" em uma Unidade Menor arquivada
- **THEN** sistema altera Status para 'Ativo'

#### Scenario: Reativar Talhão com filhos
- **WHEN** usuário reativa um Talhão arquivado
- **THEN** sistema reativa apenas o Talhão (filhos permanecem arquivados - reativação individual)
