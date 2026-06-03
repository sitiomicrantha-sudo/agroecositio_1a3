## Why

A página /areas precisa exibir os dados da propriedade no primeiro formulário com opção de edição, e o treeview deve iniciar apenas a partir do nível de gleba. Isso melhora a experiência do usuário ao permitir visualizar e editar dados da propriedade diretamente, sem necessidade de navegação adicional.

## What Changes

- Dados da propriedade são exibidos automaticamente no primeiro formulário da página /areas
- Adicionar botão/opção de edição para os dados da propriedade no formulário
- Modificar o treeview para iniciar apenas a partir do nível de gleba (excluindo níveis superiores como fazenda/propriedade)
- Ajustar a estrutura de dados exibida no treeview para refletir a nova hierarquia

## Capabilities

### New Capabilities
- `property-form-edit`: Formulário de exibição e edição dos dados da propriedade no primeiro passo
- `gleba-treeview`: Treeview iniciando a partir do nível de gleba

### Modified Capabilities

## Impact

- Componentes de formulário da página /areas precisarão de ajustes
- Estrutura de dados do treeview será modificada
- Possível necessidade de novos endpoints ou ajustes em endpoints existentes para suportar edição da propriedade
- Componentes de UI relacionados ao treeview e formulários serão afetados
