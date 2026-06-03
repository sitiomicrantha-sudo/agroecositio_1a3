## Context

O projeto é um sistema de gestão agroecológica que will ser construído do zero. Atualmente não existe código - o foco desta fase é criar o esqueleto do sistema e o CRUD da hierarquia física da propriedade.

A hierarquia física é: Propriedade → Gleba → Talhão → Unidade Menor. Cada nível possui áreas, status (Ativo/Arquivado) e observações. A estrutura é dinâmica - uma Unidade Menor pode mudar de tipo ao longo do tempo (ex: canteiro vira lavoura aberta).

Stakeholders: usuários do campo (produtores rurais, técnicos agrícolas) que acessarão o sistema via celular.

## Goals / Non-Goals

**Goals:**
- Criar o esqueleto completo do Next.js com App Router
- Implementar CRUD completo para todos os 4 níveis da hierarquia
- Implementar soft delete (arquivamento) com cascade
- Criar Tree View expansível/colapsável para visualização
- Layout mobile-first responsivo
- Schema do Drizzle ORM com todas as relações
- Dashboard com placeholders para futuros módulos

**Non-Goals:**
- Autenticação de usuários (será implementada depois)
- Módulos de rastreabilidade/QR Code (fase futura)
- Módulos de clima, atividades, produção (apenas placeholders)
- Integração com APIs externas
- Testes automatizados (nesta fase)

## Decisions

### 1. Drizzle ORM sobre Prisma
**Decisão**: Utilizar Drizzle ORM para modelagem e consultas do banco.
**Rationale**: Drizzle é mais leve, tipagem mais natural em TypeScript, performance superior para consultas simples, e melhor suporte a raw SQL quando necessário. Prisma seria mais pesado para este caso de uso.
**Alternativas consideradas**: Prisma (mais pesado, codegen), TypeORM (menos moderno), Sequelize (legado).

### 2. Estrutura de Pastas Next.js App Router
**Decisão**: Utilizar a estrutura padrão do App Router com route groups.
**Estrutura**:
```
src/
  app/
    (dashboard)/
      page.tsx          # Dashboard principal
      areas/
        page.tsx        # Gerenciador de Áreas
    api/
      properties/
        route.ts        # CRUD Propriedade
      glebas/
        route.ts        # CRUD Gleba
      talhoes/
        route.ts        # CRUD Talhão
      unidades/
        route.ts        # CRUD Unidade Menor
    layout.tsx          # Layout raiz
  components/
    ui/                 # Componentes base (Button, Card, Toggle)
    areas/              # Componentes específicos do módulo de áreas
      TreeView.tsx
      TreeNode.tsx
      AreaForm.tsx
      FilterToggle.tsx
  lib/
    db/
      schema.ts         # Schema Drizzle
      index.ts          # Conexão com banco
    utils.ts            # Utilitários gerais
  db/
    migrations/         # Migrations do Drizzle
```

### 3. API Routes RESTful
**Decisão**: Criar rotas de API REST para cada entidade com operações CRUD completas.
**Endpoints**:
- `GET/POST /api/properties` - Listar/Criar propriedade
- `GET/PUT/DELETE /api/properties/[id]` - Buscar/Atualizar/Arquivar propriedade
- `GET/POST /api/glebas?propertyId=X` - Listar/Criar glebas de uma propriedade
- `GET/PUT/DELETE /api/glebas/[id]` - Buscar/Atualizar/Arquivar gleba
- `GET/POST /api/talhoes?glebaId=X` - Listar/Criar talhões de uma gleba
- `GET/PUT/DELETE /api/talhoes/[id]` - Buscar/Atualizar/Arquivar talhão
- `GET/POST /api/unidades?talhaoId=X` - Listar/Criar unidades de um talhão
- `GET/PUT/DELETE /api/unidades/[id]` - Buscar/Atualizar/Arquivar unidade

### 4. Soft Delete com Cascade via Status
**Decisão**: Implementar arquivamento em cascata alterando o campo `status` de 'Ativo' para 'Arquivado'.
**Rationale**: Não usar coluna `deleted_at` - o campo `status` já serve para isso e é mais explícito na UI.
**Cascade**: Ao arquivar uma Gleba, todas as Talhões e Unidades Menores filhas também são arquivadas. O contrário também vale para reativação (opcional - pode ser implementado depois).

### 5. UI Componentes - Sem biblioteca externa
**Decisão**: Construir componentes UI do zero com TailwindCSS.
**Rationale**: Controle total sobre design, pacote menor, sem dependências desnecessárias. Lucide React para ícones.
**Alternativas consideradas**: shadcn/ui (bom mas mais configuração), Radix UI (mais complexo).

### 6. Estado Local para Tree View
**Decisão**: Gerenciar estado da Tree View com React state (useState/useReducer).
**Rationale**: A hierarquia é carregada uma vez e manipulada localmente. Não precisa de Zustand ou Redux para esta funcionalidade específica.

## Risks / Trade-offs

- **[Risco] Performance com muitas áreas** → Mitigação: Paginação ou lazy loading se a propriedade tiver muitas glebas/talhões. Por enquanto, assumir que será menos de 1000 itens.
- **[Risco] Cascade pode causar arquivamento acidental** → Mitigação: Modal de confirmação antes de arquivar qualquer nível hierárquico.
- **[Trade-off] Sem autenticação nesta fase** → Aceitável para prototipagem. Será adicionada antes de produção.
- **[Trade-off] Mock inicial sem banco** → Usar React state para simular dados enquanto o schema é validado. Depois conectar ao PostgreSQL.
