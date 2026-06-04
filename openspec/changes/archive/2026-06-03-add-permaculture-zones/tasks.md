## 1. Schema e Migração

- [x] 1.1 Deletar migration antiga (`src/db/migrations/0000_hot_midnight.sql` e `meta/`)
- [x] 1.2 Adicionar tabela `zonas` em `src/db/schema.ts` (id, name, label, description, color, icon, order, status, timestamps)
- [x] 1.3 Adicionar FK `zonaId` na tabela `talhoes` em `src/db/schema.ts`
- [x] 1.4 Rodar `npx drizzle-kit generate` para gerar nova migration
- [x] 1.5 Rodar `npx drizzle-kit push` para aplicar schema no banco

## 2. Seed do Banco

- [x] 2.1 Criar `src/db/seed.ts` com wipe de todas as tabelas
- [x] 2.2 Inserir 5 zonas de permacultura padrão (Z1-Z5) com dados do spec
- [x] 2.3 Inserir propriedade "Sítio do Pica Pau Amarelo" com dados genéricos
- [x] 2.4 Inserir 3 glebas (Próxima 5.0ha, L. Longe 2.1ha, APP 4.2ha)
- [x] 2.5 Inserir 8 talhões com zonas atribuídas (Piquete1→Z1, Piquete2→Z1, Galinheiro→Z2, Pomar→Z2, Lavoura→Z3, APP Interna→Z5, Milpa→Z3, Reserva→Z5)
- [x] 2.6 Inserir 7 unidades menores (canteiros, galinheiro, pomar)
- [x] 2.7 Adicionar scripts `db:seed` e `db:reset` no `package.json`

## 3. API de Zonas

- [x] 3.1 Criar `src/app/api/zonas/route.ts` — GET (lista zonas ativas, ordenadas por `order`) + POST (cria zona)
- [x] 3.2 Criar `src/app/api/zonas/[id]/route.ts` — GET + PUT + DELETE (soft delete via status)

## 4. API de Talhões — Atualizar

- [x] 4.1 Editar `src/app/api/talhoes/route.ts` — aceitar `zonaId` no POST + validação max 10 talhões por gleba (409)
- [x] 4.2 Editar `src/app/api/talhoes/[id]/route.ts` — aceitar `zonaId` no PUT

## 5. API de Glebas — Validação

- [x] 5.1 Editar `src/app/api/glebas/route.ts` — adicionar contagem de glebas ativas antes do INSERT, retornar 409 se >= 3

## 6. Constantes e Utilitários

- [x] 6.1 Criar `src/lib/zonas.ts` — constantes de cores, labels, descrições, tipos TypeScript, array `ZONA_OPTIONS` para selects, objeto `LIMITES`
- [x] 6.2 Criar `src/lib/limits.ts` — constantes `LIMITES.GLEBAS_POR_PROPRIEDADE = 3` e `LIMITES.TALHOES_POR_GLEBA = 10`

## 7. Componentes de Zonas

- [x] 7.1 Criar `src/components/zonas/ZonaList.tsx` — lista de zonas com ícone, nome, label, descrição, cor (swatch), status, ações
- [x] 7.2 Criar `src/components/zonas/ZonaForm.tsx` — formulário com name, label, description, color (input type=color), icon (input de emoji)

## 8. Página de Zonas

- [x] 8.1 Criar `src/app/(dashboard)/zonas/page.tsx` — página com ZonaList e modal de criação/edição
- [x] 8.2 Adicionar "Zonas" na sidebar em `src/app/(dashboard)/layout.tsx` com ícone Layers

## 9. Frontend — Layout 3 Colunas

- [x] 9.1 Refatorar `src/components/areas/TreeView.tsx` — layout de 3 colunas (glebas, talhões, unidades), estado de seleção, passar zonas e contagens
- [x] 9.2 Refatorar `src/components/areas/TreeNode.tsx` — badge de zona com dot colorido + label, botão "+" desabilitado quando no limite com tooltip

## 10. Componentes Novos

- [x] 10.1 Criar `src/components/areas/UnitGrid.tsx` — grade responsiva de cards para unidades menores (2 cols até 4, 3 cols até 12, 4 cols acima)
- [x] 10.2 Criar `src/components/areas/DetailPanel.tsx` — painel inferior com detalhes do node selecionado (nome, área, zona, tipo, ações)

## 11. Forms Atualizados

- [x] 11.1 Editar `src/components/areas/TalhaoForm.tsx` — adicionar Select de zona com `ZONA_OPTIONS`, buscar zonas da API, exibir descrição da zona selecionada
- [x] 11.2 Atualizar `src/components/areas/UnidadeForm.tsx` — sem mudanças estruturais (unidade herda zona visualmente do talhão)

## 12. Página de Áreas — Integração

- [x] 12.1 Editar `src/app/(dashboard)/areas/page.tsx` — novos estados (glebaCountByProperty, talhaoCountByGleba, selectedNode), carregar zonas, passar para TreeView
- [x] 12.2 Atualizar `fetchTreeData` — contar glebas ativas por propriedade e talhões ativos por gleba durante iteração
- [x] 12.3 Atualizar `handleTalhaoSubmit` — incluir `zonaId` no body
- [x] 12.4 Adicionar `DetailPanel` na página (renderiza quando selectedNode não é null)
- [x] 12.5 Tratar HTTP 409 em `handleGlebaSubmit` e `handleTalhaoSubmit` — exibir alert com mensagem do backend
- [x] 13.1 Corrigir `handleGlebaSubmit` linha 233 — trocar `JSON.stringify(data)` por `JSON.stringify(body)` no modo edit (PUT)

## 14. Verificação Final

- [x] 14.1 Rodar `npx drizzle-kit generate` e verificar que migration foi gerada corretamente
- [x] 14.2 Rodar `npx tsx src/db/seed.ts` e verificar que banco foi populado
- [x] 14.3 Testar CRUD de zonas via API (`GET /api/zonas`, `POST /api/zonas`, etc.)
- [x] 14.4 Testar criação de talhão com zona — verificar que `zonaId` é salvo
- [x] 14.5 Testar limite de 3 glebas — criar 3 glebas, tentar 4a, verificar 409
- [x] 14.6 Testar limite de 10 talhões — criar 10 talhões, tentar 11o, verificar 409
- [x] 14.7 Verificar que botões "+" são desabilitados com tooltip quando limite atingido
- [x] 14.8 Verificar layout 3 colunas: selecionar gleba → coluna 2 mostra talhões → selecionar talhão → coluna 3 mostra unidades
- [x] 14.9 Verificar badges de zona coloridos nos talhões e cards de unidade
- [x] 14.10 Verificar painel de detalhes exibe dados corretos por tipo de node
- [x] 14.11 Verificar que bug do handleGlebaSubmit (edit mode) está corrigido
- [x] 14.12 Rodar `npm run lint` para verificar erros de linting
