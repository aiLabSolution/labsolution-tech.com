---
name: LabSolution Technologies
description: The visual system for a Philippine diagnostics distributor — established, reliable, kept human.
colors:
  clinical-teal: "#00c1cf"
  clinical-teal-deep: "#08b2c3"
  clinical-teal-deeper: "#0396a5"
  graphite: "#313131"
  slate-plum: "#50485b"
  warm-sand: "#cec2ab"
  surface: "#ffffff"
  surface-alt: "#f0f0f0"
  surface-field: "#f7fafb"
  border: "#dddddd"
typography:
  statistic:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 200
    lineHeight: 1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw + 1rem, 3rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Noto Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Noto Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.clinical-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.clinical-teal-deeper}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  nav-link:
    textColor: "{colors.slate-plum}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  nav-link-hover:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.graphite}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input:
    backgroundColor: "{colors.surface-field}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: LabSolution Technologies

## 1. Overview

**Creative North Star: "The Steady Hand"**

LabSolution is the dependable partner standing behind the people who care for patients.
The interface should read like that steady hand: an established, reliable diagnostics
distributor that earns a procurement officer's trust without ever raising its voice.
Authority here comes from substance — real partner brands, real catalog depth, a real
physical footprint — surfaced plainly, not decorated around. The system is light-themed
and calm: a clean white field, charcoal text, and a single disciplined teal that does
all the signaling.

The personality is **established · reliable · institutional, kept human**. "Institutional"
sets the spine — stability, track record, the safe choice — but it must never harden into
something cold or faceless. A warm-sand neutral and a confident, tactile materiality
(soft depth, gentle lifts) keep the institution human. Components feel like quality
objects you can trust your hand on, not flat corporate boxes.

This system explicitly rejects three things, carried straight from the brand brief: the
**templated WordPress / WooCommerce** look of the old `labsolution.ph` site (stock theme,
widget clutter, e-commerce chrome); the **cluttered medical-supply catalog** (dense
spreadsheet grids, tiny competing text); and the **cold, sterile, generic corporate**
template with no point of view. Where a lesser site would dump a product grid, this one
runs an editorial list and lets whitespace do the talking.

**Key Characteristics:**
- One chromatic voice: Clinical Teal, and nothing competing with it.
- Hierarchy by typographic *weight*, not by a pile of sizes.
- Soft, teal-tinted depth that lifts on interaction — tactile, never flat.
- Curated editorial layouts (lists over grids); restraint reads as expertise.
- A warm-sand neutral that keeps an institutional palette from going cold.

## 2. Colors

A near-monochrome field of white, charcoal, and warm grey, charged by a single teal that
carries every interactive signal.

### Primary
- **Clinical Teal** (`#00c1cf`): The one pop of color and the entire interactive
  vocabulary — primary buttons, links, focus rings, active nav, hover accents. The
  instrument-panel cyan of a modern analyzer, used precisely and sparingly.
- **Clinical Teal Deep** (`#08b2c3`): The working shade of the brand across CSS — gradient
  section fields (Features, Partners, Contact CTA), card top-rules, tinted shadows, and the
  hover color for catalog and link states. Slightly calmer and more medical than the bright
  base.
- **Clinical Teal Deeper** (`#0396a5`): The pressed/hover state for primary buttons. Adds
  weight on interaction without introducing a new hue.

### Neutral
- **Graphite** (`#313131`): Headings, body text, and the dark hero field. The charcoal
  spine of the page — warmer and softer than pure black, which is never used.
- **Slate Plum** (`#50485b`): Secondary text, nav links, supporting copy. A muted
  plum-grey that reads as quieter than graphite without going flat grey.
- **Warm Sand** (`#cec2ab`): The single humanizing neutral. Used sparingly for warmth and
  to keep the institutional palette from tipping into cold corporate. Never an accent.
- **Surface** (`#ffffff`): The dominant page background; clarity and breathing room.
- **Surface Alt** (`#f0f0f0`): Subtle zoned backgrounds, nav-link hover, soft fills.
- **Surface Field** (`#f7fafb`): The cool near-white of form inputs at rest; brightens to
  pure white on focus.
- **Border** (`#dddddd`): Hairline dividers, card edges, the floating nav outline. Always
  1px; structure is drawn with the lightest possible line.

### Named Rules
**The One Voice Rule.** Clinical Teal is the *only* chromatic accent and appears on ≤10%
of any screen. Its rarity is the signal. Never introduce a second accent hue; if something
needs emphasis, reach for weight, size, or space — not another color.

