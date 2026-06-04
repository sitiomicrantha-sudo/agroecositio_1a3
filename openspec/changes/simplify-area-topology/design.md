## Context

O app atualmente possui 4 níveis hierárquicos: Propriedade → Glebas → Talhões → Unidades Menores. O nível Gleba foi adicionado como divisão física/política, mas no uso real do Sítio do Pica Pau Amarelo essa camada é desnecessária — os usuários cadastram Talhões diretamente na Propriedade. O click extra para selecionar uma Gleba antes de ver os Talhões adiciona fricção sem valor percebido.

**Estado atual:**
- Banco: 4 tabelas (properties, glebas, talhoes, unidades_menores)
- API: 8 endpoints (properties, glebas, talhoes, unidades_menores)
- Frontend: 3 colunas (Glebas → Talhões → Unidades)
- Validações: max 3 glebas por propriedade, max 10 talhões por gleba

**Objetivo:** Simplificar para 3 níveis (Propriedade → Talhões → Unidades), reduzindo código e superfície de erro.

## Goals / Non-Goals

**Goals:**
- Remover nível Gleba da hierarquia e do banco de dados
- Atualizar layout para 2 colunas (Talhões + Unidades)
- Manter Zones, Unidades, soft-delete e todas as funcionalidades existentes
- Atualizar seed para inserir Talhões diretamente na Propriedade
- Remover validação de limite de Glebas (3 por propriedade)

**Non-Goals:**
- Não alterar sistema de Zonas de Permacultura
- Não alterar tipos de Unidade Menor
- Não alterar funcionalidades de arquivamento/reativação
- Não alterar painel de detalhes (apenas atualizar referências)

## Decisions

**1. Drop tabela `glebas` — migrar FK de `talhoes`**
- **Decisão:** Dropar tabela `glebas` e alterar coluna `glebaId` → `propertyId` em `talhoes`
- **Alternativa considerada:** Manter tabela `glebas` mas não usar (deprecated) — rejeitada porque adiciona complexidade técnica sem valor
- **Rationale:** Schema reflete o domínio real. Tabela morta é dívida técnica

**2. Remover endpoints `/api/glebas` e `/api/glebas/[id]`**
- **Decisão:** Deletar completamente os arquivos de rota de Glebas
- **Alternativa considerada:** Manter rotas mas retornar 404 — rejeitada porque deixa código morto
- **Rationale:** Menos código para manter, menos superfície de ataque

**3. Layout 2 colunas: Talhões (esquerda) + Unidades (direita)**
- **Decisão:** Coluna 1 lista Talhões da Propriedade, Coluna 2 exibe grade de Unidades do Talhão selecionado
- **Alternativa considerada:** Lista simples de Talhões sem coluna de seleção — rejeitada porque perde a grade de Unidades
- **Rationale:** Mantém padrão de navegação drill-down com menos cliques

**4. Limite de Talhões: 10 por Propriedade (era "por Gleba")**
- **Decisão:** Mover validação de limite para Propriedade (max 10 talhões ativos)
- **Rationale:** sem Glebas, o limite natural é por Propriedade
- **Nota:** Não há mais limite de Glebas (3) — removido

**5. Unidades mantêm `talhaoId` FK — herança de Zona preservada**
- **Decisão:** Unidades continuam vinculadas a Talhões; Zona continua sendo herdada visualmente
- **Rationale:** Relação Talhão→Unidades é o núcleo do sistema

## Risks / Trade-offs

| Risk | Mitigação |
|------|-----------|
| **Perda de dados existentes** | O banco é apenas de teste — seed pode ser reexecutado. Em produção, seria necessário migrar dados primeiro |
| **Breaking change na API** | Frontend é o único consumidor — atualizar em conjunto |
| **Referências a glebaId em código morto** | Buscar e remover todas as ocorrências (tree, forms, modals, detail panel) |
| **Validação 409 de limite mudando de escopo** | Atualizar mensagens de erro e tooltips para refletir "por Propriedade" |

## Migration Plan

1. **Backup**: Dump do banco antes de alterações (dev only)
2. **Schema**: Gerar migration Drizzle para dropar tabela `glebas` e alterar `talhoes.glebaId` → `talhoes.propertyId`
3. **Seed**: Atualizar `src/db/seed.ts` — remover insert de glebas, inserir talhões com `propertyId`
4. **API**: 
   - Deletar `/app/api/glebas/route.ts` e `/app/api/glebas/[id]/route.ts`
   - Atualizar `/api/talhoes/route.ts` e `[id]/route.ts`: trocar `glebaId` por `propertyId`, atualizar validação de limite (max 10 por propriedade)
5. **Frontend**:
   - Remover `GlebaForm.tsx`
   - Refatorar `areas/page.tsx`: remover lógica de glebas, 2 colunas (talhões + unidades)
   - Refatorar `TreeView.tsx`: remover nível de nós gleba
   - Atualizar `TreeNode.tsx`: remover suporte a tipo 'gleba'
   - Atualizar `DetailPanel.tsx`: remover detalhes de gleba, mostrar Propriedade como pai de Talhão
   - Atualizar sidebar/navegação se houver referências
6. **Specs**: Atualizar delta specs para refletir nova estrutura
7. **Teste**: Rodar seed, abrir `/areas`, verificar cadastro de talhões e unidades funciona

## Open Questions

- [x] O limite de 10 talhões deve ser "por Propriedade" ou "por Gleba" (que não existe mais)? → Decidido: por Propriedade
- [x] A tabela `glebas` deve ser mantida como deprecated ou dropada? → Decidido: dropada
- [x] Deve manter seed re-executável? → Sim, `npm run db:seed` deve sempre funcionar
