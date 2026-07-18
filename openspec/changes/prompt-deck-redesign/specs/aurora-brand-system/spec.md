# Aurora Brand System Specification

## Purpose

Define the foundational design token system for the Aurora Dark visual identity. Provides CSS custom properties, gradient utilities, glassmorphism tokens, typography scales, and animation primitives consumed by all other components.

## Requirements

### Requirement: Color Palette Custom Properties

The system SHALL define CSS custom properties in `app/globals.css` for the Aurora Dark palette.

Base colors: navy `#09090B`, surface `#18181B`, muted `#27272A`. Accent colors: violet `#8B5CF6`, cyan `#22D3EE`, magenta `#EC4899`. Text colors: primary `#FAFAFA`, secondary `#A1A1AA`, muted `#71717A`.

#### Scenario: Dark palette loads on page

- GIVEN a user opens any page in the app
- WHEN the page renders
- THEN all elements referencing `--color-*` custom properties display the Aurora Dark palette
- AND no hardcoded hex values appear in component files

#### Scenario: Palette survives Tailwind rebuild

- GIVEN a Tailwind CSS v4 build cycle
- WHEN globals.css is processed
- THEN all custom properties remain in the output CSS
- AND utility classes like `text-violet` resolve to the defined accent colors

### Requirement: Gradient Utilities

The system SHALL provide composable CSS gradient utilities for backgrounds and text.

Gradient tokens: `--gradient-brand` (cyan→violet→magenta), `--gradient-subtle` (violet/10→cyan/10), `--gradient-mesh` (layered radial-gradients for hero backgrounds).

#### Scenario: Brand gradient applies to element background

- GIVEN a component uses `bg-[var(--gradient-brand)]`
- WHEN rendered
- THEN the element displays a smooth cyan→violet→magenta gradient

#### Scenario: Gradient text applies to headings

- GIVEN a heading uses the gradient text utility
- WHEN rendered
- THEN the text fill displays the brand gradient via `background-clip: text`

### Requirement: Glassmorphism Tokens

The system SHALL define glassmorphism design tokens for card and surface treatments.

Tokens: background `rgba(255,255,255,0.03)`, backdrop-blur `xl` (24px), border `rgba(255,255,255,0.08)`, shadow with subtle inset glow.

#### Scenario: Glass card renders with blur and transparency

- GIVEN a component applies glassmorphism tokens
- WHEN rendered over a gradient background
- THEN the background behind the card is visible through a blur effect
- AND the card border appears as a faint white edge

#### Scenario: Glass card degrades gracefully

- GIVEN a browser that does not support `backdrop-filter`
- WHEN a glassmorphism card renders
- THEN the card displays a solid semi-transparent background without blur
- AND no layout shift or broken styling occurs

### Requirement: Typography Scale

The system SHALL extend the Tailwind typography scale with brand-specific heading sizes and weights.

Scale: `display` (4rem/700), `heading-1` (3rem/700), `heading-2` (2rem/600), `body` (1rem/400), `caption` (0.875rem/400). Font families: Geist Sans (body), Geist Mono (code).

#### Scenario: Display heading renders at correct scale

- GIVEN a hero section uses the display typography token
- WHEN rendered on a 1440px viewport
- THEN the heading text is 4rem with font-weight 700

### Requirement: Animation Tokens

The system SHALL define CSS animation keyframes and duration tokens for mesh gradients and micro-interactions.

Animations: `mesh-drift` (slow ambient gradient shift, 20s loop), `fade-in-up` (entrance, 0.4s ease-out), `glow-pulse` (subtle accent glow cycle, 3s). All animations SHALL respect `prefers-reduced-motion`.

#### Scenario: Mesh gradient animates on hero background

- GIVEN the hero section uses the mesh-drift animation
- WHEN rendered
- THEN the gradient background shifts smoothly over 20 seconds

#### Scenario: Reduced motion disables animations

- GIVEN the user has `prefers-reduced-motion: reduce` set
- WHEN any animated element renders
- THEN all animations are paused or removed
- AND no motion is visible

## Constraints

- MUST NOT add any new npm dependencies
- MUST use only CSS custom properties and Tailwind v4 utilities
- MUST remain under 650 lines total in globals.css additions
- MUST be compatible with existing shadcn/ui base-nova theme

## Out of Scope

- Dark mode toggle mechanism (dark-first is the default)
- Light mode palette definitions
- 3D effects or Three.js integrations
- Font loading optimization (Geist fonts already loaded)
