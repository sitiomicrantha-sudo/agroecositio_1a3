## Context

A página /areas atualmente possui um formulário inicial e um treeview para navegação da estrutura de áreas. Os dados da propriedade não são exibidos automaticamente no primeiro formulário, e o treeview começa a partir de um nível superior (provavelmente fazenda/propriedade), quando deveria iniciar apenas a partir de gleba.

Stakeholders: Usuários do sistema que precisam visualizar e gerenciar áreas de propriedades rurais.

## Goals / Non-Goals

**Goals:**
- Exibir dados da propriedade automaticamente no primeiro formulário da página /areas
- Permitir edição dos dados da propriedade diretamente no formulário
- Modificar o treeview para iniciar apenas a partir do nível de gleba
- Manter a funcionalidade existente de navegação e edição de áreas

**Non-Goals:**
- Alterar a estrutura de dados do backend (modelos de banco de dados)
- Modificar permissões de acesso
- Implementar novos endpoints de API não relacionados à visualização/edição da propriedade
- Alterar a hierarquia completa da estrutura de áreas (apenas o treeview)

## Decisions

### Decisão 1: Formulário de Propriedade no Primeiro Passo
**Escolha**: Criar um componente de formulário dedicado para exibir e editar dados da propriedade no primeiro passo do wizard/formulário da página /areas.
**Alternativas consideradas**:
- Modificar o formulário existente: Requeria muitas mudanças e poderia quebrar funcionalidades existentes
- Criar um novo componente dedicado: Permite isolamento de responsabilidades e facilita manutenção

### Decisão 2: Treeview Iniciando em Gleba
**Escolha**: Filtrar a estrutura de dados do treeview para mostrar apenas a partir do nível de gleba, excluindo níveis superiores (fazenda, propriedade).
**Alternativas consideradas**:
- Configurar o treeview para ocultar visualmente os níveis superiores: Manteria dados desnecessários carregados
- Filtrar os dados antes de passar para o treeview: Mais eficiente, reduz carga de processamento no frontend

### Decisão 3: Estado de Edição do Formulário
**Escolha**: Implementar um sistema de toggle entre modo visualização e edição, usando estados do componente.
**Alternativas consideradas**:
- Modal de edição: Mais complexo e menos integrado à experiência do usuário
- Inline editing com toggle: Mais simples e intuitivo para o usuário

## Risks / Trade-offs

- **[Risco] Performance**: Carregar dados da propriedade no primeiro formulário pode aumentar o tempo de carregamento inicial → **Mitigação**: Implementar carregamento lazy ou skeleton loading
- **[Risco] Compatibilidade**: Mudanças no treeview podem afetar outras partes do sistema que dependem da estrutura atual → **Mitigação**: Verificar todas as dependências antes de implementar e testar extensivamente
- **[Trade-off] Complexidade**: Adicionar edição inline aumenta a complexidade do componente → **Benefício**: Melhora significativa na experiência do usuário
- **[Risco] Dados Desatualizados**: Edição da propriedade pode causar inconsistências se não houver sincronização adequada → **Mitigação**: Implementar validação e tratamento de erros adequados
