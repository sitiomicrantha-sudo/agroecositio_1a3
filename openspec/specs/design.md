## Context

O sistema já possui a hierarquia completa: Propriedade → Talhões → Unidades Menores. O tipo de unidade "Canteiro" está associado ao módulo "horta" na tabela `tipo_unidade_modulos`. A estrutura de dados está pronta para receber o módulo de gestão de horta orgânica.

O foco é agricultura familiar de base ecológica. O módulo deve ser simples, intuitivo e permitir rastreabilidade de produtos a nível de canteiro.

## Goals / Non-Goals

**Goals:**
- Registrar cultivos em canteiros (o que, quando, onde)
- Registrar eventos ao longo do ciclo (plantio, adubação, colheita)
- Controlar inventário de sementes/mudas
- Página `/horta` com visão geral dos cultivos ativos
- Preparar para futura geração de etiquetas com QR code

**Non-Goals:**
- Gestão financeira (custos, receitas)
- Gestão de irrigação automática
- Integração com sensores
- Relatórios avançados (futuro)
- Múltiplos usuários/autenticação

## Decisions

### Decisão 1: Cultivo vinculado à unidade menor (canteiro)

**Escolha:** Um cultivo pertence a uma `unidade_menores` (canteiro). Um canteiro pode ter múltiplos cultivos ao longo do tempo, mas apenas 1 ativo por vez.

**Alternativas:**
- Cultivo vinculado ao talhão: Muito grosseiro, não permite rastreabilidade por canteiro
- Cultivo com data de início/fim: Permite múltiplos históricos, mas mais complexo

**Razão:** Um canteiro fisicamente só pode ter um cultivo ativo por vez (não se planta alface e couve no mesmo canteiro ao mesmo tempo). O histórico fica no registro de eventos.

### Decisão 2: Eventos como tabela separada

**Escolha:** Tabela `eventos_cultivo` com tipo (plantio, adubação, colheita, etc.), data, descrição e quantidade.

**Razão:** Permite rastrear todo o ciclo do cultivo sem sobrecarregar a tabela principal. Cada evento é imutável (append-only). Facilita futuras consultas de histórico para QR code.

### Decisão 3: Inventário de sementes separado

**Escolha:** Tabela `inventario_sementes` independente dos cultivos.

**Razão:** O inventário é um estoque que existe independentemente de estar sendo usado em um cultivo. Um pacote de semente pode ter sido comprado e estar no estoque sem estarplantado ainda.

### Decisão 4: Status do cultivo

**Escolha:** Enum `status_cultivo`: planejado, ativo, colhido, cancelado.

**Razão:** Permite rastrear o ciclo completo. "Planejado" para quando o usuário sabe que vai plantar mas ainda não plantou. "Cancelado" para quando desistiu do plantio.

### Decisão 5: Sem campos de imagem neste módulo

**Escolha:** Não incluir upload de imagens neste change.

**Razão:** Complexidade de upload/armazenamento. Pode ser adicionado futuramente. O foco é dados textuais e numéricos.

## Risks / Trade-offs

### Risco 1: Multiple cultivos ativos no mesmo canteiro
**Risco:** Usuário pode tentar criar 2 cultivos ativos no mesmo canteiro
**Mitigação:** Validar no backend que só pode existir 1 cultivo com status "ativo" por canteiro

### Risco 2: Dados semeados vs dados reais
**Risco:** Seed pode não refletir a realidade do sítio
**Mitigação:** Seed com dados de exemplo claros, fácil de apagar e recomeçar

### Risco 3: Tabelas sem uso futuro
**Risco:** Inventário de sementes pode não ser usado imediatamente
**Mitigação:** Custos mínimos. Preparação vale a pena para o módulo completo

## Migration Plan

1. Criar novas tabelas (`cultivos`, `eventos_cultivo`, `inventario_sementes`)
2. Criar seed com dados de exemplo
3. Criar endpoints da API
4. Criar página `/horta` com componentes
5. Adicionar "Horta" na navegação
6. Testar fluxo completo

## Open Questions

- Deve haver limite de cultivos por canteiro? (1 ativo por vez parece suficiente)
- Eventos devem ter campo "responsável"? (pode ser texto livre por enquanto)
- Inventário deve ter controle de quantidade decrescente quando usa semente em um cultivo? (futuro)
