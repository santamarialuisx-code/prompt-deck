# Conversion-Optimized Hero Specification

## Purpose

Define the hero section for the landing page. This is the highest-impact conversion element: mesh gradient background, bold typography, social proof stats bar, and dual CTA buttons designed to maximize click-through.

## Requirements

### Requirement: Mesh Gradient Background

The system SHALL render an animated mesh gradient background using 3 layered radial-gradient orbs.

The orbs SHALL use the brand accent colors (cyan, violet, magenta) at low opacity. The orbs SHALL animate via the `mesh-drift` keyframe animation for ambient movement. The background SHALL degrade to a static gradient when `prefers-reduced-motion` is active.

#### Scenario: Hero gradient renders with animated orbs

- GIVEN a user loads the home page
- WHEN the hero section enters the viewport
- THEN 3 gradient orbs are visible in the background
- AND the orbs shift position smoothly over a 20-second loop

#### Scenario: Hero gradient static fallback

- GIVEN a user has `prefers-reduced-motion: reduce`
- WHEN the hero section renders
- THEN the gradient orbs are visible but static
- AND no animation is applied

### Requirement: Bold Typography with Gradient Text

The system SHALL render a primary headline with gradient text treatment using the brand gradient.

The headline SHALL use the `display` typography token (4rem/700). The subheadline SHALL use `heading-2` (2rem/600) in muted text color. Text SHALL be left-aligned on desktop, centered on mobile.

#### Scenario: Desktop headline renders with gradient

- GIVEN a user views the hero on a 1440px viewport
- WHEN the hero renders
- THEN the headline displays at 4rem with a cyan→violet→magenta gradient fill
- AND the subheadline appears below in muted white

#### Scenario: Mobile headline stacks correctly

- GIVEN a user views the hero on a 375px viewport
- WHEN the hero renders
- THEN the headline scales down appropriately
- AND text is centered with no horizontal overflow

### Requirement: Social Proof Stats Bar

The system SHALL display a horizontal stats bar below the CTAs showing 3 key metrics.

Metrics: "2,400+ Prompts", "500+ Creators", "4.9★ Rating". Stats SHALL use the `caption` typography token with accent color highlights. Stats SHALL be separated by subtle dividers.

#### Scenario: Stats bar displays key metrics

- GIVEN a user views the hero section
- WHEN the stats bar renders
- THEN all 3 metrics are visible in a horizontal row
- AND each metric has a number in accent color and label in muted text

#### Scenario: Stats bar responsive layout

- GIVEN a user views the hero on a 375px viewport
- WHEN the stats bar renders
- THEN metrics stack vertically or wrap to fit the viewport
- AND no text is truncated or overflowed

### Requirement: Dual CTA Buttons

The system SHALL render two CTA buttons: a primary "Get Access" button and a secondary "Try Free" button.

Primary CTA SHALL use the brand gradient background with white text. Secondary CTA SHALL use a transparent background with a white border. Both SHALL link to the checkout page. Primary SHALL have higher visual weight.

#### Scenario: Primary CTA is visually dominant

- GIVEN a user views the hero section
- WHEN both CTAs render
- THEN the primary button has a gradient background and is visually larger
- AND the secondary button has a border-only style

#### Scenario: CTAs link to checkout

- GIVEN a user clicks "Get Access"
- WHEN the click event fires
- THEN the browser navigates to `/checkout`

- GIVEN a user clicks "Try Free"
- WHEN the click event fires
- THEN the browser navigates to `/checkout` (or gallery for free preview)

### Requirement: Hero Responsive Design

The system SHALL render the hero section responsively across all viewport sizes.

Desktop (≥1024px): side-by-side or stacked with generous padding. Tablet (768-1023px): adjusted spacing. Mobile (<768px): full-width, centered text, stacked CTAs.

#### Scenario: Hero renders on tablet

- GIVEN a user views the hero on a 768px viewport
- WHEN the hero renders
- THEN layout adjusts with reduced padding
- AND all content remains readable without horizontal scroll

#### Scenario: Hero renders on mobile

- GIVEN a user views the hero on a 375px viewport
- WHEN the hero renders
- THEN CTAs stack vertically
- AND stats bar wraps to fit

## Constraints

- MUST use tw-animate-css utilities where available
- MUST keep hero total height under 100vh (no scroll required to see CTAs)
- MUST maintain WCAG AA contrast ratios for all text
- MUST not add any new npm dependencies

## Out of Scope

- Video background or 3D elements
- Countdown timer or urgency banners
- Email capture forms
- Parallax scrolling effects
