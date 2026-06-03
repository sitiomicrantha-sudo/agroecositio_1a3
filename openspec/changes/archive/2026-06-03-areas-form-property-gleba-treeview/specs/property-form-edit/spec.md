## ADDED Requirements

### Requirement: Exibir dados da propriedade no primeiro formulário
O sistema SHALL exibir os dados da propriedade automaticamente no primeiro formulário da página /areas quando o usuário acessar a página.

#### Scenario: Acesso à página /areas
- **WHEN** o usuário acessa a página /areas
- **THEN** o primeiro formulário é exibido com os dados da propriedade preenchidos automaticamente

#### Scenario: Dados da propriedade não disponíveis
- **WHEN** o usuário acessa a página /areas e os dados da propriedade não estão disponíveis
- **THEN** o formulário é exibido vazio com mensagem informativa

### Requirement: Opção de edição dos dados da propriedade
O sistema SHALL fornecer uma opção de edição para os dados da propriedade no primeiro formulário.

#### Scenario: Botão de edição disponível
- **WHEN** o primeiro formulário é exibido com dados da propriedade
- **THEN** um botão ou link de edição está visível para o usuário

#### Scenario: Modo de edição ativado
- **WHEN** o usuário clica na opção de edição
- **THEN** os campos do formulário ficam editáveis e um botão de salvar aparece

#### Scenario: Dados salvos com sucesso
- **WHEN** o usuário edita os dados e clica em salvar
- **THEN** os dados são atualizados no sistema e uma mensagem de sucesso é exibida

#### Scenario: Edição cancelada
- **WHEN** o usuário cancela a edição
- **THEN** os dados originais são restaurados no formulário

### Requirement: Validação dos dados editados
O sistema SHALL validar os dados da propriedade antes de salvá-los.

#### Scenario: Dados obrigatórios não preenchidos
- **WHEN** o usuário tenta salvar dados com campos obrigatórios vazios
- **THEN** uma mensagem de erro é exibida indicando os campos obrigatórios

#### Scenario: Formato inválido
- **WHEN** o usuário insere dados em formato inválido
- **THEN** uma mensagem de erro específica é exibida para o campo com formato inválido
