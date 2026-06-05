## ADDED Requirements

### Requirement: CRUD de cultivos
The system SHALL allow creating, reading, updating and archiving cultivos linked to a unidade_menores (canteiro).

#### Scenario: Criar cultivo
- **WHEN** user sends POST to `/api/cultivos` with `unidadeId`, `cultura`, `variedade`, `dataPlantio`, `previsaoColheita`, `status`
- **THEN** system creates cultivo record linked to the unidade_menores

#### Scenario: Listar cultivos
- **WHEN** user requests GET `/api/cultivos?unidadeId=...`
- **THEN** system returns all cultivos for that unidade, ordered by dataPlantio desc

#### Scenario: Listar todos os cultivos ativos
- **WHEN** user requests GET `/api/cultivos?status=ativo`
- **THEN** system returns all cultivos with status "ativo" across all canteiros

#### Scenario: Atualizar cultivo
- **WHEN** user sends PUT to `/api/cultivos/[id]` with updated fields
- **THEN** system updates the cultivo record

#### Scenario: Arquivar cultivo
- **WHEN** user sends DELETE to `/api/cultivos/[id]`
- **THEN** system sets status to "colhido" (soft delete)

### Requirement: Um cultivo ativo por canteiro
The system SHALL enforce that only one cultivo with status "ativo" exists per unidade_menores at any time.

#### Scenario: Tentar criar segundo cultivo ativo no mesmo canteiro
- **WHEN** user sends POST to `/api/cultivos` with `unidadeId` that already has an "ativo" cultivo
- **THEN** system returns HTTP 409 with error message

#### Scenario: Criar cultivo em canteiro sem cultivo ativo
- **WHEN** user sends POST to `/api/cultivos` with `unidadeId` that has no "ativo" cultivo
- **THEN** system creates the cultivo successfully

### Requirement: Validação de dados do cultivo
The system SHALL validate that cultivo data is complete and consistent.

#### Scenario: Campo cultura obrigatório
- **WHEN** user sends POST to `/api/cultivos` without `cultura`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: Campo unidadeId obrigatório
- **WHEN** user sends POST to `/api/cultivos` without `unidadeId`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: dataPlantio deve ser data válida
- **WHEN** user sends POST to `/api/cultivos` with invalid `dataPlantio`
- **THEN** system returns HTTP 400 with validation error
