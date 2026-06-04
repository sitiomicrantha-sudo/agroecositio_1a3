## MODIFIED Requirements

### Requirement: Limite de Talhões por Propriedade
O sistema SHALL permitir no máximo 10 Talhões ativos por Propriedade. A contagem considera apenas Talhões com Status='active'.

#### Scenario: Criar 10o talhão com sucesso
- **WHEN** Propriedade possui exatamente 9 Talhões ativos
- **THEN** sistema permite criar o 10o Talhão com sucesso

#### Scenario: Bloquear 11o talhão
- **WHEN** Propriedade já possui 10 Talhões ativos e usuário tenta criar novo Talhão
- **THEN** sistema retorna HTTP 409 com mensagem "Limite de 10 talhões por propriedade atingido." e não cria o Talhão

#### Scenario: Contagem ignora arquivados
- **WHEN** Propriedade possui 10 Talhões sendo que 2 estão arquivados
- **THEN** sistema permite criar novo Talhão (contagem considera apenas ativos)

#### Scenario: Frontend desabilita botão no limite
- **WHEN** Propriedade já possui 10 Talhões ativos
- **THEN** sistema desabilita o botão "Adicionar Talhão" (+) e exibe tooltip "Limite de 10 talhões atingido"

### Requirement: Validação server-side como fonte de verdade
O sistema SHALL validar limites exclusivamente no backend. O frontend aplica restrições visuais como conveniência, mas o backend é a única fonte de verdade.

#### Scenario: Frontend desabilitado não impede POST direto
- **WHEN** frontend desabilita botão por limite atingido, mas usuário envia POST direto à API `/api/talhoes`
- **THEN** backend valida limite e retorna HTTP 409 — sistema permanece consistente

### Requirement: Validação de Área (Aviso)
O sistema SHALL validar se a soma das áreas dos filhos não excede a área do pai, emitiendo aviso (não bloqueio).

#### Scenario: Aviso ao exceder área do talhão
- **WHEN** soma das áreas das Unidades Menores de um Talhão excede a área do Talhão
- **THEN** sistema exibe aviso "A área total das unidades excede a área do talhão" mas permite salvar

#### Scenario: Aviso ao exceder área da propriedade
- **WHEN** soma das áreas dos Talhões excede a área da Propriedade
- **THEN** sistema exibe aviso "A área total dos talhões excede a área da propriedade" mas permite salvar

#### Scenario: Unidade sem área não valida
- **WHEN** Unidade Menor não possui área registrada (null)
- **THEN** sistema ignora essa unidade no cálculo de validação de área

#### Scenario: Área dentro do limite
- **WHEN** soma das áreas dos filhos não excede a área do pai
- **THEN** sistema não exibe nenhum aviso
