## ADDED Requirements

### Requirement: Layout Base do Sistema
O sistema SHALL fornecer um layout responsivo com menu lateral (ou superior em mobile) para navegação entre módulos.

#### Scenario: Menu lateral em desktop
- **WHEN** usuário acessa o sistema em tela grande (>768px)
- **THEN** sistema exibe menu lateral fixo com links de navegação

#### Scenario: Menu responsivo em mobile
- **WHEN** usuário acessa o sistema em tela pequena (<=768px)
- **THEN** sistema exibe menu compacto (hamburger) que expande ao tocar

#### Scenario: Navegação entre módulos
- **WHEN** usuário clica em um link no menu
- **THEN** sistema navega para a página correspondente e destaca o item ativo

### Requirement: Dashboard com Placeholders
O sistema SHALL exibir na página inicial 4 cards com skeleton loaders representando futuros módulos.

#### Scenario: Exibir cards do dashboard
- **WHEN** usuário acessa a página inicial
- **THEN** sistema exibe 4 cards: Clima, Áreas Ativas, Atividades, Produção

#### Scenario: Skeleton loaders
- **WHEN** dashboard é carregado
- **THEN** cada card exibe um skeleton loader (animação de carregamento) simulando dados futuros

#### Scenario: Cards não interativos
- **WHEN** usuário clica em qualquer card do dashboard
- **THEN** nada acontece (cards são apenas visuais nesta fase)

### Requirement: Design Visual
O sistema SHALL utilizar design mobile-first com paleta de cores em tons de verde, terra e neutros.

#### Scenario: Paleta de cores
- **WHEN** sistema é renderizado
- **THEN** elementos utilizam cores da paleta: verdes (#22c55e, #16a34a), terras (#92400e, #78350f), neutros (#f5f5f4, #e7e5e4)

#### Scenario: Tipografia
- **WHEN** sistema é renderizado
- **THEN** utiliza fonte sans-serif legível com tamanhos adequados para uso em campo (mínimo 14px)
