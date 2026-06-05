## ADDED Requirements

### Requirement: CRUD de eventos de cultivo
The system SHALL allow creating, reading and listing eventos linked to a cultivo.

#### Scenario: Criar evento
- **WHEN** user sends POST to `/api/eventos-cultivo` with `cultivoId`, `tipo`, `data`, `descricao`, `quantidade`
- **THEN** system creates the evento record linked to the cultivo

#### Scenario: Listar eventos do cultivo
- **WHEN** user requests GET `/api/eventos-cultivo?cultivoId=...`
- **THEN** system returns all eventos for that cultivo, ordered by data desc

### Requirement: Tipos de evento
The system SHALL support the following event types: plantio, adubacao, irrigacao, pulverizacao, colheita, outros.

#### Scenario: Criar evento com tipo válido
- **WHEN** user sends POST to `/api/eventos-cultivo` with `tipo` in allowed list
- **THEN** system creates the evento

#### Scenario: Criar evento com tipo inválido
- **WHEN** user sends POST to `/api/eventos-cultivo` with `tipo` not in allowed list
- **THEN** system returns HTTP 400 with validation error

### Requirement: Validação de dados do evento
The system SHALL validate that evento data is complete.

#### Scenario: Campo cultivoId obrigatório
- **WHEN** user sends POST to `/api/eventos-cultivo` without `cultivoId`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: Campo data obrigatório
- **WHEN** user sends POST to `/api/eventos-cultivo` without `data`
- **THEN** system returns HTTP 400 with validation error

#### Scenario: Campo tipo obrigatório
- **WHEN** user sends POST to `/api/eventos-cultivo` without `tipo`
- **THEN** system returns HTTP 400 with validation error
