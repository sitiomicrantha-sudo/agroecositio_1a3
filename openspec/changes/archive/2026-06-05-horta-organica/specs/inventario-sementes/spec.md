## ADDED Requirements

### Requirement: CRUD de inventário de sementes
The system SHALL allow creating, reading, updating and archiving inventário de sementes/mudas.

#### Scenario: Criar item no inventário
- **WHEN** user sends POST to `/api/inventario-sementes` with `nome`, `quantidade`, `unidade`, `fornecedor`, `validade`
- **THEN** system creates the inventário item

#### Scenario: Listar inventário
- **WHEN** user requests GET `/api/inventario-sementes`
- **THEN** system returns all inventário items, ordered by nome

#### Scenario: Atualizar item do inventário
- **WHEN** user sends PUT to `/api/inventario-sementes/[id]` with updated fields
- **THEN** system updates the inventário item

#### Scenario: Arquivar item do inventário
- **WHEN** user sends DELETE to `/api/inventario-sementes/[id]`
- **THEN** system sets status to "arquivado" (soft delete)

### Requirement: Validação de dados do inventário
The system SHALL validate that inventário data is complete.

#### Scenario: Campo nome obrigatório
- **WHEN** user sends POST to `/api/inventario-sementes` without `nome`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: Campo quantidade obrigatório
- **WHEN** user sends POST to `/api/inventario-sementes` without `quantidade`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: Campo unidade obrigatório
- **WHEN** user sends POST to `/api/inventario-sementes` without `unidade`
- **THEN** system returns HTTP 400 with validation error