**The Warm-Sand Rule.** Warm Sand is the humanizing counterweight to an institutional
palette — use it to add warmth, never to draw the eye. The moment sand competes with teal
for attention, the page has gone wrong.

**The No-Pure-Black Rule.** Text and dark fields are Graphite (`#313131`), never `#000`.
Pure black reads as cheap and cold against this warm-leaning neutral set.

## 3. Typography

**Display Font:** Figtree (with system-ui, sans-serif)
**Body Font:** Noto Sans (with system-ui, sans-serif)

**Character:** Figtree is a calm, humanist geometric sans with an exceptionally wide weight
range (200–900) — confident and modern without the techy coldness of a grotesque. Noto
Sans is a neutral, supremely legible workhorse for dense procurement copy. Together they
read as precise and trustworthy: expressive headlines, quiet body. (Both load from Google
Fonts in `index.css` / `index.html`.)

### Hierarchy
- **Statistic** (200 thin, `clamp(3rem, 6vw, 4.5rem)`, line-height 1): The signature
  oversized count-up numerals (e.g. the catalog total). Hair-thin weight at large size is a
  deliberate confidence move — the number is big but never loud.
- **Display** (800, `clamp(2.25rem, 4vw + 1rem, 3rem)`, line-height 1.1, tracking -0.02em):
  Section headlines ("A catalog built for Philippine laboratories."). The implementation
  uses Tailwind responsive steps (`text-4xl sm:text-5xl`); treat the clamp as the fluid
  intent.
- **Headline** (700, `clamp(1.25rem, 2vw, 1.5rem)`, line-height 1.3): Product and card
  titles. Shifts to Clinical Teal Deep on hover in interactive rows.
- **Title** (600, `1.125rem`, line-height 1.4): Sub-section and group headings.
- **Body** (400, `1rem`, line-height 1.6): Paragraph copy in Noto Sans. Light text on the
  teal gradient sections runs at weight 500 with a soft shadow for legibility. Cap measure
  at ~65–75ch.
- **Label** (600, `0.75rem`, tracking 0.18em, uppercase): Short meta/spec labels (partner
  strings, category counts). A spec-sheet device, used inline within content.

### Named Rules
**The Weight-Not-Size Rule.** Hierarchy comes from Figtree's weight contrast — 200 thin
numerals against 800 headlines — not from stacking many sizes. A page should rarely need
more than four type sizes; let weight carry the rest.

**The Tracked-Label Rule.** Uppercase is reserved for *short* meta labels with 0.16–0.20em
tracking. Never set body copy in uppercase, and never drop a tiny tracked "eyebrow" above
every section — that's the templated tell. Tracked labels are a spec-sheet device that
lives *inside* content, not a kicker on top of it.

## 4. Elevation

Depth is **soft, atmospheric, and tinted toward Clinical Teal** — surfaces rest gently and
rise on interaction. This is a tactile, confident system, not a flat one: the lift is what
makes a card feel like a quality object. Shadows are never neutral black; they are tinted
with the brand teal (`rgba(8,178,195,…)`) so depth reinforces the one color voice instead
of muddying it. Many surfaces also pair an inset top highlight with the drop shadow for a
subtle sense of a lit, physical edge.

### Shadow Vocabulary
- **Resting card** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 20px 40px rgba(8,178,195,0.18), 0 8px 16px rgba(0,0,0,0.08)`):
  The default "blue card depth" — a soft teal halo plus a faint neutral grounding shadow and
  an inset top highlight.
- **Hover lift** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.38), 0 26px 52px rgba(8,178,195,0.24), 0 12px 24px rgba(0,0,0,0.10)` with `translateY(-2px to -5px)`):
  Cards and office tiles rise 2–5px and the teal halo deepens on hover.
- **Floating chrome** (`box-shadow: 0 14px 32px rgba(0,0,0,0.14–0.18)`): Buttons and the
  floating nav — a softer neutral shadow for elements over photography.
- **Form card** (`box-shadow: 0 25px 60px rgba(0,0,0,0.15)`): The contact card's lifted,
  document-like presence, finished with a 4px Clinical Teal Deep top-rule.

### Named Rules
**The Tinted-Lift Rule.** Resting elevation is a soft teal-tinted halo; interaction
deepens the halo and lifts the surface a few pixels. Never use a hard neutral-black drop
shadow — depth here is atmospheric and on-brand, not a 2014 card shadow.

## 5. Components

Buttons, cards, and inputs should feel like confident, tactile objects — soft depth, clear
states — while staying restrained enough that the teal does the signaling.

