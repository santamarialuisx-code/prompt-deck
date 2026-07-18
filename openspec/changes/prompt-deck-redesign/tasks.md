# Tasks: Prompt Deck UI/UX Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~900–1100 (across 15 files) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 → PR 5 → PR 6 → PR 7 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Design system tokens in globals.css | PR 1 | `npm run build` — CSS compiles, no errors | Build pipeline | globals.css only |
| 2 | Navbar + Footer + layout shell | PR 2 | `npm run build` + manual browser check — nav renders on all pages | Dev server | components/layout/* + layout.tsx |
| 3 | Hero rewrite with mesh gradient | PR 3 | Manual — hero renders mesh gradient, CTAs, stats bar | Dev server | components/home/Hero.tsx + page.tsx reorder |
| 4 | Social proof section | PR 4 | Manual — testimonials, stats, trust indicators render | Dev server | components/home/SocialProof.tsx |
| 5 | Cards & category glassmorphism | PR 5 | Manual — all home sections render with glass treatment | Dev server | components/home/{ValueProps,FeaturedCategories,SamplePrompts,FinalCTA}.tsx |
| 6 | Checkout upgrade | PR 6 | Manual — checkout renders anchoring, guarantee, trust signals; payment flow intact | Dev server + test purchase | app/checkout/** |
| 7 | Before/After showcase | PR 7 | Manual — showcase renders, filtering works, responsive | Dev server | BeforeAfterShowcase.tsx + checkout integration |

## Phase 1: Design System Foundation

- [ ] 1.1 Add Aurora Dark palette CSS custom properties (`--aurora-navy`, `--aurora-surface`, `--aurora-muted`, `--aurora-cyan`, `--aurora-violet`, `--aurora-magenta`, `--aurora-text-primary`, `--aurora-text-secondary`, `--aurora-text-muted`) to `:root` and `.dark` in `app/globals.css`
- [ ] 1.2 Add gradient utilities (`--gradient-brand`, `--gradient-subtle`) to `app/globals.css`
- [ ] 1.3 Add glassmorphism `.glass` recipe with `@supports` fallback to `app/globals.css`
- [ ] 1.4 Add mesh gradient `.hero-mesh` class and `mesh-drift`, `fade-in-up`, `glow-pulse` keyframes to `app/globals.css`
- [ ] 1.5 Add `@media (prefers-reduced-motion: reduce)` rule disabling all animations in `app/globals.css`
- **Marketing element**: Brand identity — Aurora Dark palette establishes premium AI/tech feel

## Phase 2: Layout Shell

- [ ] 2.1 Create `components/layout/Navbar.tsx` — fixed glassmorphism navbar, logo, nav links (Gallery, Free Samples, Pricing), CTA button, mobile hamburger → Sheet
- [ ] 2.2 Create `components/layout/Footer.tsx` — 4-column grid (Product, Resources, Company, Legal), trust badges (shield, payment icons), copyright, responsive 4→2→1
- [ ] 2.3 Modify `app/layout.tsx` — wrap `{children}` with `<Navbar />` above and `<Footer />` below
- **Marketing element**: Persistent CTA above fold (navbar), trust signals (footer)

## Phase 3: Hero Rewrite

- [ ] 3.1 Rewrite `components/home/Hero.tsx` — mesh gradient background, gradient text headline (display token), subheadline, dual CTAs (gradient primary "Get Access" + outline secondary "Try Free"), stats bar (2,400+ Prompts · 500+ Creators · 4.9★)
- [ ] 3.2 Modify `app/page.tsx` — reorder sections: Hero → SocialProof → ValueProps → FeaturedCategories → SamplePrompts → FinalCTA; add SocialProof import
- **Marketing element**: Social proof stats, gradient CTA draws eye, dual options reduce commitment anxiety

## Phase 4: Social Proof Section

- [ ] 4.1 Create `components/home/SocialProof.tsx` — aggregate stats row (3 metrics), testimonial card grid (glassmorphism, 3-col desktop / 1-col mobile), trust indicators row (3 Lucide icons + labels); use clearly-marked EXAMPLE testimonials
- **Marketing element**: Testimonials build trust, stats provide quantitative proof, trust indicators reduce anxiety

## Phase 5: Cards & Categories

- [ ] 5.1 Modify `components/home/ValueProps.tsx` — replace hand-rolled SVGs with Lucide icons, add glassmorphism section background, add hover effect on cards
- [ ] 5.2 Modify `components/home/FeaturedCategories.tsx` — replace emojis with Lucide icons, add glassmorphism to cards, add category-specific accent color hover glow (Portrait→violet, Artistic→magenta, Social Media→cyan, Headshot→violet, Product→cyan)
- [ ] 5.3 Modify `components/home/SamplePrompts.tsx` — apply glassmorphism card treatment, add category accent color badges, add conversion CTA linking to paid gallery
- [ ] 5.4 Modify `components/home/FinalCTA.tsx` — add urgency text ("Join 2,400+ creators"), trust indicators (guarantee badge, instant access), gradient background, larger gradient CTA button
- **Marketing element**: Glassmorphism signals premium, category colors create visual hierarchy, reciprocity via free samples

## Phase 6: Checkout Upgrade

- [ ] 6.1 Modify `app/checkout/page.tsx` — migrate all `zinc-*` classes to CSS variables, add price anchoring ($197 crossed out → $29, "Save $168" badge), guarantee badge (shield + "30-Day Money-Back Guarantee"), trust signals row near CTA, simplified before/after comparison below fold
- [ ] 6.2 Modify `app/checkout/success/page.tsx` — migrate hardcoded `zinc-*` classes to CSS custom properties
- [ ] 6.3 Modify `app/checkout/pago-movil/page.tsx` — migrate hardcoded `zinc-*` classes to CSS custom properties
- **Marketing element**: Price anchoring compresses decision time, guarantee eliminates risk, social proof validates

## Phase 7: Before/After Showcase

- [ ] 7.1 Create `components/home/BeforeAfterShowcase.tsx` — side-by-side/stacked comparison, prompt text in monospace, placeholder gradient images, category badges with accent colors, category filtering (tabs/buttons), responsive grid (2-col desktop → 1-col mobile), glassmorphism cards
- [ ] 7.2 Integrate `BeforeAfterShowcase` into `app/page.tsx` (between SamplePrompts and FinalCTA) and simplified version into `app/checkout/page.tsx`
- **Marketing element**: Proof of value — shows transformation from generic prompts to professional results
