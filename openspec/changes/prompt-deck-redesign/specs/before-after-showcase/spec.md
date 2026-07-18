# Before/After Showcase Specification

## Purpose

Define a visual comparison component that demonstrates the value of AI image prompts by showing the transformation from generic prompts to professional results. This is the primary "proof of value" element for converting visitors.

## Requirements

### Requirement: Visual Comparison Component

The system SHALL render a side-by-side or stacked visual comparison showing prompt input and generated result.

Each comparison item SHALL contain: prompt text (input), generated image or description (output), category label. The component SHALL support both side-by-side (desktop) and stacked (mobile) layouts.

#### Scenario: Desktop side-by-side comparison

- GIVEN a user views the before/after section on a 1024px+ viewport
- WHEN the component renders
- THEN prompt text and result are displayed side by side
- AND a visual divider or arrow indicates the transformation

#### Scenario: Mobile stacked comparison

- GIVEN a user views the before/after section on a 375px viewport
- WHEN the component renders
- THEN prompt text appears above the result
- AND a visual indicator (arrow, label) connects them

### Requirement: Prompt → Result Display

The system SHALL display the full prompt text used to generate the image, alongside the visual result.

The prompt text SHALL be styled in a monospace font (Geist Mono) to indicate it is code-like input. The result SHALL be displayed as an image or detailed description with the category badge.

#### Scenario: Prompt text renders in monospace

- GIVEN a comparison item displays a prompt
- WHEN rendered
- THEN the prompt text uses Geist Mono font
- AND the text is readable at the defined caption size

#### Scenario: Category badge displays

- GIVEN a comparison item has a category
- WHEN rendered
- THEN a colored badge (using accent colors) shows the category name
- AND the badge is positioned near the image or title

### Requirement: Category Filtering

The system SHALL allow users to filter comparison items by category.

Categories SHALL match the existing prompt categories (Portrait, Landscape, Abstract, etc.). A tab or button group SHALL allow switching between "All" and individual categories. The active filter SHALL be visually indicated.

#### Scenario: Category filter renders

- GIVEN a user views the before/after section
- WHEN the filter controls render
- THEN category tabs/buttons are visible above the comparison grid
- AND "All" is selected by default

#### Scenario: Filtering updates visible items

- GIVEN a user clicks a category filter
- WHEN the filter activates
- THEN only comparison items matching that category are visible
- AND items animate out/in with a smooth transition

#### Scenario: Filter resets to all

- GIVEN a user has filtered to a specific category
- WHEN they click "All"
- THEN all comparison items become visible again

### Requirement: Responsive Grid Layout

The system SHALL display comparison items in a responsive grid.

Desktop: 2 columns. Tablet: 2 columns with reduced spacing. Mobile: 1 column full-width. Items SHALL have consistent card treatment with glassmorphism.

#### Scenario: Grid adapts to viewport

- GIVEN a user resizes the browser from 1440px to 375px
- WHEN the grid re-renders
- THEN columns reduce from 2 to 1
- AND card spacing adjusts responsively

## Constraints

- MUST use glassmorphism tokens from aurora-brand-system
- MUST use category accent colors from the brand palette
- MUST use Lucide React icons for filter controls
- MUST use tw-animate-css for filter transitions
- MUST NOT include real user-generated images without consent — use example/descriptive content

## Out of Scope

- Actual AI image generation integration
- User-uploaded before/after comparisons
- Drag-to-reveal slider interaction
- Video comparisons
- Full prompt text reveal for premium prompts (keep free sample scope)
