## REMOVED Requirements

### Requirement: Hierarquia de Glebas
**Reason**: Nível Gleba removido da hierarquia — usuário cadastra Talhões diretamente na Propriedade
**Migration**: Remover formulário de Gleba, endpoints e lógica relacionada

#### Scenario: Criar Gleba (REMOVIDO)
- **WHEN** usuário clica em "Adicionar Gleba"
- **THEN** [REMOVIDO — nível Gleba não existe mais]

#### Scenario: Editar Gleba (REMOVIDO)
- **WHEN** usuário clica em "Editar" em uma Gleba
- **THEN** [REMOVIDO — nível Gleba não existe mais]

#### Scenario: Listar Glebas (REMOVIDO)
- **WHEN** usuário visualiza a estrutura de áreas
- **THEN** [REMOVIDO — não há mais lista de Glebas]

#### Scenario: Arquivar Gleba com filhos (REMOVIDO)
- **WHEN** usuário arquiva uma Gleba
- **THEN** [REMOVIDO — nível Gleba não existe mais]

## MODIFIED Requirements

### Requirement: Hierarquia de Propriedade
O sistema SHALL manter exatamente uma (1) Propriedade no sistema. A Propriedade é a raiz da hierarquia e contém Nome, Localização, Área Total e Proprietário.

#### Scenario: Criar Propriedade
- **WHEN** usuário preenche o formulário de Propriedade com Nome, Localização, Área Total e Proprietário
- **THEN** sistema salva a Propriedade no banco e exibe na página Áreas como raiz (não há mais expansão de sub-grupos)

#### Scenario: Editar Propriedade
- **WHEN** usuário clica em "Editar" na Propriedade
- **THEN** sistema exibe formulário pré-preenchido e salva alterações ao confirmar

#### Scenario: Apenas uma Propriedade
- **WHEN** já existe uma Propriedade cadastrada
- **THEN** sistema não exibe opção de criar nova Propriedade, apenas editar a existente

### Requirement: Hierarquia de Talhões (modificada — antes "vinculados a Gleba", agora "vinculados a Propriedade")
O sistema SHALL permitir cadastrar Talhões vinculados diretamente à Propriedade. Cada Talhão possui Nome, Área, Zona (opcional) e Status.

#### Scenario: Criar Talhão
- **WHEN** usuário clica em "Adicionar Talhão" na página Áreas
- **THEN** sistema cria o Talhão vinculado diretamente à Propriedade com Status='Ativo'

#### Scenario: Editar Talhão
- **WHEN** usuário clica em "Editar" em um Talhão
- **THEN** sistema exibe formulário pré-preenchido e salva alterações

#### Scenario: Listar Talhões
- **WHEN** usuário acessa a página Áreas
- **THEN** sistema exibe todos os Talhões ativos da Propriedade na coluna esquerda

### Requirement: Hierarquia de Unidades Menores
O sistema SHALL permitir cadastrar Unidades Menores vinculadas a um Talhão. Cada Unidade possui Nome/Numeração, Tipo (Canteiro, Linha de SAF, Piquete, Galinheiro, Composteira, Estufa, Outro) e Status.

#### Scenario: Criar Unidade Menor
- **WHEN** usuário seleciona um Talhão e clica em "Adicionar Unidade"
- **THEN** sistema exibe formulário inline com campos Nome, Tipo (dropdown) e cria a Unidade com Status='Ativo'

#### Scenario: Adicionar Múltiplas Unidades
- **WHEN** usuário está no formulário de nova Unidade Menor
- **THEN** sistema exibe botão "Adicionar outro" para criar múltiplas unidades sem fechar o formulário

#### Scenario: Editar Unidade Menor
- **WHEN** usuário clica em "Editar" em uma Unidade Menor
- **THEN** sistema exibe formulário pré-preenchido e salva alterações

#### Scenario: Listar Unidades Menores
- **WHEN** usuário seleciona um Talhão na página Áreas
- **THEN** sistema exibe todas as Unidades Menores ativas daquele Talhão com seu Tipo

### Requirement: Soft Delete (Arquivamento)
O sistema SHALL implementar exclusão lógica (Soft Delete) através do campo Status. Nenhuma área deve ser removida fisicamente do banco de dados.

#### Scenario: Arquivar Unidade Menor
- **WHEN** usuário clica em "Arquivar" em uma Unidade Menor
- **THEN** sistema exibe modal de confirmação e ao confirmar altera Status para 'Arquivado'

#### Scenario: Arquivar Talhão com filhos
- **WHEN** usuário arquiva um Talhão que possui Unidades Menores ativas
- **THEN** sistema arquiva o Talhão e todas as suas Unidades Menores filhas (cascade)

#### Scenario: Arquivar Propriedade (REMOVIDO — não há filhos diretos além de Talhões)
- **WHEN** usuário tenta arquivar Propriedade
- **THEN** sistema arquiva a Propriedade e todos os Talhões e Unidades descendentes (cascade)

### Requirement: Filtro de Visualização
O sistema SHALL exibir um toggle "Ocultar Áreas Arquivadas" com estado padrão ativado.

#### Scenario: Toggle ativado (padrão)
- **WHEN** toggle está ativado
- **THEN** página Áreas exibe apenas Talhões e Unidades com Status='Ativo'

#### Scenario: Toggle desativado
- **WHEN** usuário desativa o toggle
- **THEN** página Áreas exibe todas as áreas (Ativas e Arquivadas), com áreas arquivadas visualmente diferenciadas (ex: opaco, cinza)

### Requirement: Reativar Área
O sistema SHALL permitir reativar áreas arquivadas quando o toggle de exibir arquivados está ativo.

#### Scenario: Reativar Unidade Menor
- **WHEN** toggle está ativado e usuário clica em "Reativar" em uma Unidade Menor arquivada
- **THEN** sistema altera Status para 'Ativo'

#### Scenario: Reativar Talhão com filhos
- **WHEN** usuário reativa um Talhão arquivado
- **THEN** sistema reativa apenas o Talhão (filhos permanecem arquivados - reativação individual)
