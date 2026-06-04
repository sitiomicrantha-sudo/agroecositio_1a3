## Context

O sistema Sítio do Pica Pau Amarelo gerencia áreas de uma propriedade rural com hierarquia: Propriedade → Talhões → Unidades Menores. Atualmente:
- Áreas são armazenadas em ha (hectares) no seed, mas não há padronização clara
- Unidades Menores não possuem campo de área
- Tipo de unidade é um enum fixo no schema (7 valores), sem possibilidade de扩展ão
- Não há validação de áreas entre níveis da hierarquia

O foco do sistema é agricultura familiar de base ecológica, com visão de open source para produção local.

## Goals / Non-Goals

**Goals:**
- Padronizar todas as áreas em m² no banco de dados
- Adicionar campo de área (nullable) em unidades_menores
- Criar tabela `tipos_unidade` para gerenciar tipos de unidade
- Criar tabela `tipo_unidade_modulos` para preparação de módulos futuros
- Adicionar validação de área como aviso (não bloqueante)
- Manter o sistema simples e preparado para expansão

**Non-Goals:**
- Implementar módulos futuros (horta, galinha, apicultura) neste change
- Criar interface de gerenciamento de tipos de unidade (será feito quando necessário)
- Implementar QR codes ou rastreabilidade (módulo futuro)
- Alterar a topologia existente (Propriedade → Talhões → Unidades)

## Decisions

### Decisão 1: Armazenar áreas em m²

**Escolha:** Todos os campos de área (`totalArea`, `area`) armazenam valores em m².

**Alternativas consideradas:**
- Armazenar em ha e converter para exibição: Mais confuso para cálculos futuros (sementes, mudas)
- Armazenar em m² e converter para ha na UI: Mais consistente, converge para unidade padrão

**Razão:** m² é a unidade padrão para cálculos agrícolas (sementes/mudas por m²). Conversão para ha é simples (÷ 10.000) e feita apenas na visualização.

### Decisão 2: Tabela `tipos_unidade` em vez de enum

**Escolha:** Criar tabela normalizada com id, name, description, timestamps.

**Alternativas consideradas:**
- Manter enum: Limita a 7 tipos, sem possibilidade de扩展ão
- Usar array de texto: Menos integridade referencial, mais difícil de consultar

**Razão:** Tabela permite:
- Criar tipos específicos da realidade do sítio (ex: "Medicinal", "Aromática")
- Associar tipos a módulos futuros via `tipo_unidade_modulos`
- Manter integridade referencial

### Decisão 3: Tipo de unidade independente de módulo

**Escolha:** Um tipo pode ter 0 ou mais módulos associados.

**Exemplo:**
- "Canteiro" → módulo: horta
- "Medicinal" → (nenhum módulo ainda)
- "Galinheiro" → módulo: galinha_caipira

**Razão:** O usuário pode registrar tipos que não correspondem a módulos existentes. A tabela `tipo_unidade_modulos` é preparação, não requisito.

### Decisão 4: Área da unidade é nullable

**Escolha:** Campo `area` em `unidades_menores` é opcional.

**Razão:** Nem toda unidade precisa de área registrada. Módulos como horta precisarão, mas outros podem não.

### Decisão 5: Validação como aviso

**Escolha:** Validação de área (soma dos filhos ≤ pai) emite aviso, não bloqueia.

**Razão:** No início, o usuário pode não ter todas as medidas. O aviso orienta sem impedir o cadastro.

## Risks / Trade-offs

### Risco 1: Migração de dados existentes
**Risco:** Seed atual usa ha. Migrar para m² requer multiplicar valores por 10.000.
**Mitigação:** Seed é recriado (wipe). Dados reais não existem ainda.

### Risco 2: Formulários precisam de adaptação
**Risco:** UnidadeForm e TalhaoForm precisam de campo de m² e select de tipo via API.
**Mitigação:** Mudanças pontuais, sem refatoração grande.

### Risco 3: Tabela `tipo_unidade_modulos` sem uso imediato
**Risco:** Tabela criada mas não utilizada até módulos futuros.
**Mitigação:** Custo mínimo (2 colunas). Preparação vale a pena para expansão futura.

## Migration Plan

1. Criar novas tabelas (`tipos_unidade`, `tipo_unidade_modulos`)
2. Adicionar coluna `area` e `tipo_unidade_id` em `unidades_menores`
3. Migrar dados do enum para tabela `tipos_unidade`
4. Migrar coluna `type` para `tipo_unidade_id`
5. Atualizar seed com áreas em m²
6. Atualizar formulários e API
7. Atualizar visualização (DetailPanel, UnitGrid)
8. Remover enum `unidadeType`
9. Testar fluxo completo

## Open Questions

- Interface de gerenciamento de tipos de unidade: será criada agora ou quando o primeiro módulo precisar?
- Deve haver limite de tipos de unidade por propriedade? (atualmente não)
