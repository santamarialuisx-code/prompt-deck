# Prompt Cards Redesign Specification

## Purpose

Redesign the existing prompt card components with glassmorphism treatment, hover effects, category badges with accent colors, and improved grid layout. This upgrades the gallery and sample prompt displays from flat cards to premium interactive elements.

## Requirements

### Requirement: Glassmorphism Card Treatment

The system SHALL apply glassmorphism styling to all prompt cards in the gallery and sample sections.

Card treatment: semi-transparent background (`bg-white/[0.03]`), backdrop-blur, subtle white border (`border-white/[0.08]`), rounded corners using brand radius. Cards SHALL replace the current flat/white card styling.

#### Scenario: Gallery card renders with glassmorphism

- GIVEN a user navigates to the gallery page
- WHEN prompt cards render
- THEN each card has a semi-transparent background
- AND the backdrop blur is visible when cards overlap gradient backgrounds
- AND borders appear as subtle white edges

#### Scenario: Card styling is consistent across pages

- GIVEN prompt cards appear on both the home page (sample section) and gallery page
- WHEN both pages render
- THEN cards share identical glassmorphism treatment
- AND only content differs, not visual style

### Requirement: Hover Effects

The system SHALL add hover interactions to prompt cards: glow effect, subtle scale, gradient reveal.

Hover state: box-shadow glow using the card's category accent color, scale transform to 1.02, border gradient reveal. Hover effects SHALL use CSS transitions (0.2s ease). SHALL respect `prefers-reduced-motion`.

#### Scenario: Card hover glow on desktop

- GIVEN a user hovers over a prompt card on a desktop viewport
- WHEN the hover event fires
- THEN a subtle glow appears around the card in the category's accent color
- AND the card scales up slightly (1.02)

#### Scenario: No hover on touch devices

- GIVEN a user views cards on a touch device
- WHEN cards render
- THEN hover effects are not applied
- AND cards display in their default state

#### Scenario: Reduced motion disables hover animation

- GIVEN a user has `prefers-reduced-motion: reduce`
- WHEN hovering over a card
- THEN scale and glow transitions are instant (no animation)
- AND the card still shows visual state change (just without transition)

### Requirement: Category Badges with Accent Colors

The system SHALL display category badges on each prompt card using the brand accent colors.

Each category SHALL map to a specific accent color: Portrait → violet, Landscape → cyan, Abstract → magenta, etc. Badges SHALL use the badge component with category-specific color variant. Badges SHALL be positioned at the top-right or top-left of the card.

#### Scenario: Category badge displays correct color

- GIVEN a prompt card belongs to the "Portrait" category
- WHEN the card renders
- THEN the category badge displays in violet
- AND the badge text reads "Portrait"

#### Scenario: All category colors are distinct

- GIVEN prompt cards from all categories render
- WHEN viewed together
- THEN each category has a unique accent color
- AND badges are visually distinguishable from each other

### Requirement: Grid Layout Improvements

The system SHALL improve the prompt card grid layout with consistent spacing, responsive breakpoints, and proper aspect ratios.

Grid: CSS Grid with `auto-fill` and `minmax(300px, 1fr)`. Cards SHALL have consistent min-height. Gap SHALL use the brand spacing scale. The grid SHALL handle 0, 1, 2, and many cards gracefully.

#### Scenario: Grid fills available space

- GIVEN the gallery page renders with 12 prompt cards
- WHEN the grid layout applies
- THEN cards fill the available width with 2-3 columns on desktop
- AND no orphan cards create awkward empty space

#### Scenario: Empty state renders correctly

- GIVEN the gallery has no cards matching the current filter
- WHEN the grid renders
- THEN an empty state message is displayed
- AND no broken layout or console errors occur

#### Scenario: Single card centers in grid

- GIVEN the gallery has only 1 prompt card
- WHEN the grid renders
- THEN the card is centered or left-aligned consistently
- AND does not stretch to full width awkwardly

## Constraints

- MUST use glassmorphism tokens from aurora-brand-system
- MUST use category accent colors from the brand palette
- MUST use Lucide React icons (replace any existing hand-rolled SVGs or emojis)
- MUST preserve existing card content structure (title, description, category, preview)
- MUST NOT change the card's data model or props interface

## Out of Scope

- Card click/detail view behavior (unchanged)
- Prompt preview image rendering (existing behavior)
- Drag-and-drop card reordering
- Card animation on page load (handled by section-level animations)
- Prompt favorites/bookmarks functionality
