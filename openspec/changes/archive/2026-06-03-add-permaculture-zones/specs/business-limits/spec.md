## ADDED Requirements

### Requirement: Limite de Glebas por Propriedade
O sistema SHALL permitir no máximo 3 Glebas ativas por Propriedade. A contagem considera apenas Glebas com Status='Ativo'.

#### Scenario: Criar 3a gleba com sucesso
- **WHEN** Propriedade possui exatamente 2 Glebas ativas
- **THEN** sistema permite criar a 3a Gleba com sucesso

#### Scenario: Bloquear 4a gleba
- **WHEN** Propriedade já possui 3 Glebas ativas e usuário tenta criar nova Gleba
- **THEN** sistema retorna HTTP 409 com mensagem "Limite de 3 glebas por propriedade atingido." e não cria a Gleba

#### Scenario: Contagem ignora arquivadas
- **WHEN** Propriedade possui 3 Glebas sendo que 1 está arquivada (Status='Arquivado')
- **THEN** sistema permite criar nova Gleba (contagem considera apenas ativas)

#### Scenario: Frontend desabilita botão no limite
- **WHEN** Propriedade já possui 3 Glebas ativas
- **THEN** sistema desabilita o botão "Adicionar Gleba" (+) e exibe tooltip "Limite de 3 glebas atingido"

### Requirement: Limite de Talhões por Gleba
O sistema SHALL permitir no máximo 10 Talhões ativos por Gleba. A contagem considera apenas Talhões com Status='Ativo'.

#### Scenario: Criar 10o talhão com sucesso
- **WHEN** Gleba possui exatamente 9 Talhões ativos
- **THEN** sistema permite criar o 10o Talhão com sucesso

#### Scenario: Bloquear 11o talhão
- **WHEN** Gleba já possui 10 Talhões ativos e usuário tenta criar novo Talhão
- **THEN** sistema retorna HTTP 409 com mensagem "Limite de 10 talhões por gleba atingido." e não cria o Talhão

#### Scenario: Contagem ignora arquivados
- **WHEN** Gleba possui 10 Talhões sendo que 2 estão arquivados
- **THEN** sistema permite criar novo Talhão (contagem considera apenas ativos)

#### Scenario: Frontend desabilita botão no limite
- **WHEN** Gleba já possui 10 Talhões ativos
- **THEN** sistema desabilita o botão "Adicionar Talhão" (+) e exibe tooltip "Limite de 10 talhões atingido"

### Requirement: Validação server-side como fonte de verdade
O sistema SHALL validar limites exclusivamente no backend. O frontend aplica restrições visuais como conveniência, mas o backend é a única fonte de verdade.

#### Scenario: Frontend desabilitado não impede POST direto
- **WHEN** frontend desabilita botão por limite atingido, mas usuário envia POST direto à API `/api/talhoes`
- **THEN** backend valida limite e retorna HTTP 409 — sistema permanece consistente
