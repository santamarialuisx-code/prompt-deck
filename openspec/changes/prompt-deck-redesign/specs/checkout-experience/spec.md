# Checkout Experience Specification

## Purpose

Define the checkout page experience optimized for conversion. Adds price anchoring, trust signals, guarantee badge, and before/after comparison to the existing single-card checkout. This is a MODIFIED capability — existing checkout logic is preserved; only visual and informational elements are added.

## Requirements

### Requirement: Price Anchoring Display

The system SHALL display a crossed-out "value" price alongside the actual price to create anchoring effect.

Original value price: $197 (crossed out). Actual price: $29. Daily cost framing: "Less than $0.01/day". The price card SHALL be the visual focal point of the checkout page.

#### Scenario: Price anchoring renders correctly

- GIVEN a user navigates to `/checkout`
- WHEN the pricing card renders
- THEN the original value ($197) is displayed with strikethrough styling
- AND the actual price ($29) is displayed prominently in a larger size
- AND a "Save $168" badge or equivalent is visible

#### Scenario: Daily cost framing displays

- GIVEN a user views the checkout pricing card
- WHEN the price section renders
- THEN "Less than $0.01/day" or equivalent daily framing is visible below the main price

### Requirement: Trust Signals

The system SHALL display trust signals on the checkout page to reduce purchase anxiety.

Signals: 30-day money-back guarantee badge, secure payment icon (lock/shield), "Instant digital delivery" note, "Join 2,400+ creators" social proof line. Trust signals SHALL be positioned near the CTA button.

#### Scenario: Trust signals render near CTA

- GIVEN a user views the checkout page
- WHEN the checkout card renders
- THEN trust signals are visible below or adjacent to the purchase button
- AND each signal has a Lucide icon and short text label

#### Scenario: Trust signals do not block purchase flow

- GIVEN a user clicks the purchase button
- WHEN the click event fires
- THEN the trust signals do not interfere with the click target
- AND the purchase flow initiates correctly

### Requirement: Guarantee Badge

The system SHALL display a prominent 30-day money-back guarantee badge on the checkout page.

The badge SHALL be visually distinct (outlined or glassmorphism card) and include: shield or checkmark icon, "30-Day Money-Back Guarantee" text, brief reassurance copy ("Love it or get a full refund").

#### Scenario: Guarantee badge renders prominently

- GIVEN a user views the checkout page
- WHEN the guarantee badge renders
- THEN it is visible as a distinct visual element
- AND includes icon, title, and reassurance text

### Requirement: Before/After Comparison on Checkout

The system SHALL display a brief before/after comparison on the checkout page showing the transformation the product enables.

Format: "Without Prompt Deck" (generic prompts, mediocre results) vs "With Prompt Deck" (professional prompts, stunning results). This SHALL be a simplified version of the full before/after showcase.

#### Scenario: Before/after comparison renders

- GIVEN a user scrolls to the comparison section on checkout
- WHEN the comparison renders
- THEN two columns are visible: "without" and "with"
- AND each has a brief description and visual indicator

#### Scenario: Comparison does not overwhelm checkout

- GIVEN a user views the checkout page
- WHEN the page loads
- THEN the pricing card and CTA are above the comparison
- AND the comparison requires scrolling to reach

### Requirement: Migrated CSS Variables

The system SHALL migrate all hardcoded `zinc-*` classes in the checkout page to CSS custom properties from the aurora-brand-system.

All background, text, and border colors in checkout components SHALL reference `--color-*` custom properties instead of Tailwind's zinc palette.

#### Scenario: No hardcoded zinc classes remain

- GIVEN the checkout page is rendered
- WHEN inspecting the component source
- THEN no `zinc-*` Tailwind classes appear in checkout component files
- AND all colors resolve through CSS custom properties

## Constraints

- MUST preserve all existing checkout logic (Lemon Squeezy integration, payment flow)
- MUST NOT change the checkout URL structure or API calls
- MUST use CSS variables from aurora-brand-system for all colors
- MUST use Lucide React icons for trust signals

## Out of Scope

- Payment method selection UI (handled by Lemon Squeezy)
- Multi-step checkout flow
- Coupon/discount code input
- Order summary with line items
- Post-purchase confirmation page
