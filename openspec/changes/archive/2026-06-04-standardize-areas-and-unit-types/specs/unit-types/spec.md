## ADDED Requirements

### Requirement: Tabela tipos_unidade
O sistema SHALL manter uma tabela `tipos_unidade` com id (uuid), name (text), description (text, nullable) e timestamps.

#### Scenario: Criar tipo de unidade
- **WHEN** usuário envia dados com name válido
- **THEN** sistema cria registro em `tipos_unidade` com os dados fornecidos

#### Scenario: Listar tipos de unidade
- **WHEN** sistema precisa exibir tipos disponíveis
- **THEN** retorna todos os registros de `tipos_unidade` ordenados por name

#### Scenario: Tipo com descrição
- **WHEN** description é fornecida
- **THEN** sistema salva o campo description no registro

#### Scenario: Tipo sem descrição
- **WHEN** description não é fornecida
- **THEN** sistema salva description como null

### Requirement: Tabela tipo_unidade_modulos
O sistema SHALL manter uma tabela `tipo_unidade_modulos` com tipo_unidade_id (FK → tipos_unidade) e modulo (text).

#### Scenario: Associar tipo a módulo
- **WHEN** tipo de unidade deve ser usado por um módulo específico
- **THEN** sistema insere registro em `tipo_unidade_modulos` com tipo_unidade_id e modulo

#### Scenario: Tipo sem módulos
- **WHEN** tipo de unidade não possui módulos associados
- **THEN** tabela `tipo_unidade_modulos` não possui registros para esse tipo

#### Scenario: Tipo com múltiplos módulos
- **WHEN** tipo de unidade deve ser usado por vários módulos
- **THEN** sistema insere múltiplos registros em `tipo_unidade_modulos`

### Requirement: Seed de tipos de unidade
O sistema SHALL popular a tabela `tipos_unidade` com os tipos padrão durante o seed.

#### Scenario: Seed cria tipos padrão
- **WHEN** seed é executado
- **THEN** tabela `tipos_unidade` contém: Canteiro, Linha de SAF, Piquete, Galinheiro, Composteira, Estufa, Medicinal, Aromática, Outro

#### Scenario: Seed cria associação de módulos
- **WHEN** seed é executado
- **THEN** tabela `tipo_unidade_modulos` contém associações: Canteiro → horta, Galinheiro → galinha_caipira, Composteira → compostagem
