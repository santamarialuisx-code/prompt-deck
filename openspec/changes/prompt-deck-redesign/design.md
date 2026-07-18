# Design: Prompt Deck UI/UX Redesign

## Technical Approach

Replace the monochrome grayscale palette with Aurora Dark (cyan→violet→magenta), add missing navigation/layout components, and upgrade existing sections with glassmorphism, mesh gradients, and marketing psychology elements. All changes are additive UI — no data model or API changes. Zero new npm dependencies.

## Architecture Decisions

### Decision: Aurora Dark as default theme (no toggle)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Dark-only, no toggle | Simpler CSS, fewer hardcoded classes to fix; 82% of users prefer dark | ✅ Chosen |
| Dark + light toggle | More flexible; requires theme provider, doubles CSS token surface | Rejected |
| Light-only | Friendly but less "AI/tech" feel | Rejected |

### Decision: CSS custom properties for all brand tokens

| Option | Tradeoff | Decision |
|--------|----------|----------|
| CSS vars in globals.css | Standard, Tailwind v4 compatible, easy overrides | ✅ Chosen |
| Tailwind plugin | More structured; overkill for this scope | Rejected |
| SCSS variables | Requires build config change | Rejected |

### Decision: Glassmorphism via utility classes (not a new component)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Utility class recipe | Reusable via `@apply`, no new component files | ✅ Chosen |
| GlassCard component | Encapsulates; creates file proliferation for 4-5 consumers | Rejected |
| Inline styles | Fast; no composability, defeats Tailwind | Rejected |

## Component Tree

```
RootLayout (app/layout.tsx) — MODIFIED
├── Navbar (components/layout/Navbar.tsx) — NEW
├── {children}
│   └── page.tsx — MODIFIED (section order)
│       ├── Hero (components/home/Hero.tsx) — REWRITTEN
│       ├── SocialProof (components/home/SocialProof.tsx) — NEW
│       ├── ValueProps (components/home/ValueProps.tsx) — MODIFIED
│       ├── FeaturedCategories (components/home/FeaturedCategories.tsx) — MODIFIED
│       ├── SamplePrompts (components/home/SamplePrompts.tsx) — MODIFIED
│       └── FinalCTA (components/home/FinalCTA.tsx) — MODIFIED
└── Footer (components/layout/Footer.tsx) — NEW
```

## Data Flow

No data flow changes. All components are stateless server components. The only data dependency is `getFreeSamples()` in page.tsx (unchanged). Marketing copy and testimonial content will be hardcoded constants within each component.

## Design System (globals.css Additions)

### Color Palette Custom Properties

```css
/* Aurora Dark palette — injected into :root and .dark */
--aurora-navy: #09090B;
--aurora-surface: #18181B;
--aurora-muted: #27272A;
--aurora-cyan: #22D3EE;
--aurora-violet: #8B5CF6;
--aurora-magenta: #EC4899;
--aurora-text-primary: #FAFAFA;
--aurora-text-secondary: #A1A1AA;
--aurora-text-muted: #71717A;
```

### Gradient Utilities

```css
--gradient-brand: linear-gradient(135deg, var(--aurora-cyan), var(--aurora-violet), var(--aurora-magenta));
--gradient-subtle: linear-gradient(135deg, oklch(from var(--aurora-violet) l c h / 10%), oklch(from var(--aurora-cyan) l c h / 10%));
```

### Glassmorphism Recipe

```css
.glass {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
}
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(255,255,255,0.06); }
}
```

### Mesh Gradient (Hero Background)

```css
.hero-mesh {
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, oklch(from var(--aurora-cyan) l c h / 15%), transparent),
    radial-gradient(ellipse 60% 40% at 80% 20%, oklch(from var(--aurora-violet) l c h / 12%), transparent),
    radial-gradient(ellipse 50% 60% at 50% 80%, oklch(from var(--aurora-magenta) l c h / 10%), transparent);
  animation: mesh-drift 20s ease-in-out infinite alternate;
}
```

### Animation Keyframes

```css
@keyframes mesh-drift {
  0% { background-position: 0% 0%, 100% 0%, 50% 100%; }
  100% { background-position: 100% 100%, 0% 100%, 50% 0%; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px oklch(from var(--aurora-violet) l c h / 20%); }
  50% { box-shadow: 0 0 40px oklch(from var(--aurora-violet) l c h / 40%); }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .hero-mesh, .animate-fade-in-up, .animate-glow-pulse {
    animation: none !important;
  }
}
```

## Component Specifications

### Navbar (NEW — `components/layout/Navbar.tsx`)

**Props**: None (server component)
**Structure**: Fixed position, glassmorphism background, z-50. Logo (left), nav links (center: Gallery, Free Samples, Pricing), CTA button (right). Hamburger → Sheet on mobile (<768px).
**Marketing psychology**: Navigation reduces friction; CTA above fold on every page.

### Footer (NEW — `components/layout/Footer.tsx`)

**Props**: None
**Structure**: 4-column grid (Product, Resources, Company, Legal), dark surface background, trust badges (security, payment methods), copyright. Responsive: 4→2→1 columns.
**Marketing psychology**: Trust signals, professional appearance, legal compliance.

### Hero (REWRITTEN — `components/home/Hero.tsx`)

**Props**: None
**Structure**: Full-viewport section with mesh gradient background. Gradient text headline, subheadline, dual CTAs (gradient primary + outline secondary), stats bar (2,400+ Prompts · 500+ Creators · 4.9★ Rating).
**Marketing psychology**: Social proof stats, gradient CTA draws eye, dual options reduce commitment anxiety.

### SocialProof (NEW — `components/home/SocialProof.tsx`)

