# Engenharia Reversa - Agroecossistio

## Visão Geral

Sistema de gestão de áreas para agricultura familiar de base ecológica. Focado em um sítio (propriedade única), gerencia a hierarquia: Propriedade → Talhões → Unidades Menores. Preparado para módulos futuros (horta, galinha, apicultura, compostagem).

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js (App Router) | 16.2.7 |
| Linguagem | TypeScript | ^5 |
| React | React | 19.2.4 |
| Banco | PostgreSQL | via `postgres` ^3.4.9 |
| ORM | Drizzle ORM | ^0.45.2 |
| Estilo | Tailwind CSS v4 | ^4 |
| Formulários | react-hook-form | ^7.77.0 |
| Ícones | lucide-react | ^1.17.0 |
| Porta | 3001 | |

## Banco de Dados (5 tabelas)

### properties
| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | uuid | PK |
| name | text | NOT NULL |
| location | text | NOT NULL |
| total_area | numeric | NOT NULL (m²) |
| owner | text | NOT NULL |
| created_at | timestamp | DEFAULT now() |
| updated_at | timestamp | DEFAULT now() |

### talhoes
| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | uuid | PK |
| property_id | uuid | FK → properties.id |
| zona_id | text | NOT NULL (zona_1..zona_5) |
| name | text | NOT NULL |
| area | numeric | NOT NULL (m²) |
| status | enum | active/archived |
| created_at | timestamp | DEFAULT now() |
| updated_at | timestamp | DEFAULT now() |

### tipos_unidade
| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | uuid | PK |
| name | text | NOT NULL |
| description | text | nullable |
| created_at | timestamp | DEFAULT now() |
| updated_at | timestamp | DEFAULT now() |

### tipo_unidade_modulos
| Coluna | Tipo | Restrição |
|--------|------|-----------|
| tipo_unidade_id | uuid | FK → tipos_unidade.id |
| modulo | text | NOT NULL |

### unidades_menores
| Coluna | Tipo | Restrição |
|--------|------|-----------|
| id | uuid | PK |
| talhao_id | uuid | FK → talhoes.id |
| tipo_unidade_id | uuid | FK → tipos_unidade.id |
| name | text | NOT NULL |
| area | numeric | nullable (m²) |
| status | enum | active/archived |
| created_at | timestamp | DEFAULT now() |
| updated_at | timestamp | DEFAULT now() |

## Hierarquia de Dados

```
properties (1)
  └── talhoes (N) [FK: property_id]
        └── unidades_menores (N) [FK: talhao_id]
              └── tipos_unidade (1) [FK: tipo_unidade_id]

tipos_unidade (1)
  └── tipo_unidade_modulos (N) [FK: tipo_unidade_id]
        modulo: "horta" | "galinha_caipira" | "compostagem"
```

## Endpoints da API

### Properties
| Método | Caminho | O que faz |
|--------|---------|-----------|
| GET | `/api/properties` | Lista todas as propriedades |
| POST | `/api/properties` | Cria propriedade |
| GET | `/api/properties/[id]` | Busca propriedade por ID |
| PUT | `/api/properties/[id]` | Atualiza propriedade |

### Talhões
| Método | Caminho | O que faz |
|--------|---------|-----------|
| GET | `/api/talhoes?propertyId=` | Lista talhões da propriedade |
| POST | `/api/talhoes` | Cria talhão (limite: 10 ativos) |
| GET | `/api/talhoes/[id]` | Busca talhão por ID |
| PUT | `/api/talhoes/[id]` | Atualiza talhão |
| DELETE | `/api/talhoes/[id]` | Arquiva talhão (+ cascade unidades) |

### Unidades Menores
| Método | Caminho | O que faz |
|--------|---------|-----------|
| GET | `/api/unidades?talhaoId=` | Lista unidades do talhão |
| POST | `/api/unidades` | Cria unidade (valida área) |
| GET | `/api/unidades/[id]` | Busca unidade por ID |
| PUT | `/api/unidades/[id]` | Atualiza unidade |
| DELETE | `/api/unidades/[id]` | Arquiva unidade |

### Tipos de Unidade
| Método | Caminho | O que faz |
|--------|---------|-----------|
| GET | `/api/tipos-unidade` | Lista todos os tipos |

## Telas

| Rota | Descrição |
|------|-----------|
| `/` | Dashboard com card de áreas + placeholders (Clima, Atividades, Produção) |
| `/areas` | Gestão completa: propriedade, talhões, unidades via modais |

## Regras de Negócio

### Zonas de Permacultura
| Zona | Nome | Descrição | Cor |
|------|------|-----------|-----|
| zona_1 | Uso diário | Horta, composteira, ervas | #16A34A |
| zona_2 | Uso frequente | Pomar, galinheiro, apiário | #65A30D |
| zona_3 | Uso menos frequente | Cultivos maiores, pastagem | #CA8A04 |
| zona_4 | Uso sazonal | Silvicultura, melíferas | #EA580C |
| zona_5 | Natureza intocada | Conservação, regeneração | #0284C7 |

### Limites
- **Máximo 10 talhões ativos por propriedade** (HTTP 409 se exceder)
- **Validação de área**: soma dos filhos ≤ pai (aviso, não bloqueia)
- **Soft delete**: arquivamento em cascata (talhão arquiva todas as unidades)

### Convenções de Área
- **Propriedade e Talhões**: armazenado em m², exibido em ha (÷ 10.000)
- **Unidades Menores**: armazenado e exibido em m²

### Dados do Seed
- 1 propriedade: "Sítio do Pica Pau Amarelo" (113.000 m² = 11.3 ha)
- 8 talhões (5 zonas diferentes)
- 9 tipos de unidade (Canteiro, Linha de SAF, Piquete, Galinheiro, Composteira, Estufa, Medicinal, Aromática, Outro)
- 3 associações tipo-módulo: Canteiro→horta, Galinheiro→galinha_caipira, Composteira→compostagem
- 7 unidades menores (5 com área, 2 sem)

## O que funciona vs. Placeholders

### ✅ Funcionando
- CRUD de propriedade (criar, ler, atualizar)
- CRUD de talhões com limite de 10
- CRUD de unidades menores com validação de área
- Visualização em 2 colunas (Talhões + Unidades)
- Dashboard com card de visão geral
- Arquivamento em cascata com reativação
- Layout responsivo (sidebar mobile/desktop)
- Visualização de zonas com cores

### 🔲 Placeholders / Não implementado
- Cards "Clima", "Atividades", "Produção" no dashboard (só skeleton)
- `tipo_unidade_modulos`: dados semeados mas sem uso
- DELETE de propriedade (não existe endpoint)
- Gestão de tipos de unidade (só leitura)
- Autenticação / autorização
- Suporte a múltiplas propriedades (UI usa `props[0]`)
- Validação acumulada de área dos talhões
- Campo "notes" (existe na interface mas não no banco)

## Arquivos (38 fontes)

```
src/
  app/
    layout.tsx
    globals.css
    (dashboard)/
      layout.tsx
      page.tsx
      areas/page.tsx
    api/
      properties/route.ts, [id]/route.ts
      talhoes/route.ts, [id]/route.ts
      unidades/route.ts, [id]/route.ts
      tipos-unidade/route.ts
  components/
    ui/ (7 componentes)
    dashboard/ (AreaOverviewCard)
    areas/ (9 componentes)
  db/
    index.ts, schema.ts, seed.ts, migrations/
  lib/
    limits.ts, zonas.ts
```
