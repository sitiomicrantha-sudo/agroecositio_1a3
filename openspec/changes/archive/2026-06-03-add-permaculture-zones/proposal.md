## Why

O sistema precisa refletir a realidade agroecológica do sítio de forma que faça sentido para o manejo diário. A hierarquia atual (Propriedade > Gleba > Talhão > Unidade) representa a topologia física, mas falta a camada semântica que define **intensidade de manejo** — algo central na permacultura. Sem isso, a ferramenta não consegue comunicar a diferença entre um canteiro de horta (manejo diário) e uma área de reserva (sem manejo), tornando o planejamento de cultivos, rastreio e gestão menos eficaz.

Além disso, o cadastro de zonas precisa ser flexível: o usuário pode querer personalizar nomes, descrições ou adicionar zonas customizadas — não é um conceito fechado.

## What Changes

- **Zonas como tabela própria** — CRUD completo com nome, label, descrição, cor, ícone e ordem. Substitui o que seria um enum por uma entidade gerenciável.
- **Talhão ganha FK para zona** — o talhão (unidade viva de manejo) referencia a zona ao ser cadastrado ou editado.
- **Visual de zonas em toda a UI** — cores, badges e ícones de zona aparecem na listagem de talhões, na grade de unidades e no painel de detalhes.
- **Limites de negócio** — máximo de 3 glebas por propriedade e 10 talhões por gleba, validados no backend e comunicados no frontend (botões desabilitados + tooltip).
- **Layout 3 colunas na página Áreas** — coluna 1: glebas, coluna 2: talhões da gleba selecionada (com badges de zona), coluna 3: grade de unidades do talhão selecionado. Substitui a tree view aninhada atual.
- **Seed completo do banco** — wipe do banco (dados de teste) e população com as 5 zonas de permacultura, uma propriedade padrão e estrutura inicial de glebas/talhões/unidades.
- **Novo menu "Zonas" na sidebar** — acesso direto ao cadastro de zonas.
- **Bug fix: handleGlebaSubmit** — no modo edição, o submit enviava `data` sem `propertyId`; corrigido para enviar `body` completo.

## Capabilities

### New Capabilities
- `permaculture-zones`: CRUD de zonas de permacultura. Cada zona tem nome, label, descrição, cor (hex), ícone (emoji) e ordem de exibição. As 5 zonas padrão (Z1-Uso diário, Z2-Uso frequente, Z3-Uso menos frequente, Z4-Uso sazonal, Z5-Natureza intocada) são criadas no seed inicial. As zonas são referenciadas por FK na tabela de talhões.
- `area-topology`: Layout de 3 colunas na página Áreas (glebas → talhões → unidades). A coluna de talhões exibe badges coloridos por zona. A coluna de unidades usa grade de cards responsiva. Selecionar um item em uma coluna filtra a próxima. Inclui painel de detalhes do item selecionado.
- `business-limits`: Validação de limites máximo (3 glebas por propriedade, 10 talhões por gleba). Backend retorna HTTP 409 com mensagem quando limite é atingido. Frontend desabilita botões "+" e exibe tooltip explicativo antes mesmo do submit.

### Modified Capabilities
- `area-management`: O cadastro de talhões agora inclui seleção de zona (antes não existia). O submit de gleba em modo edição corrige bug que omitia `propertyId`. A visualização da estrutura de áreas deixa de ser tree aninhada e passa a ser layout 3 colunas.

## Impact

- **Schema do banco**: Nova tabela `zonas`, nova FK `zonaId` em `talhoes`. Migration com wipe e seed inicial.
- **APIs**: Novas rotas `/api/zonas` e `/api/zonas/[id]` (CRUD). Rotas `/api/talhoes` e `/api/talhoes/[id]` passam a aceitar `zonaId`.
- **Frontend**: Novos componentes de zona (ZonaList, ZonaForm, página Zonas). Refatoração de TreeView, TreeNode, AreasPage, TalhaoForm. Novo layout 3 colunas. Integração de cores/badges de zona. Limites visuais nos botões.
- **Banco de dados**: Wipe completo (apenas dados de teste) e seed com estrutura inicial da propriedade (Sítio do Pica Pau Amarelo) e 5 zonas de permacultura.
- **Dependências**: Nenhuma nova dependência externa. Usa componentes UI existentes (Button, Input, Select, Modal).
