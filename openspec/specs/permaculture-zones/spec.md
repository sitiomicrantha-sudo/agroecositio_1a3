## Requirements

### Requirement: CRUD de Zonas de Permacultura
O sistema SHALL gerenciar Zonas de Permacultura através de CRUD completo via API REST. Cada Zona possui: nome, label, descrição, cor (hex), ícone (emoji), ordem de exibição e status ('Ativo'/'Arquivado').

#### Scenario: Listar zonas
- **WHEN** usuário acessa a página Zonas ou abre o formulário de Talhão
- **THEN** sistema exibe apenas zonas com Status='Ativo', ordenadas por campo `ordem`

#### Scenario: Criar zona
- **WHEN** usuário preenche formulário de nova Zona com nome, label, descrição, cor e ícone
- **THEN** sistema cria a Zona com Status='Ativo' e ordem automática (última + 1)

#### Scenario: Editar zona
- **WHEN** usuário clica em "Editar" em uma Zona
- **THEN** sistema exibe formulário pré-preenchido e salva alterações

#### Scenario: Arquivar zona usada por talhões
- **WHEN** usuário arquiva uma Zona que possui Talhões vinculados ativos
- **THEN** sistema altera Status da Zona para 'Arquivado' e exibe aviso que talhões existentes mantêm a referência (soft delete na zona, talhões mantêm zonaId)

#### Scenario: Seed inicial
- **WHEN** banco de dados é populado pela primeira vez (seed)
- **THEN** sistema cria exatamente 5 Zonas de Permacultura: Z1-Uso diário, Z2-Uso frequente, Z3-Uso menos frequente, Z4-Uso sazonal, Z5-Natureza intocada

### Requirement: Zonas padrão de permacultura
O sistema SHALL incluir as 5 zonas padrão de permacultura com os seguintes dados:

| Ordem | Nome | Label | Descrição | Cor | Ícone |
|-------|------|-------|-----------|-----|-------|
| 1 | Zona 1 | Uso diário | Horta, composteira, ervas, alimentação d'água | #16A34A | 🌱 |
| 2 | Zona 2 | Uso frequente | Pomar, galinheiro, apiário, pequenos animais | #65A30D | 🌿 |
| 3 | Zona 3 | Uso menos frequente | Cultivos maiores, pastagem, irrigação por gotejo | #CA8A04 | 🌾 |
| 4 | Zona 4 | Uso sazonal / coleta | Silvicultura, melíferas, fibras | #EA580C | 🌳 |
| 5 | Zona 5 | Natureza intocada | Conservação, observação, regeneração | #0284C7 | 🦋 |

#### Scenario: Zonas disponíveis no cadastro de talhão
- **WHEN** usuário abre formulário de cadastro ou edição de Talhão
- **THEN** sistema exibe dropdown com todas as Zonas ativas, ordenadas por `ordem`, mostrando ícone + nome + label

#### Scenario: Herança de zona para unidades
- **WHEN** usuário cadastra uma Unidade Menor dentro de um Talhão
- **THEN** sistema associa a Unidade à mesma Zona do Talhão pai (herança visual)
