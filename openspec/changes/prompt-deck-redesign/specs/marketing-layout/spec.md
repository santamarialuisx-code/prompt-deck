# Marketing Layout Specification

## Purpose

Define the persistent navigation and footer layout components that wrap all pages. Provides the structural skeleton for the marketing site: floating navbar with glassmorphism, comprehensive footer with trust signals and legal links.

## Requirements

### Requirement: Floating Navbar

The system SHALL render a persistent navbar at the top of every page using a floating island style with glassmorphism treatment.

The navbar SHALL contain: logo/brand name (left), navigation links (center), CTA button (right). The navbar SHALL be `position: fixed` with `backdrop-blur-xl` and semi-transparent background. The navbar SHALL collapse to a hamburger menu on viewports below 768px.

#### Scenario: Navbar renders on all pages

- GIVEN a user navigates to any route in the app
- WHEN the page loads
- THEN a navbar is visible at the top with logo, links, and CTA
- AND the navbar floats above content with glassmorphism blur

#### Scenario: Navbar responsive collapse

- GIVEN a user views the site on a 375px viewport
- WHEN the navbar renders
- THEN navigation links are hidden behind a hamburger/sheet menu
- AND the CTA button remains visible

#### Scenario: Navbar maintains scroll position

- GIVEN a user scrolls down the page
- WHEN the page content moves
- THEN the navbar remains fixed at the top
- AND the background blur intensity adapts to scroll depth

### Requirement: Footer

The system SHALL render a persistent footer at the bottom of every page with a dark background and 4-column grid layout.

Columns: Product (links to categories, pricing, FAQ), Resources (blog, guides, API docs), Company (about, contact, careers), Legal (privacy, terms, refund policy). Footer SHALL include trust signals (security badge, payment method icons) and copyright notice.

#### Scenario: Footer renders with all columns

- GIVEN a user scrolls to the bottom of any page
- WHEN the footer enters the viewport
- THEN all 4 column sections are visible with correct links
- AND trust signal badges and copyright text are displayed

#### Scenario: Footer links navigate correctly

- GIVEN a user clicks any footer link
- WHEN the click event fires
- THEN the browser navigates to the correct destination
- AND external links open in a new tab with `rel="noopener"`

### Requirement: Root Layout Integration

The system SHALL integrate navbar and footer into the root layout (`app/layout.tsx`) so they appear on every page without per-page setup.

#### Scenario: Layout wraps children with navbar and footer

- GIVEN the root layout renders
- WHEN any child page component loads
- THEN the navbar appears above the page content
- AND the footer appears below the page content
- AND the page content fills the space between navbar and footer

#### Scenario: Layout does not interfere with page SEO

- GIVEN the root layout includes navbar and footer
- WHEN a search engine crawler renders the page
- THEN the `<main>` element contains only page-specific content
- AND navbar/footer links are crawlable

## Constraints

- MUST use existing shadcn/ui Sheet component for mobile nav menu
- MUST use Lucide React icons (no hand-rolled SVGs, no emojis)
- MUST follow glassmorphism tokens from aurora-brand-system
- MUST maintain consistent z-index layering (navbar above content, footer below)

## Out of Scope

- Dark mode toggle in navbar (dark-first default)
- Breadcrumb navigation
- Multi-level dropdown menus
- Search functionality in navbar
