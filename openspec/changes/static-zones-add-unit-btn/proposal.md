## Why

As zonas de permacultura (1-5) são conceitos fixos e imutáveis do paradigma da permacultura. Atualmente o sistema permite CRUD completo de zonas via API e UI, o que é desnecessário e permite dados inconsistentes. Além disso, a tela de Áreas na coluna direita (unidades) não possui botão para adicionar novas unidades, forçando o usuário a usar a树视图 lateral. Por fim, o campo "tipo" na Unidade Menor precisa de análise para decidir se permanece, considerando módulos futuros de produção vegetal e avicultura.

## What Changes

- **BREAKING**: Remove CRUD de zonas — a tabela `zonas` é removida do banco, juntamente com as rotas API (`/api/zonas`, `/api/zonas/[id]`) e a página de gerenciamento de zonas (`/zonas`). As 5 zonas padrão passam a ser constantes estáticas no código.
- Adiciona botão "Adicionar Unidade" na coluna direita da tela de Áreas (grid de unidades), permitindo criar unidades diretamente sem precisar da árvore lateral.
- Mantém o campo "tipo" na Unidade Menor — análise detalhada na seção de impacto.

## Capabilities

### New Capabilities
- `static-permaculture-zones`: Zonas de permacultura como constantes estáticas no código (sem banco, sem API, sem UI de gerenciamento)

### Modified Capabilities
- `area-topology`: Atualiza layout para 2 colunas (talhões + unidades) com botão de adicionar unidade na coluna direita
- `property-hierarchy-crud`: Remove referências a CRUD de zonas; simplifica formulário de talhão para usar zonas estáticas

## Impact

### Database
- Tabela `zonas` e enum `status` associado são removidos (as zonas passam a ser constantes em `src/lib/zonas.ts`)
- Coluna `zonaId` em `talhoes` permanece — agora armazena text (`"zona_1"`, `"zona_2"`, etc) em vez de UUID
- Abordagem: drop completo do banco + recriar schema com `drizzle-kit push` + novo seed (ambiente de dev)

### API
- Rotas `GET/POST /api/zonas` e `GET/PUT/DELETE /api/zonas/[id]` são removidas
- Rota `GET /api/talhoes` permanece, mas não precisa mais de join com zonas

### UI
- Página `/zonas` e componente `ZonaList` são removidos
- Link "Zonas" na sidebar do dashboard é removido
- `TalhaoForm` usa `ZONA_OPTIONS` estático em vez de buscar da API
- `areas/page.tsx` usa zonas estáticas em vez de fetch da API
- `TreeView`, `TreeNode`, `UnitGrid`, `DetailPanel` continuam funcionando (zonas são herdados do talhão)
- **Adiciona** botão "Adicionar Unidade" no `UnitGrid` (coluna direita)

### Campo "tipo"
- **Recomendação: MANTER**. O campo `type` na tabela `unidades_menores` (enum `unidade_type`) alinha-se com os módulos futuros planejados pelo usuário:
  - Módulo de produção vegetal: canteiro, SAF, piquete, estufa são tipos essenciais
  - Módulo de avicultura: galinheiro já está no enum
  - Módulo de compostagem: composteira já está no enum
  - O enum pode ser expandido futuramente (ex: `apiario`, `tanque`, `cerca_viva`)
- Manter o campo evita refatoração futura quando os módulos específicos forem implementados
- Nota: os valores do enum são exibidos diretamente no UI (ex: `saf_line` em vez de "Linha de SAF") — correção de display pode ser feita separadamente
