## 1. Database Reset

- [x] 1.1 Apagar banco: `DROP SCHEMA public CASCADE; CREATE SCHEMA public`
- [x] 1.2 Limpar pasta `src/db/migrations/` (migration antiga está obsoleta)

## 2. Schema e Constantes

- [x] 2.1 Remover tabela `zonas` e enum `status` associado de `src/db/schema.ts`
- [x] 2.2 Alterar tipo de `zonaId` em `talhoes` de `uuid` para `text` (sem FK)
- [x] 2.3 Recriar schema com `npx drizzle-kit push`
- [x] 2.4 Remover `LIMITES` de `src/lib/zonas.ts` (referência a glebas removida)
- [x] 2.5 Atualizar `src/lib/limits.ts` para remover `GLEBAS_POR_PROPRIEDADE`

## 3. API Routes — Remoção de Zonas

- [x] 3.1 Remover `src/app/api/zonas/route.ts` (GET/POST)
- [x] 3.2 Remover `src/app/api/zonas/[id]/route.ts` (GET/PUT/DELETE)

## 4. API Routes — Atualização de Talhões

- [x] 4.1 Atualizar `src/app/api/talhoes/route.ts` para usar zonaId como text
- [x] 4.2 Atualizar `src/app/api/talhoes/[id]/route.ts` para usar zonaId como text
- [x] 4.3 Remover validação de UUID no campo zonaId

## 5. UI — Remoção da Página de Zonas

- [x] 5.1 Remover `src/app/(dashboard)/zonas/page.tsx`
- [x] 5.2 Remover `src/components/zonas/ZonaList.tsx`
- [x] 5.3 Remover `src/components/zonas/ZonaForm.tsx`
- [x] 5.4 Remover link "Zonas" da sidebar em `src/app/(dashboard)/layout.tsx`

## 6. UI — Atualização da Página de Áreas

- [x] 6.1 Atualizar `src/app/(dashboard)/areas/page.tsx` para importar `ZONAS` de `@/lib/zonas` em vez de buscar da API
- [x] 6.2 Remover state `zonas` e `useEffect` de fetch de zonas
- [x] 6.3 Atualizar lógica de resolução de zona para usar constantes estáticas
- [x] 6.4 Atualizar `TalhaoForm` para usar `ZONA_OPTIONS` estático em vez de buscar da API

## 7. UI — Botão Adicionar Unidade na Coluna Direita

- [x] 7.1 Adicionar prop `onAddUnit` ao componente `UnitGrid`
- [x] 7.2 Adicionar botão "+" no header do `UnitGrid` (ao lado do título "Unidades")
- [x] 7.3 Passar callback `onAddUnit` do `areas/page.tsx` para o `UnitGrid`
- [x] 7.4 O callback deve abrir modal de criação de unidade com `talhaoId` pré-preenchido

## 8. Seed e Testes

- [x] 8.1 Remover insert de zonas do `src/db/seed.ts` (zonas agora são constantes)
- [x] 8.2 Atualizar insert de talhoes para usar `zonaId: "zona_1"` etc. em vez de UUID
- [x] 8.3 Remover `delete schema.zonas` do início do seed
- [x] 8.4 Rodar seed e verificar dados no banco

## 9. Limpeza

- [x] 9.1 Remover imports não utilizados de zonas em todos os arquivos
- [x] 9.2 Verificar se há referências restantes a `/api/zonas` no código
- [x] 9.3 Rodar `npm run lint` e corrigir erros
- [x] 9.4 Rodar `npm run typecheck` e corrigir erros
