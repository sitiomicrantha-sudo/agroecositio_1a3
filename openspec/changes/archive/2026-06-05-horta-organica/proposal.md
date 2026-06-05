## Why

O sítio já possui a estrutura de áreas completa (Propriedade → Talhões → Unidades Menores) com tipos de unidade como "Canteiro" associados ao módulo "horta". O próximo passo natural é implementar o módulo de gestão de horta orgânica, permitindo registrar cultivos, plantios, colheitas e sementes/mudas a nível de canteiro. Isso habilita a rastreabilidade de produtos da horta (alface, couve, etc.) e futuremente a geração de etiquetas com QR code.

## What Changes

- Adiciona tabela `cultivos` para registrar o que está plantado em cada canteiro
- Adiciona tabela `eventos_cultivo` para registrar eventos (plantio, adubação, colheita, etc.)
- Adiciona tabela `inventario_sementes` para controlar sementes/mudas disponíveis
- Adiciona página `/horta` com visão geral dos cultivos ativos
- Adiciona API para CRUD de cultivos e eventos
- Adiciona API para inventário de sementes
- Integra com a hierarquia existente: cultivo pertence a uma unidade menor (canteiro)
- Tipo de unidade "Canteiro" é o principal receptor de cultivos

## Capabilities

### New Capabilities
- `cultivos`: CRUD de cultivos vinculados a unidades menores (canteiros). Registra cultura, variedade, data de plantio, previsão de colheita, status.
- `eventos-cultivo`: Registro de eventos ao longo do ciclo do cultivo (plantio, adubação, irrigação, pulverização, colheita). Cada evento tem data, tipo, descrição e quantidade.
- `inventario-sementes`: Controle de sementes e mudas disponíveis no sítio. Registra nome, quantidade, unidade, fornecedor, validade.
- `horta-page`: Página principal do módulo horta com visão geral dos cultivos ativos, calendário e inventário.

### Modified Capabilities
(nenhuma alteração em specs existentes)

## Impact

- Database: Novas tabelas `cultivos`, `eventos_cultivo`, `inventario_sementes`
- API: Novos endpoints `/api/cultivos`, `/api/eventos-cultivo`, `/api/inventario-sementes`
- Frontend: Nova página `/horta` com sub-componentes
- Seed: Dados de exemplo com cultivos e eventos
- Menu: Adicionar "Horta" na navegação do sidebar
