## 1. Database Schema

- [x] 1.1 Gerar migration Drizzle para dropar tabela `glebas` e alterar `talhoes.glebaId` → `talhoes.propertyId`
- [x] 1.2 Executar `drizzle-kit push --force` para aplicar migration no banco
- [x] 1.3 Atualizar `src/db/schema.ts` — remover tabela `glebas` e enum `glebaStatus`, alterar FK de `talhoes` para `propertyId`
- [x] 1.4 Remover enum `glebaStatus` do schema se estiver definido separadamente

## 2. Seed Data

- [x] 2.1 Atualizar `src/db/seed.ts` — remover insert de glebas, inserir talhões diretamente com `propertyId`
- [x] 2.2 Executar `npm run db:seed` para verificar que seed funciona sem erros

## 3. API — Remover Glebas

- [x] 3.1 Deletar arquivo `src/app/api/glebas/route.ts`
- [x] 3.2 Deletar arquivo `src/app/api/glebas/[id]/route.ts`

## 4. API — Atualizar Talhões

- [x] 4.1 Atualizar `src/app/api/talhoes/route.ts` POST — trocar `glebaId` por `propertyId` no body, atualizar validação de limite (max 10 por propriedade), mensagem de erro atualizada para "Limite de 10 talhões por propriedade atingido."
- [x] 4.2 Atualizar `src/app/api/talhoes/route.ts` GET — manter endpoint funcionando com `propertyId`
- [x] 4.3 Atualizar `src/app/api/talhoes/[id]/route.ts` PUT — trocar `glebaId` por `propertyId` no body se aplicável

## 5. Frontend — Remover GlebaForm

- [x] 5.1 Deletar arquivo `src/components/areas/GlebaForm.tsx`
- [x] 5.2 Remover import de `GlebaForm` de `src/app/(dashboard)/areas/page.tsx`
- [x] 5.3 Remover modal de Gleba de `src/app/(dashboard)/areas/page.tsx`

## 6. Frontend — Refatorar áreas/page.tsx

- [x] 6.1 Remover estado de `selectedGlebaId` e lógica relacionada a glebas
- [x] 6.2 Atualizar `loadTreeData` — buscar talhões e unidades diretamente (sem camada de glebas)
- [x] 6.3 Atualizar `handleTalhaoSubmit` — enviar `propertyId` no POST/PUT de talhão
- [x] 6.4 Remover `handleGlebaSubmit` (não há mais criação/edição de glebas)
- [x] 6.5 Atualizar `handleAddChild` — remover mapeamento `property: "gleba"` (property não tem mais filho direto além de talhões via botão na página)
- [x] 6.6 Atualizar botão "Adicionar Gleba" para "Adicionar Talhão" na página Áreas

## 7. Frontend — Refatorar TreeView

- [x] 7.1 Atualizar `src/components/areas/TreeView.tsx` — remover coluna de Glebas, layout com apenas coluna de Talhões
- [x] 7.2 Remover lógica de `toggleGleba`, `getGlebaTalhoes` e qualquer função relacionada a glebas
- [x] 7.3 Atualizar `TreeNode.tsx` — remover suporte a tipo 'gleba', atualizar badge para só mostrar Zona em talhões

## 8. Frontend — Atualizar UnitGrid

- [x] 8.1 Verificar `src/components/areas/UnitGrid.tsx` — confirmar que funciona sem referência a glebas
- [x] 8.2 Atualizar props se necessário para nova estrutura (sem glebaId)

## 9. Frontend — Atualizar DetailPanel

- [x] 9.1 Remover exibição de detalhes de Gleba
- [x] 9.2 Atualizar detalhes de Talhão — mostrar Propriedade como pai ao invés de Gleba
- [x] 9.3 Verificar se detalhes de Unidade ainda mostram Talhão pai corretamente

## 10. Frontend — Validações e Limites

- [x] 10.1 Atualizar validação de limite de Talhões — mensagem e tooltip para "Limite de 10 talhões por propriedade atingido"
- [x] 10.2 Remover validação/limite de Glebas (max 3 por propriedade) — não se aplica mais
- [x] 10.3 Remover tooltip de limite de glebas do botão "Adicionar Gleba" (botão removido)

## 11. Sidebar / Navegação

- [x] 11.1 Verificar `src/app/(dashboard)/layout.tsx` — remover link/ícone de Glebas se existir na sidebar
- [x] 11.2 Atualizar breadcrumbs ou título da página Áreas se houver referência a "Glebas"

## 12. Verificação

- [x] 12.1 Executar `npm run db:seed` para popular banco com nova estrutura
- [x] 12.2 Executar `npm run build` — confirmar que compila sem erros
- [x] 12.3 Executar `npm run lint` — confirmar que não há erros de lint
- [x] 12.4 Abrir `/areas` no browser — verificar: página carrega, botão "Adicionar Talhão" funciona, seleção de talhão exibe unidades, criar/editar/arquivar talhão e unidade funciona
- [x] 12.5 Verificar `/zonas` — confirmar que páginas de Zonas não foi afetada
