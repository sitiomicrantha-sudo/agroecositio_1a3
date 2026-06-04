## Why

A hierarquia atual com Glebas adiciona complexidade desnecessária ao fluxo do usuário. O clique extra para selecionar uma Gleba antes de ver os Talhões é redundante — usuários do Sítio do Pica Pau Amarelo não precisam dessa camada intermediária. Remover o conceito de Gleba simplifica a navegação, reduz linhas de código, e deixa a estrutura mais alinhada com a realidade da propriedade.

## What Changes

- **BREAKING**: Remove nível Gleba da hierarquia — estrutura passa de Propriedade → Glebas → Talhões → Unidades para Propriedade → Talhões → Unidades
- **BREAKING**: Remove tabela `glebas` do banco de dados
- **BREAKING**: Remove endpoints da API de Glebas (`/api/glebas`, `/api/glebas/[id]`)
- **BREAKING**: Remove componente de formulário e lógica de Glebas
- Atualiza layout da página Áreas para 2 colunas (Talhões + Unidades) com painel de detalhes
- Atualiza seed do banco (remove dados de Glebas, insere Talhões diretamente na Propriedade)
- Remove validações de limite de Glebas (max 3 por propriedade)

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `area-topology`: Remove coluna de Glebas, transforma layout em 2 colunas (Talhões → Unidades) com painel de detalhes
- `business-limits`: Remove regras de limite de Glebas por Propriedade
- `database-schema`: Remove tabela `glebas`, altera FK de `talhoes` para referenciar `properties` diretamente
- `property-hierarchy-crud`: Remove CRUD de Glebas, ajusta fluxo para cadastro direto de Talhões na Propriedade

## Impact

- Frontend: `areas/page.tsx`, `TreeView.tsx`, `TreeNode.tsx`, `GlebaForm.tsx`
- API: Remove `/api/glebas`, `/api/glebas/[id]`; atualiza `/api/talhoes` para aceitar `propertyId`
- Database: Drop tabela `glebas`; migrar FK de `talhoes.glebaId` → `talhoes.propertyId`
- Seed: Remove insert de Glebas, ajusta Talhões para usar `propertyId` (seed.wipe)
- Specs: Remove `business-limits/spec.md` ou modifica; atualiza `area-topology/spec.md` e `property-hierarchy-crud/spec.md`
