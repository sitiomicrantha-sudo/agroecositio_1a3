## Context

O app Agroecossistio é um SaaS para gestão de sítio agroecológico. O módulo de Áreas é o primeiro e define a topologia física da propriedade (Propriedade > Gleba > Talhão > Unidade Menor). A partir disso funcionarão módulos de cultivo, rastreio e planejamento de safra.

O banco de dados atual possui apenas dados de teste e precisa ser zerado. O schema precisa de uma nova tabela `zonas` e uma FK `zonaId` em `talhoes`. O frontend precisa de uma refatoração significativa: da tree view aninhada atual para um layout de 3 colunas com painel de detalhes.

Stack: Next.js 16, Drizzle ORM, PostgreSQL, Tailwind CSS, react-hook-form.

## Goals / Non-Goals

**Goals:**
- Tabela `zonas` com CRUD completo via API REST
- Seed com 5 zonas de permacultura padrão + estrutura inicial da propriedade
- Validação de limites (3 glebas/propriedade, 10 talhões/gleba) no backend
- Layout 3 colunas na página Áreas (glebas → talhões → unidades)
- Badges de zona coloridos nos talhões
- Botões "+" desabilitados com tooltip quando limite atingido
- Painel de detalhes do item selecionado
- Wipe completo do banco + seed
- Bug fix: handleGlebaSubmit envia `data` em vez de `body` no modo edit

**Non-Goals:**
- Módulo de cultivos (plantios) — fase futura
- Rastreabilidade de produtos — fase futura
- Planejamento de safra — fase futura
- Autenticação/usuarios — não faz parte deste módulo
- Mapa geográfico das glebas — futura

## Decisions

### Decisão 1: Zonas como tabela (não enum)

**Escolha:** Tabela `zonas` com UUID primary key, referenciada por FK em `talhoes`.

**Alternativa considerada:** Enum `zonaEnum` no schema Drizzle.

**Razão:** Zonas precisam de nome, label, descrição, cor, ícone e ordem — dados que um enum não suporta. Além disso, o usuário pode querer personalizar zonas ou adicionar zonas customizadas no futuro. Uma tabela dá flexibilidade sem custo de complexidade significativo.

### Decisão 2: Zona vive no Talhão (não na Gleba)

**Escolha:** Campo `zonaId` (FK para `zonas`) na tabela `talhoes`.

**Alternativa considerada:** Campo `zona` na tabela `glebas`.

**Razão:** A gleba é uma divisão física/política estática que pode abranger múltiplas zonas (ex: "Próxima" tem Z1 em piquetes, Z2 em galinheiro/pomar, Z3 em lavoura, Z5 em APP interna). O talhão é a unidade viva de manejo e tipicamente pertence a uma única zona. Unidades menores herdam visualmente a zona do talhão pai.

### Decisão 3: Layout 3 colunas (Proposta C híbrida)

**Escolha:** Coluna 1 = glebas, Coluna 2 = talhões da gleba selecionada, Coluna 3 = grade de cards de unidades do talhão selecionado.

**Alternativas consideradas:**
- Tree view aninhada (atual) — problema de escala com 20+ canteiros
- 3 painéis independentes — mais complexo, perde contexto hierárquico

**Razão:** A hierarchy gleba→talhão→unidade é curta (3 glebras × 10 talhões × N unidades). TreeView funciona para os 2 primeiros níveis. Grade de cards é superior para o nível unidade (20+ canteiros). A combinação (Proposta C) é a mais equilibrada.

### Decisão 4: Limites validados no backend, comunicados no frontend

**Escolha:** Validação server-side como única fonte de verdade. Frontend desabilita botões "+" e exibe tooltip quando limite atingido.

**Razão:** Frontend sozinho não impede bypass (POST direto). Backend garante integridade. Frontend dá feedback visual imediato ao usuário.

### Decisão 5: Seed com wipe completo

**Escolha:** Script de seed que limpa todas as tabelas e popula dados iniciais.

**Razão:** Banco só tem dados de teste. Melhor ter script reutilizável que possa ser executado novamente (ex: ambiente de desenvolvimento). Script inclui: 5 zonas padrão, 1 propriedade, 3 glebas, 8 talhões, 7 unidades.

### Decisão 6: Cores das zonas no formato hex (não Tailwind classes)

**Escolha:** Campo `color` na tabela `zonas` armazena hex (ex: `#16A34A`). Componentes React usam `style={{ color: zona.color }}` para renderizar.

**Razão:** Tailwind classes não podem ser construídas dinamicamente a partir de dados do banco. Hex dá flexibilidade total.

### Decisão 7: Badge de zona com dot + label

**Escolha:** Visualmente: dot colorido (2-3px) + label da zona (ex: "Z1 Uso diário").

**Razão:** Compacto, identificável, não polui a UI. Funciona tanto na coluna de talhões quanto nos cards de unidade.

## Risks / Trade-offs

**[Risco] N+1 queries no fetchTreeData** → O fetch atual faz chamadas sequenciais para cada gleba e cada talhão. Com dados reais (3 glebas, 8 talhões, 7 unidades) o impacto é aceitável (~18 requests). Para escalar, futura otimização com API agregada.

**[Risco] Wipe do banco perde dados de teste** → Aceitável pois o banco só contém dados de teste. Script de seed recria tudo.

**[Risco] 3 colunas podem ficar confusas em mobile** → Em telas pequenas, colunas podem empilhar ou usar abas. Não é prioridade agora (desktop-first).

**[Trade-off] Zona como tabela vs enum** → Ganho de flexibilidade vs perda de type-safety no Drizzle. Mitigado com tipo TypeScript `ZonaKey` derivado do schema.

**[Trade-off] Herança visual de zona (não FK)** → Unidades não têm FK para zona — herdam visualmente do talhão. Mantém schema simples. Se no futuro unidades precisarem de zona própria, basta adicionar FK.

## Migration Plan

1. `npx drizzle-kit generate` — gera migration nova com tabela `zonas` + FK em `talhoes`
2. `npx drizzle-kit push` — aplica schema no banco
3. `npx tsx src/db/seed.ts` — popula banco com zonas + dados iniciais
4. Deploy da aplicação com as novas rotas API e componentes

**Rollback:** Reverter código para versão anterior. Migration pode ser revertida com `ALTER TABLE talhoes DROP COLUMN zona_id; DROP TABLE zonas;`

## Open Questions

- Nenhum questionamento pendente. Todas as decisões foram tomadas durante a conversa com o usuário.
