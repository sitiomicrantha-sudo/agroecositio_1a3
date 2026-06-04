## Context

O sistema atual gerencia zonas de permacultura via CRUD completo (banco PostgreSQL, API REST, UI). As 5 zonas são conceitos fixos do paradigma da permacultura — não devem ser editadas pelo usuário. A tela de Áreas usa layout de 2 colunas: esquerda (talhões) e direita (unidades do talhão selecionado). A coluna direita não possui botão para adicionar unidades.

## Goals / Non-Goals

**Goals:**
- Tornar zonas de permacultura constantes estáticas no código (src/lib/zonas.ts)
- Remover tabela `zonas` do banco, rotas API e página de gerenciamento
- Simplificar o fetch de zonas nas páginas Áreas e no formulário de Talhão
- Adicionar botão "Adicionar Unidade" na coluna direita (UnitGrid)
- Manter o campo "tipo" na Unidade Menor (alinhado com módulos futuros)

**Non-Goals:**
- Alterar a hierarquia Property → Talhão → Unidade
- Modificar o campo "tipo" ou seu enum neste change
- Alterar a lógica de herança visual de zona nos cards

## Decisions

### 1. Zonas como constantes estáticas
**Decisão**: Manter zonas em `src/lib/zonas.ts` como objeto `as const` com IDs predefinidos (zona_1 a zona_5). A coluna `zonaId` em `talhoes` continua armazenando strings como `"zona_1"` em vez de UUIDs.

**Alternativas consideradas**:
- Manter tabela `zonas` mas bloquear CRUD via API → Rejeitado: complexidade desnecessária, tabela sempre terá exatamente 5 registros
- Usar IDs numéricos (1-5) → Rejeitado: menos legível, conflita com possíveis UUIDs existentes

**Ração**: As zonas são um domínio fechado (5 valores fixos). Constantes no código eliminam a necessidade de banco, API e UI de gerenciamento.

### 2. Reset do banco (drop + recriar)
**Decisão**: Apagar tudo com `npx drizzle-kit drop` (ou `DROP SCHEMA public CASCADE; CREATE SCHEMA public`), atualizar schema, e recriar com `npx drizzle-kit push`. Dados de dev podem ser perdidos — seed recria tudo.

**Alternativas consideradas**:
- Criar migration para drop da tabela `zonas` → Rejeitado: trabalho desnecessário em ambiente de dev
- Manter coluna como UUID e usar seeds para popular → Rejeitado: complexidade desnecessária para dados imutáveis

**Ração**: Em dev, drop + push é rápido e limpo. Não há dados de produção a preservar.

### 3. Botão "Adicionar Unidade" no UnitGrid
**Decisão**: Adicionar botão "+" no header do UnitGrid (ao lado do título "Unidades"). Ao clicar, abre o modal de criação de unidade com o `talhaoId` pré-preenchido.

**Alternativas consideradas**:
- Botão flutuante no canto inferior → Rejeitado: pode ser coberto por conteúdo
- Adicionar no DetailPanel → Rejeitado: DetailPanel é para visualização, não ação

**Ração**: Posição natural no header do grid, consistente com o padrão "adicionar" já usado na coluna esquerda.

### 4. Manter campo "tipo"
**Decisão**: O campo `type` na tabela `unidades_menores` permanece. O enum `unidade_type` já contém valores alinhados com módulos futuros (canteiro, saf_line, piquete, galinheiro, composteira, estufa, outro).

**Nota**: Os valores do enum são exibidos diretamente no UI (ex: `saf_line`). Isso pode ser corrigido separadamente com um mapa de tradução.

## Risks / Trade-offs

- **[Trade-off] Perda de flexibilidade** → Zonas não poderão ser customizadas futuramente. Aceitável pois zonas de permacultura são um padrão fixo.
- **[Risco] Dados de dev perdidos** → Mitigation: seed recria dados de exemplo. Em produção, usar migration real.
