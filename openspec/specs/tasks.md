## 1. Schema & Database

- [ ] 1.1 Adicionar tabelas `cultivos`, `eventos_cultivo`, `inventario_sementes` em `src/db/schema.ts`
- [ ] 1.2 Criar migration SQL para as 3 novas tabelas
- [ ] 1.3 Executar migration no banco
- [ ] 1.4 Atualizar seed com dados de exemplo (cultivos, eventos, inventário)

## 2. API - Cultivos

- [ ] 2.1 Criar endpoint GET `/api/cultivos` com filtros `unidadeId` e `status`
- [ ] 2.2 Criar endpoint POST `/api/cultivos` com validação (1 ativo por canteiro)
- [ ] 2.3 Criar endpoint PUT `/api/cultivos/[id]`
- [ ] 2.4 Criar endpoint DELETE `/api/cultivos/[id]` (soft delete → status "colhido")

## 3. API - Eventos de Cultivo

- [ ] 3.1 Criar endpoint GET `/api/eventos-cultivo` com filtro `cultivoId`
- [ ] 3.2 Criar endpoint POST `/api/eventos-cultivo` com validação de tipo

## 4. API - Inventário de Sementes

- [ ] 4.1 Criar endpoint GET `/api/inventario-sementes`
- [ ] 4.2 Criar endpoint POST `/api/inventario-sementes`
- [ ] 4.3 Criar endpoint PUT `/api/inventario-sementes/[id]`
- [ ] 4.4 Criar endpoint DELETE `/api/inventario-sementes/[id]`

## 5. Componentes

- [ ] 5.1 Criar componente `CultivoCard.tsx` para exibir cultivo individual
- [ ] 5.2 Criar componente `CultivoForm.tsx` para criar/editar cultivo
- [ ] 5.3 Criar componente `EventoList.tsx` para listar eventos de um cultivo
- [ ] 5.4 Criar componente `EventoForm.tsx` para criar evento
- [ ] 5.5 Criar componente `InventarioList.tsx` para inventário de sementes
- [ ] 5.6 Criar componente `InventarioForm.tsx` para criar/editar item do inventário

## 6. Página Horta

- [ ] 6.1 Criar página `/horta/page.tsx` com layout e states
- [ ] 6.2 Integrar CultivoCard com dados da API
- [ ] 6.3 Integrar modal de criação de cultivo
- [ ] 6.4 Integrar seção de inventário
- [ ] 6.5 Adicionar "Horta" na navegação do sidebar

## 7. Testes & Validação

- [ ] 7.1 Testar fluxo completo: criar cultivo → adicionar evento → colher
- [ ] 7.2 Testar validação: 2 cultivos ativos no mesmo canteiro (deve retornar 409)
- [ ] 7.3 Testar listagem de cultivos ativos e inventário
- [ ] 7.4 Verificar responsividade da página horta