### Buttons
- **Shape:** Fully rounded pills (`9999px`). This is the signature button silhouette
  everywhere.
- **Primary:** Clinical Teal (`#00c1cf`) fill, white text, `font-weight 600`, padding
  ~`14px 22px`, soft floating shadow. Pairs with a trailing `ArrowRight` icon that nudges
  right on hover.
- **Hover / Focus:** Background shifts to Clinical Teal Deeper (`#0396a5`); a 2px focus-
  visible ring in Clinical Teal with a 2px offset. Transitions are color-only (~200ms).
- **Secondary:** Translucent white (`rgba(255,255,255,0.82)`) with a 1px white-ish border
  and `backdrop-blur`, graphite text — for placement over hero photography. Hover goes to
  solid white.
- **Ghost (nav):** No fill at rest; Slate Plum text, `8px` radius, hover fills with Surface
  Alt and shifts text to Graphite.

### Cards / Containers
- **Corner Style:** Generous — `16px` (nav, tiles) up to `24px` (content/form cards).
- **Background:** Surface white; teal-gradient variants for feature/CTA panels.
- **Shadow Strategy:** The soft teal-tinted halo from §4; lift 2–5px on hover.
- **Border:** Hairline `1px` Border (`#dddddd`) or a translucent white edge on tinted
  cards. The contact card adds a 4px Clinical Teal Deep **top**-rule (top only — see Don'ts).
- **Internal Padding:** `24–32px`.

### Inputs / Fields
- **Style:** Surface Field (`#f7fafb`) fill, 1px `#dce5e8` border, `16px` radius, graphite
  text, Clinical Teal Deep labels.
- **Focus:** Background brightens to pure white; visible focus treatment retained. Calm, no
  glow.

### Navigation
- **Style:** A floating pill bar — `max-w-7xl`, translucent white (`bg-white/90`) with
  `backdrop-blur`, 1px Border, `16px` radius, soft shadow, inset 16px from the viewport edge.
- **States:** Links are Slate Plum, hover fills Surface Alt + Graphite text; the inline
  "Contact Us" is a primary teal pill. Mobile collapses to a matching rounded sheet.

### Signature: The Catalog List
The product catalog is an **editorial list, not a card grid**. Each category is a full-
width row over a 12-column grid: a `01/02` index numeral, the category name (Figtree 700,
→ Clinical Teal Deep on hover), an uppercase partner/spec label, a description column, a
large tabular count, and a trailing `ArrowUpRight`. Rows are separated by hairline
`border-primary/10` dividers and tint Clinical Teal at 10% on hover. This is the
"curate, don't spreadsheet" principle made literal.

## 6. Do's and Don'ts

### Do:
- **Do** keep Clinical Teal (`#00c1cf`) as the single accent, on ≤10% of any screen — CTAs,
  links, focus rings, active states only.
- **Do** build hierarchy from Figtree weight contrast (200 → 800), not from extra sizes.
- **Do** use the soft, teal-tinted shadow halo and a 2–5px hover lift for depth.
- **Do** reach for the editorial catalog list before any card grid; curate, don't dump.
- **Do** keep dark text and fields on Graphite (`#313131`); pure white surfaces for clarity.
- **Do** consume colors through the `@theme` token utilities (`bg-cta`, `text-primary`,
  `border-border`) — never raw hex in `.jsx`/`.js` (ESLint enforces this).
- **Do** use `lucide-react` for all icons, and author motion assuming the global
  `prefers-reduced-motion` override neutralizes it.

### Don't:
- **Don't** recreate the **templated WordPress / WooCommerce** look — stock-theme chrome,
  widget clutter, e-commerce furniture. (The stale `labsolution-design` skill describes that
  old site; ignore it.)
- **Don't** build a **cluttered medical-supply catalog** — dense spreadsheet grids, tiny
  competing text, everything shouting at once.
- **Don't** drift into **cold, sterile, generic corporate** — faceless stock-photo template
  with no point of view. Keep the warm-sand humanity.
- **Don't** introduce a second accent color, gradient *text* (`background-clip: text`), or
  neon-on-dark "SaaS hype" gradients.
- **Don't** use a colored **left/right** stripe border (`border-left`/`border-right` > 1px)
  on cards, list items, or callouts. (The contact card's accent rule is **top**-only and
  intentional.)
- **Don't** set body copy in uppercase or drop a tiny tracked eyebrow above every section.
- **Don't** use pure black (`#000`) or hard neutral-black drop shadows.
- **Don't** add a third typeface; Figtree (display) + Noto Sans (body) only.
