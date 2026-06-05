## ADDED Requirements

### Requirement: Página de gestão de horta
The system SHALL provide a page at `/horta` for managing the organic garden module.

#### Scenario: Acessar página horta
- **WHEN** user navigates to `/horta`
- **THEN** system displays the horta management page with cultivos ativos, inventário and quick actions

### Requirement: Visão geral dos cultivos ativos
The system SHALL display a list of all active cultivos with their status and key information.

#### Scenario: Listar cultivos ativos
- **WHEN** user views the horta page
- **THEN** system shows all cultivos with status "ativo" grouped by canteiro, including cultura, variedade, data plantio and previsão colheita

#### Scenario: Nenhum cultivo ativo
- **WHEN** user views the horta page and there are no active cultivos
- **THEN** system shows empty state message "Nenhum cultivo ativo"

### Requirement: Criar cultivo rápido
The system SHALL provide a quick action button to create a new cultivo.

#### Scenario: Botão criar cultivo
- **WHEN** user clicks "Novo Cultivo" button
- **THEN** system opens a modal form with fields for unidadeId (canteiro), cultura, variedade, dataPlantio, previsaoColheita, status

### Requirement: Navegação para inventário
The system SHALL provide access to the inventário de sementes from the horta page.

#### Scenario: Acessar inventário
- **WHEN** user clicks "Inventário de Sementes" link
- **THEN** system navigates to inventário section or opens inventário modal

### Requirement: Menu de navegação horta
The system SHALL include "Horta" in the sidebar navigation.

#### Scenario: Sidebar horta
- **WHEN** user views the sidebar
- **THEN** system shows "Horta" link with Sprout icon, linking to `/horta`
