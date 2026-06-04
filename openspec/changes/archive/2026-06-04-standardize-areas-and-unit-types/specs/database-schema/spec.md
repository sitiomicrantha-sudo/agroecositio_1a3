## MODIFIED Requirements

### Requirement: Schema Drizzle ORM
O sistema SHALL definir o schema do banco de dados usando Drizzle ORM com 5 tabelas principais e relações hierárquicas.

#### Scenario: Tabela properties
- **WHEN** schema é criado
- **THEN** tabela `properties` possui: id (uuid), name (text), location (text), totalArea (numeric, m²), owner (text), createdAt (timestamp), updatedAt (timestamp)

#### Scenario: Tabela talhoes
- **WHEN** schema é criado
- **THEN** tabela `talhoes` possui: id (uuid), propertyId (uuid FK → properties.id), zonaId (text), name (text), area (numeric, m²), status (enum: 'active'/'archived'), createdAt, updatedAt

#### Scenario: Tabela unidades_menores
- **WHEN** schema é criado
- **THEN** tabela `unidades_menores` possui: id (uuid), talhaoId (uuid FK → talhoes.id), tipoUnidadeId (uuid FK → tipos_unidade.id), name (text), area (numeric, nullable, m²), status (enum: 'active'/'archived'), createdAt, updatedAt

#### Scenario: Tabela tipos_unidade
- **WHEN** schema é criado
- **THEN** tabela `tipos_unidade` possui: id (uuid), name (text), description (text, nullable), createdAt (timestamp), updatedAt (timestamp)

#### Scenario: Tabela tipo_unidade_modulos
- **WHEN** schema é criado
- **THEN** tabela `tipo_unidade_modulos` possui: tipoUnidadeId (uuid FK → tipos_unidade.id), modulo (text)

### Requirement: Relações Hierárquicas
O sistema SHALL definir relações ONE-TO-MANY entre as tabelas da hierarquia.

#### Scenario: Property → Talhões
- **WHEN** schema é definido
- **THEN** uma Property pode ter múltiplos Talhões (ONE-TO-MANY)

#### Scenario: Talhão → Unidades Menores
- **WHEN** schema é definido
- **THEN** um Talhão pode ter múltiplas Unidades Menores (ONE-TO-MANY)

#### Scenario: Tipo Unidade → Unidades Menores
- **WHEN** schema é definido
- **THEN** um Tipo de Unidade pode ter múltiplas Unidades Menores (ONE-TO-MANY)

#### Scenario: Tipo Unidade → Módulos
- **WHEN** schema é definido
- **THEN** um Tipo de Unidade pode ter múltiplas associações com Módulos (ONE-TO-MANY)

### Requirement: Enums de Status
O sistema SHALL manter enum para status das áreas.

#### Scenario: Enum Status
- **WHEN** schema é definido
- **THEN** enum `status` possui valores: 'active', 'archived'

### Requirement: Remoção do enum UnidadeType
O sistema SHALL remover o enum `unidadeType` do schema, substituído pela tabela `tipos_unidade`.

#### Scenario: Enum removido
- **WHEN** schema é atualizado
- **THEN** enum `unidadeType` não existe mais no schema

### Requirement: Variável de Ambiente DATABASE_URL
O sistema SHALL utilizar variável de ambiente DATABASE_URL para conexão com PostgreSQL.

#### Scenario: Configuração de conexão
- **WHEN** aplicação inicia
- **THEN** lê DATABASE_URL do arquivo .env e utiliza para conectar ao PostgreSQL

#### Scenario: Arquivo .env.example
- **WHEN** projeto é clonado
- **THEN** existe arquivo .env.example com DATABASE_URL=postgresql://user:password@localhost:5432/dbname
