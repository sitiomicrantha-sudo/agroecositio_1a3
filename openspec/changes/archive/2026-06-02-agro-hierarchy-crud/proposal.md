## Why

A propriedade agroecológica precisa de uma estrutura digital que reflita sua organização física real. Sem isso, não é possível registrar atividades de cultivo, colheita ou rastreabilidade de produtos de forma coerente com a hierarquia do terreno. A ausência de um sistema de gestão de áreas leva a dados fragmentados e dificulta decisões baseadas na realidade do campo.

## What Changes

- Criação do esqueleto completo do sistema (Next.js App Router, TailwindCSS, TypeScript)
- Implementação do CRUD para a hierarquia física: Propriedade → Gleba → Talhão → Unidade Menor
- Sistema de "Soft Delete" (Arquivamento) onde áreas nunca são removidas do banco, apenas marcadas como "Arquivado"
- Interface Tree View expansível/colapsável para visualização da hierarquia
- Toggle "Ocultar Áreas Arquivadas" com estado padrão ativado
- Ações de reativar áreas arquivadas quando o toggle estiver desativado
- Layout responsivo mobile-first com design em tons de verde/terra/neutros
- Dashboard com placeholders/skeleton loaders para futuros módulos (Clima, Áreas Ativas, Atividades, Produção)
- Schema do banco de dados (Drizzle ORM) com chaves estrangeiras e cascade para arquivamento
- Deploy via Coolify com PostgreSQL + Tailscale

## Capabilities

### New Capabilities

- `property-hierarchy-crud`: CRUD completo para a hierarquia física da propriedade (Propriedade, Gleba, Talhão, Unidade Menor) com soft delete, tree view e filtros
- `dashboard-layout`: Layout base do sistema com menu lateral responsivo e página inicial com placeholders
- `database-schema`: Schema do Drizzle ORM com modelagem das tabelas, relações e enums de status

### Modified Capabilities

<!-- Nenhuma capacidade modificada - projeto novo -->

## Impact

- **Código**: Novo projeto Next.js do zero - estrutura de pastas `src/app`, `src/components`, `src/lib`, `src/db`
- **Dependências**: next, react, tailwindcss, lucide-react, drizzle-orm, drizzle-kit, postgres (ou pg)
- **Banco de Dados**: Criação de 4 tabelas (properties, glebas, talhoes, unidades_menores) com relações hierárquicas
- **Deploy**: Configuração inicial para Coolify com variável de ambiente DATABASE_URL
- **APIs**: Rotas de API REST para CRUD de cada nível da hierarquia
