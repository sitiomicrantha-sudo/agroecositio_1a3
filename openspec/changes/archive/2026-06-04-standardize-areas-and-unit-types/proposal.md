## Why

O sistema precisa padronizar todas as medidas de área em m² para consistência, e registrar a área das Unidades Menores (atualmente não possui esse campo). Além disso, o tipo de unidade precisa virar uma tabela para suportar a realidade do sítio (tipos como "medicinais" e "aromáticas" que não existem no enum atual) e preparar para módulos futuros (horta, galinha caipira, apicultura, SAF).

## What Changes

- **BREAKING**: Todos os campos de área (`totalArea`, `area`) agora armazenam valores em m² (numeric). Seed atualizado de ha para m².
- **BREAKING**: Remove enum `unidadeType` do schema. Substituído por tabela `tipos_unidade`.
- **BREAKING**: Adiciona coluna `area` (numeric, nullable) na tabela `unidades_menores`.
- **BREAKING**: Substitui coluna `type` (enum) por `tipo_unidade_id` (FK → tipos_unidade) em `unidades_menores`.
- Adiciona tabela `tipos_unidade` com: id, name, description, timestamps.
- Adiciona tabela `tipo_unidade_modulos` (preparação futura): tipo_unidade_id (FK), modulo (text).
- Adiciona validação de área (soma dos filhos ≤ pai) como aviso, não bloqueio.
- Atualiza formulários (UnidadeForm, TalhaoForm) para entrada em m².
- Atualiza DetailPanel e visualização para mostrar m² em unidades e ha em talhoes/propriedade.
- Atualiza seed com tipos de unidade como registros e áreas em m².

## Capabilities

### New Capabilities
- `unit-types`: CRUD de tipos de unidade (tabela `tipos_unidade` + `tipo_unidade_modulos`), com suporte a módulos futuros.

### Modified Capabilities
- `area-topology`: Regra de visualização de áreas (m² para unidades, ha para talhoes/propriedade). Adição de campo de área na unidade.
- `database-schema`: Novas tabelas `tipos_unidade` e `tipo_unidade_modulos`. Remoção do enum `unidadeType`. Adição de coluna `area` em `unidades_menores`. Substituição de `type` por `tipo_unidade_id`. Todos os campos de área em m².
- `business-limits`: Validação de área (soma dos filhos ≤ pai) como aviso, sem bloqueio.
- `property-hierarchy-crud`: Formulários de Unidade e Talhão adaptados para m² e tipo via tabela.

## Impact

- Database: `schema.ts` — novas tabelas, remoção de enum, alteração de colunas
- Seed: `seed.ts` — novos inserts para tipos, áreas em m²
- API: `unidades/route.ts` — aceita `tipoUnidadeId` e `area`; `unidades/[id]/route.ts` — atualização
- Forms: `UnidadeForm.tsx` — campo de área, select de tipo via API; `TalhaoForm.tsx` — entrada em m²
- Visual: `DetailPanel.tsx` — exibe m² para unidades, ha para talhoes; `UnitGrid.tsx` — exibe área
- Limits: `limits.ts` — regras de validação de área
