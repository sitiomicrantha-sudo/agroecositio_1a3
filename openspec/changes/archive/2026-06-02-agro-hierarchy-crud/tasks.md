## 1. Setup do Projeto

- [x] 1.1 Inicializar projeto Next.js com App Router e TypeScript
- [x] 1.2 Configurar TailwindCSS com paleta de cores verde/terra/neutro
- [x] 1.3 Instalar dependências: lucide-react, drizzle-orm, drizzle-kit, postgres
- [x] 1.4 Criar estrutura de pastas: src/app, src/components, src/lib, src/db
- [x] 1.5 Criar arquivo .env.example com DATABASE_URL
- [x] 1.6 Configurar drizzle.config.ts

## 2. Schema do Banco de Dados

- [x] 2.1 Criar src/db/schema.ts com tabela properties
- [x] 2.2 Adicionar tabela glebas com FK para properties
- [x] 2.3 Adicionar tabela talhoes com FK para glebas
- [x] 2.4 Adicionar tabela unidades_menores com FK para talhoes
- [x] 2.5 Definir enums status ('active'/'archived') e unidade_type
- [x] 2.6 Criar src/db/index.ts com conexão PostgreSQL via DATABASE_URL
- [x] 2.7 Gerar e rodar migration inicial

## 3. API Routes - CRUD Propriedade

- [x] 3.1 Criar GET /api/properties (listar)
- [x] 3.2 Criar POST /api/properties (criar)
- [x] 3.3 Criar GET /api/properties/[id] (buscar)
- [x] 3.4 Criar PUT /api/properties/[id] (atualizar)

## 4. API Routes - CRUD Glebas

- [x] 4.1 Criar GET /api/glebas?propertyId=X (listar)
- [x] 4.2 Criar POST /api/glebas (criar)
- [x] 4.3 Criar GET /api/glebas/[id] (buscar)
- [x] 4.4 Criar PUT /api/glebas/[id] (atualizar)
- [x] 4.5 Criar DELETE /api/glebas/[id] (arquivar com cascade)

## 5. API Routes - CRUD Talhões

- [x] 5.1 Criar GET /api/talhoes?glebaId=X (listar)
- [x] 5.2 Criar POST /api/talhoes (criar)
- [x] 5.3 Criar GET /api/talhoes/[id] (buscar)
- [x] 5.4 Criar PUT /api/talhoes/[id] (atualizar)
- [x] 5.5 Criar DELETE /api/talhoes/[id] (arquivar com cascade)

## 6. API Routes - CRUD Unidades Menores

- [x] 6.1 Criar GET /api/unidades?talhaoId=X (listar)
- [x] 6.2 Criar POST /api/unidades (criar)
- [x] 6.3 Criar GET /api/unidades/[id] (buscar)
- [x] 6.4 Criar PUT /api/unidades/[id] (atualizar)
- [x] 6.5 Criar DELETE /api/unidades/[id] (arquivar)

## 7. Componentes Base UI

- [x] 7.1 Criar componentes Button, Card, Input, Select, Toggle em src/components/ui
- [x] 7.2 Criar componente Modal de confirmação
- [x] 7.3 Criar componente Skeleton loader

## 8. Layout e Dashboard

- [x] 8.1 Criar layout.tsx com menu lateral responsivo
- [x] 8.2 Criar página Dashboard (src/app/(dashboard)/page.tsx) com 4 cards placeholder
- [x] 8.3 Implementar skeleton loaders nos cards do dashboard

## 9. Módulo de Áreas - Tree View

- [x] 9.1 Criar componente TreeView.tsx (container da árvore)
- [x] 9.2 Criar componente TreeNode.tsx (nó expansível/colapsável)
- [x] 9.3 Implementar lógica de expansão/colapso dos nós
- [x] 9.4 Criar componente FilterToggle.tsx (Ocultar Arquivadas)
- [x] 9.5 Integrar filtro com estado da Tree View

## 10. Módulo de Áreas - Formulários

- [x] 10.1 Criar formulário de Propriedade (nome, localização, área, proprietário)
- [x] 10.2 Criar formulário de Gleba (nome, área, observações)
- [x] 10.3 Criar formulário de Talhão (nome, área)
- [x] 10.4 Criar formulário de Unidade Menor (nome, tipo dropdown)
- [x] 10.5 Implementar formulário inline com botão "Adicionar outro" para Unidades Menores

## 11. Módulo de Áreas - Ações

- [x] 11.1 Implementar ação de Arquivar com modal de confirmação
- [x] 11.2 Implementar cascade de arquivamento (Gleba → Talhões → Unidades)
- [x] 11.3 Implementar ação de Reativar (apenas quando toggle desativado)
- [x] 11.4 Integrar ações com API routes

## 12. Página de Gerenciamento de Áreas

- [x] 12.1 Criar página src/app/(dashboard)/areas/page.tsx
- [x] 12.2 Integrar TreeView com dados da API
- [x] 12.3 Integrar formulários com API routes
- [x] 12.4 Testar fluxo completo: criar, editar, arquivar, reativar
