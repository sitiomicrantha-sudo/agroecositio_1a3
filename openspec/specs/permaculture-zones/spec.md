## Requirements

### Requirement: Zonas de Permacultura como Constantes Estáticas
O sistema SHALL definir as 5 zonas de permacultura como constantes estáticas no código fonte, sem banco de dados, API ou interface de gerenciamento.

#### Scenario: Zonas disponíveis no código
- **WHEN** aplicação é compilada
- **THEN** sistema possui 5 zonas fixas definidas em `src/lib/zonas.ts` com chaves `zona_1` a `zona_5`

#### Scenario: Zonas no formulário de Talhão
- **WHEN** usuário abre formulário de cadastro ou edição de Talhão
- **THEN** sistema exibe dropdown com as 5 zonas estáticas, ordenadas por ordem, mostrando ícone + nome + label

#### Scenario: Herança de zona para unidades
- **WHEN** usuário cadastra uma Unidade Menor dentro de um Talhão
- **THEN** sistema associa a Unidade à mesma Zona do Talhão pai (herança visual)

#### Scenario: Sem CRUD de zonas
- **WHEN** usuário tenta acessar `/zonas` ou `/api/zonas`
- **THEN** sistema retorna 404 (rotas e página removidas)

### Requirement: Dados das Zonas Estáticas
O sistema SHALL incluir exatamente 5 zonas com os seguintes dados imutáveis:

| Chave | Nome | Label | Descrição | Cor | Ícone |
|-------|------|-------|-----------|-----|-------|
| zona_1 | Zona 1 | Uso diário | Horta, composteira, ervas, alimentação d'água | #16A34A | 🌱 |
| zona_2 | Zona 2 | Uso frequente | Pomar, galinheiro, apiário, pequenos animais | #65A30D | 🌿 |
| zona_3 | Zona 3 | Uso menos frequente | Cultivos maiores, pastagem, irrigação por gotejo | #CA8A04 | 🌾 |
| zona_4 | Zona 4 | Uso sazonal / coleta | Silvicultura, melíferas, fibras | #EA580C | 🌳 |
| zona_5 | Zona 5 | Natureza intocada | Conservação, observação, regeneração | #0284C7 | 🦋 |

#### Scenario: Valores das zonas
- **WHEN** código é compilado
- **THEN** cada zona possui name, label, description, color (hex) e icon (emoji) conforme tabela acima
