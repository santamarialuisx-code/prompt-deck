# Social Proof Section Specification

## Purpose

Define the social proof section that builds trust and credibility through testimonials, user statistics, and trust indicators. Positioned below the hero to reinforce the value proposition before the user scrolls to detailed content.

## Requirements

### Requirement: Testimonial Cards with Glassmorphism

The system SHALL render a grid of testimonial cards using glassmorphism treatment.

Each card SHALL contain: user avatar or initials, user name, role/company, testimonial quote (2-3 sentences), star rating (1-5). Cards SHALL use glassmorphism tokens (semi-transparent background, backdrop-blur, subtle border). Cards SHALL animate in with `fade-in-up` on scroll.

#### Scenario: Testimonial cards render in grid

- GIVEN a user scrolls to the social proof section
- WHEN the section enters the viewport
- THEN 3-6 testimonial cards are visible in a responsive grid
- AND each card displays avatar, name, quote, and star rating
- AND cards have glassmorphism styling

#### Scenario: Testimonial cards responsive layout

- GIVEN a user views the section on a 375px viewport
- WHEN the grid renders
- THEN cards stack to a single column
- AND each card is full-width with consistent padding

### Requirement: User Count and Rating Stats

The system SHALL display aggregate social proof metrics above or below the testimonial grid.

Metrics: total user count (e.g., "2,400+ creators trust Prompt Deck"), average star rating (e.g., "4.9 out of 5"), total prompts available (e.g., "150+ AI prompts"). Stats SHALL use accent color highlights for numbers.

#### Scenario: Aggregate stats display above testimonials

- GIVEN a user views the social proof section
- WHEN the stats render
- THEN aggregate metrics are visible in a prominent row
- AND numbers use accent colors from the brand palette

### Requirement: Trust Indicators

The system SHALL display trust indicators that reinforce purchase confidence.

Indicators: "Money-Back Guarantee", "Secure Checkout", "Instant Access". Each indicator SHALL have an icon (Lucide) and short label. Indicators SHALL be positioned between stats and testimonials or below testimonials.

#### Scenario: Trust indicators render with icons

- GIVEN a user views the social proof section
- WHEN trust indicators render
- THEN 3 indicators are visible in a horizontal row
- AND each has a Lucide icon and a text label

#### Scenario: Trust indicators responsive

- GIVEN a user views on a 375px viewport
- WHEN trust indicators render
- THEN indicators stack vertically or wrap
- AND remain readable and properly spaced

### Requirement: Carousel or Grid Layout Toggle

The system SHALL support both grid and carousel layouts for testimonials, defaulting to grid on desktop and carousel on mobile.

Grid: 3 columns on desktop, 2 on tablet, 1 on mobile. Carousel: horizontal scroll with snap points on mobile, auto-advance optional.

#### Scenario: Desktop grid layout

- GIVEN a user views on a 1024px+ viewport
- WHEN testimonials render
- THEN cards display in a 3-column grid

#### Scenario: Mobile carousel layout

- GIVEN a user views on a 375px viewport
- WHEN testimonials render
- THEN cards display in a horizontal carousel with snap scrolling
- AND swipe gestures navigate between cards

## Constraints

- MUST use glassmorphism tokens from aurora-brand-system
- MUST use Lucide React icons for all trust indicators
- MUST maintain WCAG AA contrast for testimonial text
- MUST NOT use fake or fabricated testimonials — content must be from real users or clearly marked as example

## Out of Scope

- Video testimonials
- Real-time notification popups ("X just purchased")
- User-uploaded photo testimonials
- Third-party review embeds (Trustpilot, G2)