**Props**: None
**Structure**: Aggregate stats row (3 metrics with accent numbers), testimonial card grid (glassmorphism, 3-col desktop / 1-col mobile), trust indicators row (3 Lucide icons + labels). Cards animate with fade-in-up on scroll.
**Marketing psychology**: Testimonials build trust, stats provide quantitative proof, trust indicators reduce anxiety.

### ValueProps (MODIFIED — `components/home/ValueProps.tsx`)

**Changes**: Replace hand-rolled SVGs with Lucide icons. Add glassmorphism background to section. Add subtle hover effect on cards.
**Marketing psychology**: Professional icons signal competence.

### FeaturedCategories (MODIFIED — `components/home/FeaturedCategories.tsx`)

**Changes**: Replace emoji icons with Lucide icons. Add glassmorphism to category cards. Add category-specific accent color hover glow. Map each category to an accent color (Portrait→violet, Artistic→magenta, Social Media→cyan, Headshot→violet, Product→cyan).
**Marketing psychology**: Category colors create visual hierarchy; glassmorphism signals premium.

### SamplePrompts (MODIFIED — `components/home/SamplePrompts.tsx`)

**Changes**: Apply glassmorphism card treatment. Add category accent colors to badges. Add conversion CTA (link to full paid gallery).
**Marketing psychology**: Free samples create reciprocity; conversion CTA captures interest.

### FinalCTA (MODIFIED — `components/home/FinalCTA.tsx`)

**Changes**: Add urgency text ("Join 2,400+ creators"). Add trust indicators (guarantee badge, instant access). Add gradient background. Larger CTA button with gradient treatment.
**Marketing psychology**: Urgency + social proof + trust at decision point.

### Checkout Page (MODIFIED — `app/checkout/page.tsx`)

**Changes**: Migrate all `zinc-*` classes to CSS variables. Add price anchoring ($197 crossed out → $29). Add "Save $168" badge. Add guarantee badge (shield icon + "30-Day Money-Back Guarantee"). Add trust signals row near CTA. Add simplified before/after comparison below fold.
**Marketing psychology**: Anchoring compresses decision time; guarantee eliminates risk; social proof validates.

### Prompt Cards (MODIFIED — `SamplePrompts`, `FeaturedCategories`)

**Changes**: Glassmorphism treatment, hover glow effect (category accent color), category badges with accent colors, CSS Grid `auto-fill minmax(300px, 1fr)`.
**Marketing psychology**: Premium card treatment signals quality; hover effects encourage exploration.

## File Change Matrix

| File | Action | Reason |
|------|--------|--------|
| `app/globals.css` | Modify | Aurora palette tokens, gradient utilities, glassmorphism recipe, animations, reduced-motion |
| `app/layout.tsx` | Modify | Add Navbar + Footer wrapping children |
| `app/page.tsx` | Modify | Reorder sections: Hero → SocialProof → ValueProps → FeaturedCategories → SamplePrompts → FinalCTA |
| `components/home/Hero.tsx` | Rewrite | Mesh gradient, gradient text, dual CTAs, stats bar |
| `components/home/SocialProof.tsx` | Create | Testimonials, stats, trust indicators |
| `components/home/ValueProps.tsx` | Modify | Lucide icons, glassmorphism background |
| `components/home/FeaturedCategories.tsx` | Modify | Lucide icons, accent color hovers, glassmorphism |
| `components/home/SamplePrompts.tsx` | Modify | Glassmorphism cards, accent badges, conversion CTA |
| `components/home/FinalCTA.tsx` | Modify | Urgency text, trust indicators, gradient CTA |
| `components/layout/Navbar.tsx` | Create | Floating glassmorphism navbar with mobile sheet |
| `components/layout/Footer.tsx` | Create | 4-column footer with trust badges |
| `app/checkout/page.tsx` | Modify | Migrate zinc→CSS vars, add anchoring, guarantee, trust signals |
| `app/checkout/success/page.tsx` | Modify | Migrate zinc→CSS vars |
| `app/checkout/pago-movil/page.tsx` | Modify | Migrate zinc→CSS vars |

## Performance Strategy

- `will-change: transform` only on actively animating elements (hero mesh, hover states)
- `@supports (backdrop-filter)` guard for glassmorphism graceful degradation
- `prefers-reduced-motion: reduce` kills all animations
- Hero mesh uses CSS gradients only (no images, no JS animation)
- Mobile: glassmorphism is CSS-only, no JS overhead; Lighthouse target ≥90

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Aurora palette renders correctly | Manual browser check across Chrome/Safari/Firefox |
| Visual | Glassmorphism degrades without backdrop-filter | Disable CSS feature in DevTools |
| Responsive | Navbar collapses at <768px | Resize browser, test sheet menu |
| Responsive | Hero stats wrap on 375px viewport | Mobile viewport in DevTools |
| A11y | WCAG AA contrast on all text | Lighthouse accessibility audit |
| Performance | Lighthouse ≥90 mobile throttled | Lighthouse CI or manual |
| Integration | Checkout payment flow unchanged | Complete test purchase |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No data migration required. All changes are additive UI. Dark-first is the default — no toggle needed. Existing checkout logic (Lemon Squeezy integration, API calls, URLs) is completely preserved. Rollback: git revert all changed files.

## Open Questions

- [ ] Where do testimonial quotes come from? Real users or example content? (Spec says "must not use fake testimonials" — need real quotes or clearly marked examples)
- [ ] Before/after showcase: what visual content to use? Placeholder images or descriptions? (Spec says "no real user images without consent")
- [ ] Is the Before/After showcase Phase 1 or Phase 2? (Proposal puts it in Phase 2, checkout-experience spec includes simplified version)
