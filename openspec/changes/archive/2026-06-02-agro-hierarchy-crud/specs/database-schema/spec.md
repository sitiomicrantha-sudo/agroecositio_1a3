## ADDED Requirements

### Requirement: Schema Drizzle ORM
O sistema SHALL definir o schema do banco de dados usando Drizzle ORM com 4 tabelas principais e relações hierárquicas.

#### Scenario: Tabela properties
- **WHEN** schema é criado
- **THEN** tabela `properties` possui: id (uuid/serial), name (text), location (text), totalArea (numeric), owner (text), createdAt (timestamp), updatedAt (timestamp)

#### Scenario: Tabela glebas
- **WHEN** schema é criado
- **THEN** tabela `glebas` possui: id (uuid/serial), propertyId (uuid FK → properties.id), name (text), area (numeric), notes (text), status (enum: 'active'/'archived'), createdAt, updatedAt

#### Scenario: Tabela talhoes
- **WHEN** schema é criado
- **THEN** tabela `talhoes` possui: id (uuid/serial), glebaId (uuid FK → glebas.id), name (text), area (numeric), status (enum: 'active'/'archived'), createdAt, updatedAt

#### Scenario: Tabela unidades_menores
- **WHEN** schema é criado
- **THEN** tabela `unidades_menores` possui: id (uuid/serial), talhaoId (uuid FK → talhoes.id), name (text), type (enum: 'canteiro'/'saf_line'/'piquete'/'galinheiro'/'composteira'/'estufa'/'outro'), status (enum: 'active'/'archived'), createdAt, updatedAt

### Requirement: Relações Hierárquicas
O sistema SHALL definir relações ONE-TO-MANY entre as tabelas da hierarquia.

#### Scenario: Property → Glebas
- **WHEN** schema é definido
- **THEN** uma Property pode ter múltiplas Glebas (ONE-TO-MANY)

#### Scenario: Gleba → Talhões
- **WHEN** schema é definido
- **THEN** uma Gleba pode ter múltiplos Talhões (ONE-TO-MANY)

#### Scenario: Talhão → Unidades Menores
- **WHEN** schema é definido
- **THEN** um Talhão pode ter múltiplas Unidades Menores (ONE-TO-MANY)

### Requirement: Enums de Status e Tipo
O sistema SHALL definir enums para status das áreas e tipo de unidade menor.

#### Scenario: Enum Status
- **WHEN** schema é definido
- **THEN** enum `status` possui valores: 'active', 'archived'

#### Scenario: Enum UnidadeType
- **WHEN** schema é definido
- **THEN** enum `unidade_type` possui valores: 'canteiro', 'saf_line', 'piquete', 'galinheiro', 'composteira', 'estufa', 'outro'

### Requirement: Variável de Ambiente DATABASE_URL
O sistema SHALL utilizar variável de ambiente DATABASE_URL para conexão com PostgreSQL.

#### Scenario: Configuração de conexão
- **WHEN** aplicação inicia
- **THEN** lê DATABASE_URL do arquivo .env e utiliza para conectar ao PostgreSQL

#### Scenario: Arquivo .env.example
- **WHEN** projeto é clonado
- **THEN** existe arquivo .env.example com DATABASE_URL=postgresql://user:password@localhost:5432/dbname
