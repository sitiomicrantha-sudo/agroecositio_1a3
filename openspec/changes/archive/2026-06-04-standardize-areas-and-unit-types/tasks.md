## 1. Database Schema

- [x] 1.1 Criar tabela `tipos_unidade` no schema (id uuid, name text, description text nullable, timestamps)
- [x] 1.2 Criar tabela `tipo_unidade_modulos` no schema (tipoUnidadeId FK, modulo text)
- [x] 1.3 Adicionar coluna `area` (numeric, nullable) na tabela `unidades_menores`
- [x] 1.4 Substituir coluna `type` (enum) por `tipoUnidadeId` (FK → tipos_unidade) em `unidades_menores`
- [x] 1.5 Remover enum `unidadeType` do schema
- [x] 1.6 Adicionar relações Drizzle ORM (one-to-many) para as novas tabelas

## 2. Seed

- [x] 2.1 Atualizar seed para criar registros na tabela `tipos_unidade` (Canteiro, Linha de SAF, Piquete, Galinheiro, Composteira, Estufa, Medicinal, Aromática, Outro)
- [x] 2.2 Atualizar seed para criar registros em `tipo_unidade_modulos` (Canteiro→horta, Galinheiro→galinha_caipira, Composteira→compostagem)
- [x] 2.3 Atualizar seed de unidades_menores para usar `tipoUnidadeId` (FK) em vez de `type` (enum)
- [x] 2.4 Atualizar seed de talhoes para áreas em m² (multiplicar valores por 10.000)
- [x] 2.5 Atualizar seed de properties para totalArea em m²

## 3. API

- [x] 3.1 Criar endpoint GET /api/tipos-unidade (lista todos os tipos)
- [x] 3.2 Atualizar POST /api/unidades para aceitar `tipoUnidadeId` e `area` (em vez de `type`)
- [x] 3.3 Atualizar PUT /api/unidades/[id] para aceitar `tipoUnidadeId` e `area`
- [x] 3.4 Atualizar GET /api/unidades para retornar `tipoUnidadeId` e `area`

## 4. Formulários

- [x] 4.1 Atualizar UnidadeForm para buscar tipos de unidade via API (select dinâmico)
- [x] 4.2 Adicionar campo de Área (m²) no UnidadeForm (opcional)
- [x] 4.3 Atualizar TalhaoForm para entrada de área em m² (label "Área (m²)")
- [x] 4.4 Atualizar PropertyForm para entrada de totalArea em m² (label "Área Total (m²)")

## 5. Visualização

- [x] 5.1 Atualizar DetailPanel para exibir área de unidade em m²
- [x] 5.2 Atualizar DetailPanel para exibir área de talhão em ha (conversão m² ÷ 10.000)
- [x] 5.3 Atualizar DetailPanel para exibir área de propriedade em ha
- [x] 5.4 Atualizar UnitGrid para exibir área das unidades em m² (se registrada)
- [x] 5.5 Atualizar TreeView para exibir área dos talhões em ha

## 6. Validação

- [x] 6.1 Implementar função de validação de área (soma dos filhos ≤ pai)
- [x] 6.2 Integrar validação no POST /api/unidades (emite aviso, não bloqueia)
- [x] 6.3 Integrar validação no POST /api/talhoes (emite aviso, não bloqueia)
- [x] 6.4 Exibir avisos de validação no frontend (toast ou inline)

## 7. Limpeza

- [x] 7.1 Remover import do enum `unidadeType` de todos os arquivos
- [x] 7.2 Remover constantes do enum `unidadeTypeOptions` do UnidadeForm
- [x] 7.3 Atualizar types TypeScript para refletir novo schema
