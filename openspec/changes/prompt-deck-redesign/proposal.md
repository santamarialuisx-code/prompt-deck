# Proposal: Prompt Deck UI/UX Redesign

## Intent

Prompt Deck is a premium AI image prompt marketplace with strong content (150+ prompts, 5 categories) but zero marketing infrastructure. No navbar, no footer, no social proof, no urgency, no trust signals. The checkout page is a single card with a $29 button. Visitors have no reason to trust, no reason to act now, and no social proof that others have validated the product. This redesign transforms a content-first site into a conversion-optimized storefront using Aurora Dark aesthetics and proven marketing psychology.

## Scope

### In Scope
- Aurora Dark brand palette injection (cyan → violet → rose gradients)
- Navbar + Footer (missing critical navigation)
- Hero rewrite: mesh gradient, bold type, social proof stats
- SocialProof section (testimonials, user count, ratings)
- Checkout upgrade: trust signals, price anchoring ($197 value → $29)
- Before/After visual showcase for AI prompt results
- Glassmorphism card treatments across landing page

### Out of Scope
- Dark mode toggle (dark-first is the default)
- Gallery redesign (deferred to phase 2)
- Email capture / lead magnet (future)
- A/B testing infrastructure
- Mobile-specific responsive overhaul (reuse existing breakpoints)

## Capabilities

### New Capabilities
- `aurora-brand-system`: CSS custom properties for aurora palette, gradient utilities, glassmorphism tokens
- `marketing-layout`: Navbar, Footer, SocialProof, UrgencyBanner components
- `conversion-optimized-hero`: Mesh gradient hero with social proof stats and dual CTA

### Modified Capabilities
- `checkout-experience`: Add trust signals, guarantee badge, price anchoring, anchor pricing display

## Approach

**Phase 1 (highest conversion ROI):**
1. Inject aurora palette into `globals.css` via CSS custom properties
2. Create Navbar + Footer in `components/layout/`
3. Rewrite Hero with mesh gradient, dual CTA, user count stat
4. Add SocialProof section with testimonials + ratings
5. Upgrade checkout with guarantee badge + anchoring

**Phase 2 (polish):**
6. Before/After showcase component
7. Glassmorphism card treatments
8. Micro-interactions via tw-animate-css

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/globals.css` | Modified | Aurora palette tokens, gradient utilities |
| `app/layout.tsx` | Modified | Add Navbar + Footer slots |
| `app/page.tsx` | Modified | New section order + SocialProof |
| `components/home/Hero.tsx` | Rewritten | Mesh gradient, social proof stats |
| `components/checkout/page.tsx` | Modified | Trust signals, anchoring, guarantee |
| `components/layout/Navbar.tsx` | New | Logo, nav links, CTA button |
| `components/layout/Footer.tsx` | New | Links, social, legal |
| `components/home/SocialProof.tsx` | New | Testimonials, user count, ratings |
| `components/home/BeforeAfter.tsx` | New | Visual prompt result showcase |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Performance regression from gradients/blur | Med | `will-change`, `prefers-reduced-motion`, mobile Lighthouse testing |
| Scope creep into phase 2 work | High | Strict phase gating — ship Phase 1 first |
| Checkout conversion drop from redesign | Low | Preserve all existing checkout logic; only add visual elements |
| Brand inconsistency across treatments | Med | Max 3 gradient palettes; consistent design token system |

## Rollback Plan

1. Revert `app/globals.css` to original monochrome tokens
2. Remove Navbar/Footer from `app/layout.tsx`
3. Restore original Hero, checkout page
4. Delete new components (`Navbar.tsx`, `Footer.tsx`, `SocialProof.tsx`, `BeforeAfter.tsx`)
5. All changes are additive UI — no data or API changes to roll back

## Dependencies

- `tw-animate-css` — installed but unused; enable for micro-interactions
- `lucide-react` — installed; use for all icons (replace hand-rolled SVGs + emojis)
- No new npm dependencies required

## Success Criteria

- [ ] Lighthouse Performance ≥ 90 on mobile (throttled)
- [ ] Navbar + Footer present on all pages
- [ ] Social proof section visible above fold on home page
- [ ] Checkout page shows trust signals (guarantee badge, security indicator)
- [ ] Aurora brand palette applied consistently via CSS custom properties
- [ ] Zero new npm dependencies added
- [ ] All hardcoded zinc-* classes in checkout migrated to CSS variables
