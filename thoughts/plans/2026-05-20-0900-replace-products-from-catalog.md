# Replace Product Catalog from `catalog-spec-sheets-2026-05-20.md` Implementation Plan

> **Revision history**
> - 2026-05-20 0900 — initial plan
> - 2026-05-20 0930 — revised after grilling: Rayto/Edan stay, 3-category taxonomy, CTK perf claims dropped, new POC illustration, copy framing locked

## Overview

Remove the 13 hand-curated "featured" products and 6 high-level catalog categories currently shown on labsolution-tech.com and replace them with the 11 products documented in `catalog-spec-sheets-2026-05-20.md`. This is a content/data swap that touches six files (the five component files plus a new POC illustration). No architectural changes.

The site's new posture: the 11 spec-sheeted products are the **Documented Catalog** — the actively-marketed subset that has full spec-sheet depth. The **Active Portfolio** is broader (still includes Rayto, Edan, reagents, consumables, extended brand offerings) and is signaled via a small "available on request" hint, not enumerated.

## Current State Analysis

The site currently advertises diagnostic gear that does not match the company's actual 2026 product line:

- **`src/components/ProductBrochure.jsx:15-197`** — `products` array contains 13 entries (DiaSys Respons 920/940, Hemaray 51/86, RaFIA, AFP FIA, GE100, plus 5 CTK rapid tests). Categories: `all`, `chemistry`, `hematology`, `immunology`, `rapid`. Flagship is `diasys-940` (`highlight: true`).
- **`src/components/ProductBrochure.jsx:370-372`** — header copy says *"The full 106-product catalog is available on request."* — fabricated number.
- **`src/components/Products.jsx:3-46`** — 6 high-level categories with aspirational counts totaling 106.
- **`src/components/Hero.jsx:44-100`** — flagship card hard-codes `category="chemistry"` / `model="DiaSys Respons 940"` (a product no longer in the catalog).
- **`src/components/Partners.jsx:1-8`** — 6-brand marquee: CTK Biotech, DiaSys, Rayto, Snibe, Edan, **GE Healthcare**. The "GE Healthcare" entry is a factual error — the Bionime GE100 is a Bionime product, not General Electric / GE Healthcare.
- **`src/components/ProductIllustration.jsx:77-115`** — `HematologyIllustration` will become unused once hematology drops out of the catalog.

The catalog source-of-truth (`catalog-spec-sheets-2026-05-20.md`) lists 11 products from 6 manufacturers: SNIBE, DiaSys, Medica, Bionime, Lifotronic, CTK Biotech.

### Key Discoveries

- The `products` array in `ProductBrochure.jsx` is the only authoritative product list rendered on the site; everything else (`Products.jsx`, `Hero.jsx`) duplicates a subset by hand.
- The catalog explicitly flags surrogate-source performance claims on **CTK Typhoid** (100% sens / 94.35% spec — outbreak study) and **CTK Malaria** (94.2% / 97.3% — from a related Pf/Pan SKU). These should NOT be rendered as definitive customer-facing specs.
- The catalog's `file://` citation links are local paths and will not work on the live site; do not render to customers.
- **Bionime GE100** is a handheld pocket glucose meter (90.6 × 46 × 16.5 mm, 53 g). The existing benchtop chemistry illustration is visually misleading for this product — a new POC illustration is required.
- LabSolution still actively represents Rayto and Edan even though the new catalog doesn't document any of their products yet. The new catalog is a documented subset, not the full active portfolio.

## Desired End State

- The site renders the 11 products from `catalog-spec-sheets-2026-05-20.md` with accurate specs, category labels, and verified data.
- The 8-brand Partners marquee (CTK Biotech, DiaSys, Rayto, Snibe, Edan, Medica, Bionime, Lifotronic) reflects LabSolution's actual representation. GE Healthcare removed.
- Hero flagship is **SNIBE MAGLUMI X6**.
- 3 unified categories — **Chemistry (6)**, **Immunology (2)**, **Rapid Tests (3)** — used consistently in both `Products.jsx` overview and `ProductBrochure.jsx` filter pills.
- Bionime GE100 renders a new POC handheld illustration; unused HematologyIllustration is removed.
- No reference to "106-product catalog", "DiaSys Respons 940", "Hemaray", "RaFIA", "AFP FIA", or "GE Healthcare" remains.
- CTK Typhoid/Malaria cards show *no* surrogate sensitivity/specificity numbers.
- `npm run lint` passes.

### Verification

```bash
npm run lint
npm run dev   # then visit http://localhost:5173
```

Manually verify each filter pill, search a few products, and confirm visual rendering — full checklist in Phase 7.

## What We're NOT Doing

- Not refactoring the in-file `products`/`categories` arrays into a separate JSON module (intentional for this size of site).
- Not adding rendered citation links, FDA-CPR numbers, warranty months, or PDF spec sheet downloads to product cards (those are Appendix-A fields requiring sales-engineering input).
- Not changing the site layout, color tokens, motion behavior, or anchor navigation structure.
- Not committing `catalog-spec-sheets-2026-05-20.md` to the repo (it remains an untracked input at the root). Optional follow-up if the user wants version-controlled catalog history.
- Not running `vercel deploy` — the user triggers production deploy via PR merge to `main`.
- Not creating tests (the repo has no test runner per `CLAUDE.md`).

## Implementation Approach

**6 atomic commits + 1 verification phase** on the existing `new-products` branch.

Phase ordering note: `ProductIllustration.jsx` changes go **first** because Phase 2's brochure data references the new `poc` illustration key for Bionime GE100. Removing unused hematology is bundled into the same commit since both are illustration-map changes.

Final category mapping (used in both Products.jsx overview and ProductBrochure.jsx filter pills):

| # | Catalog product | `category` | `illustration` override |
|---|---|---|---|
| 1 | SNIBE MAGLUMI X3 | `immunology` | — |
| 2 | SNIBE MAGLUMI X6 ⭐ flagship | `immunology` | — |
| 3 | DiaSys respons 240c | `chemistry` | — |
| 4 | DiaSys respons 420c | `chemistry` | — |
| 5 | DiaSys respons 600c | `chemistry` | — |
| 6 | Medica EasyLyte | `chemistry` | — |
| 7 | Bionime GE100 | `chemistry` | `poc` |
| 8 | Lifotronic H8 | `chemistry` | — |
| 9 | CTK Dengue Duo (R0062C) | `rapid` | — |
| 10 | CTK Typhoid IgG/IgM (R0161C) | `rapid` | — |
| 11 | CTK Malaria Pf/Pv (R0112C) | `rapid` | — |

Counts: Chemistry 6 / Immunology 2 / Rapid Tests 3 = 11.

---

## Phase 1: Add POC illustration, remove unused Hematology

### Overview
Bionime GE100 is a handheld pocket meter; the current chemistry SVG (benchtop with sample disk) misleads. Add a 4th illustrator showing a handheld device with LCD + strip slot. Same commit removes the now-unused `HematologyIllustration`.

### Changes Required

**File**: `src/components/ProductIllustration.jsx`

1. Add new `PocIllustration` component below `RapidTestIllustration` (~40-60 lines). Visual elements:
   - Small device chassis (proportions ~ portrait, narrow)
   - LCD area with mock reading "5.4 mmol/L" or similar
   - Single round button
   - Test strip slot at top with a strip protruding
   - Same `Frame` wrapper / `Defs` gradients as existing illustrators (consistency)
2. Delete the `HematologyIllustration` component (lines 77-115).
3. Update the `ILLUSTRATIONS` map:

```jsx
const ILLUSTRATIONS = {
  chemistry: ChemistryIllustration,
  immunology: ImmunologyIllustration,
  rapid: RapidTestIllustration,
  poc: PocIllustration,
}
```

The fallback at line 222 (`Component = ILLUSTRATIONS[category] ?? ChemistryIllustration`) stays.

### Success Criteria

#### Automated Verification
- [ ] `npm run lint` passes.

#### Manual Verification (deferred — needs Phase 2 wiring)
- N/A this phase. The new illustrator only renders once the brochure data references it.

**Implementation Note**: After completing this phase and lint passes, proceed to Phase 2.

---

## Phase 2: Replace `products` array + categories + intro copy in `ProductBrochure.jsx`

### Overview
Replace the 13-entry product array with 11 catalog products. Replace 5-entry categories with 4. Update intro copy to the new "Direct & honest" voice. Set MAGLUMI X6 as flagship.

### Changes Required

#### 1. Categories filter array (lines 5-11)

```jsx
const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'immunology', label: 'Immunology' },
  { key: 'rapid', label: 'Rapid Tests' },
]
```

#### 2. Products array (lines 15-197)

Replace with 11 entries. Each follows the existing shape:

```js
{
  id, category, model, brand, tagline, description,
  specs: [{ label, value }, × 4],
  // optional:
  illustration?: 'poc',   // new field; only Bionime GE100 uses it
  highlight?: true,       // only snibe-maglumi-x6
}
```

Spec selections (4 per product, all from verified catalog data — CTK Typhoid/Malaria use safe fields, NOT the surrogate-source performance numbers):

| ID | Model | Brand | Specs |
|---|---|---|---|
| `snibe-maglumi-x3` | SNIBE MAGLUMI X3 | Snibe Diagnostic | Throughput **200 T/h** · Sample positions **72** · Reagents **20 refrigerated** · Footprint **< 0.68 m²** |
| `snibe-maglumi-x6` ⭐ | SNIBE MAGLUMI X6 | Snibe Diagnostic | Throughput **450 T/h** · Sample positions **112 → 412** · Test menu **260 parameters** · Walk-away **2,000 tests** |
| `diasys-respons-240c` | DiaSys respons 240c | DiaSys | Throughput **240 T/h** · Photometer **12 wavelengths** · Sample volume **2–35 µL** · Reagents **36 + 3 ISE** |
| `diasys-respons-420c` | DiaSys respons 420c | DiaSys | Throughput **420 T/h** · HbA1c **onboard hemolysis** · Sample tray **102 positions** · Reagent tray **42 @ 2–8 °C** |
| `diasys-respons-600c` | DiaSys respons 600c | DiaSys | Throughput **600 T/h** · ISE **Na, K, Cl integrated** · Sample positions **120** · Reagents **37 @ 2–8 °C** |
| `medica-easylyte` | Medica EasyLyte | Medica | Cycle **~60 s blood** · Sample volume **~100 µL** · Pack life **≈1,200 samples** · Configurations **4 ISE sets** |
| `bionime-ge100` | Bionime GE100 | Bionime | Test time **5 seconds** · Sample volume **0.75 µL** · Range **20–600 mg/dL** · Memory **500 results** |
| `lifotronic-h8` | Lifotronic H8 | Lifotronic | First result **1.5 min** · Precision **CV ≤ 1.3 %** · Range **3 – 18 % HbA1c** · Column life **≥ 8,000 tests** |
| `ctk-dengue-duo` | CTK OnSite Duo Dengue | CTK Biotech | Detects **NS1 + IgG + IgM** · Result **20–25 min** · Pack **30 tests** · Certification **CE-IVD** |
| `ctk-typhoid` | CTK OnSite Typhoid IgG/IgM | CTK Biotech | Detects **IgG + IgM** · Result **15 min** · Pack **30 tests** · Certification **CE-IVD** |
| `ctk-malaria` | CTK OnSite Malaria Pf/Pv | CTK Biotech | Detects **Pf (HRP-II) + Pv (pLDH)** · Sample volume **5 µL** · Result **15–20 min** · Certification **CE-IVD** |

Example full entry:

```jsx
{
  id: 'snibe-maglumi-x6',
  category: 'immunology',
  model: 'SNIBE MAGLUMI X6',
  brand: 'Snibe Diagnostic',
  tagline: 'High-throughput floor-standing CLIA immunoanalyzer',
  description:
    'Direct chemiluminescence with 243 simultaneous incubation cuvettes and 5-side heating at 37 ± 0.3 °C. Up to 2,000 walk-away tests across a 260-parameter menu, TLA-ready for total lab automation.',
  specs: [
    { label: 'Throughput', value: '450 T/h' },
    { label: 'Sample positions', value: '112 → 412' },
    { label: 'Test menu', value: '260 parameters' },
    { label: 'Walk-away', value: '2,000 tests' },
  ],
  highlight: true,
},
```

For descriptions: match the existing 2-sentence voice ("X for Y. Z technical detail."). Include search-friendly keywords (e.g., GE100 description should mention "glucose"/"diabetes"/"point-of-care"; H8 should mention "HbA1c"/"diabetes"/"HPLC"/"NGSP").

#### 3. Illustration override prop (one tiny wiring change)

`ProductCard` and `FeaturedSpotlight` both call:

```jsx
<ProductIllustration category={product.category} model={product.model} />
```

Update to:

```jsx
<ProductIllustration category={product.illustration ?? product.category} model={product.model} />
```

Both sites. This wires GE100's `illustration: 'poc'` override.

#### 4. Intro copy (lines 360-377)

```jsx
<p className="mt-5 text-secondary text-base sm:text-lg leading-relaxed">
  Detailed specifications for the analyzers and rapid tests we actively represent.
  Reagents, consumables, and extended brand portfolios available on request.
</p>
{/* ... */}
<div className="inline-flex items-center gap-2 self-start lg:self-end bg-accent-soft border border-accent/20 text-accent text-xs font-semibold px-4 py-2 rounded-full">
  {products.length} products · CE-IVD
</div>
```

### Success Criteria

#### Automated Verification
- [ ] `npm run lint` passes.

#### Manual Verification
- [ ] Brochure renders 11 product cards.
- [ ] Featured spotlight shows MAGLUMI X6.
- [ ] Bionime GE100 card renders the new POC handheld illustration (not benchtop).
- [ ] Filter counts: Chemistry **6**, Immunology **2**, Rapid Tests **3**, All **11**.
- [ ] CTK Typhoid + CTK Malaria cards display **no** sensitivity/specificity numbers.
- [ ] Search "MAGLUMI" → 2 results; "dengue" → 1; "Medica" → 1; "HbA1c" → 1 (Lifotronic H8); "glucose" → 1 (Bionime GE100).
- [ ] No reference to "Hemaray", "RaFIA", "Respons 940", or "106" remains.

**Implementation Note**: Pause for manual confirmation before Phase 3.

---

## Phase 3: Replace category overview in `Products.jsx`

### Overview
Top-level Products section is the category teaser linking to `#brochure`. Replace 6 aspirational categories with 3 unified categories matching the brochure. Add the "extended portfolios on request" line under the count subhead.

### Changes Required

#### 1. Categories array (lines 3-46)

```jsx
const categories = [
  {
    title: 'Chemistry Analyzers',
    description:
      'Random-access clinical chemistry, direct-ISE electrolytes, HPLC HbA1c, and point-of-care glucose monitoring.',
    count: 6,
    span: 'DiaSys · Medica · Bionime · Lifotronic',
  },
  {
    title: 'CLIA Immunoassay',
    description:
      'Fully-automated chemiluminescence immunoassay analyzers — direct ABEI labeling, 200+ parameter menus, TLA-ready.',
    count: 2,
    span: 'SNIBE MAGLUMI · 200–450 T/h',
  },
  {
    title: 'Rapid Diagnostic Tests',
    description:
      'CE-IVD lateral-flow cassettes for tropical infectious disease screening — dengue, typhoid, malaria.',
    count: 3,
    span: 'CTK OnSite · 15–25 min',
  },
]
```

#### 2. Subheader line (line 66) — locked copy

```jsx
<p className="mt-2 text-secondary text-sm uppercase tracking-[0.2em] font-semibold">
  Documented analyzers and rapid tests · 3 categories
</p>
```

The numeral `{totalCount}+` auto-derives to `11+`.

#### 3. "Extended portfolios on request" hint

After the title/numeral block, add a small line (matches the "Direct & honest" copy that's also in the brochure intro):

```jsx
<p className="mt-3 text-secondary text-sm lg:text-right">
  Reagents, consumables, and extended brand portfolios available on request.
</p>
```

Place it inside the right column under the count subline (so it appears alongside the big numeral on lg+ and stacks naturally on mobile).

### Success Criteria

#### Automated Verification
- [ ] `npm run lint` passes.

#### Manual Verification
- [ ] Products section shows 3 rows with counts 6, 2, 3.
- [ ] Big numeral reads `11+`.
- [ ] Subline reads "Documented analyzers and rapid tests · 3 categories".
- [ ] "Extended portfolios on request" hint visible.
- [ ] Each row still links to `#brochure`.

**Implementation Note**: Pause for manual confirmation before Phase 4.

---

## Phase 4: Update Hero flagship to MAGLUMI X6

### Overview
Switch hero card from DiaSys Respons 940 → SNIBE MAGLUMI X6 (illustration, name, tagline, 3 displayed specs).

### Changes Required

**File**: `src/components/Hero.jsx` (lines 44-100)

```jsx
<ProductIllustration category="immunology" model="SNIBE MAGLUMI X6" />
{/* ... */}
<span className="absolute top-4 right-4 ...">
  Immunology
</span>
{/* ... */}
<p className="mt-1 font-heading font-[700] text-primary text-xl leading-tight">
  SNIBE MAGLUMI X6
</p>
<p className="mt-1 font-heading text-secondary text-sm italic">
  High-throughput floor-standing CLIA immunoanalyzer
</p>
<dl className="mt-5 grid grid-cols-3 gap-x-3 pt-5 border-t border-border">
  <div>
    <dt className="...">Throughput</dt>
    <dd className="...">450 T/h</dd>
  </div>
  <div>
    <dt className="...">Test menu</dt>
    <dd className="...">260</dd>
  </div>
  <div>
    <dt className="...">Walk-away</dt>
    <dd className="...">2,000</dd>
  </div>
</dl>
```

### Success Criteria

#### Automated Verification
- [ ] `npm run lint` passes.

#### Manual Verification
- [ ] Hero shows MAGLUMI X6, Immunology badge, and the 3 new spec tiles.
- [ ] Illustration switches to the immunology variant.
- [ ] Hero CTA buttons still scroll to `#brochure` and `#contact`.

**Implementation Note**: Pause for manual confirmation before Phase 5.

---

## Phase 5: Update partner marquee

### Overview
Remove the factually-incorrect "GE Healthcare" entry (Bionime GE100 is unrelated to GE Healthcare). Add Medica, Bionime, Lifotronic (the three new brands with products in the catalog). Keep Rayto and Edan — LabSolution still actively represents these brands even though no Rayto/Edan products are in the documented catalog yet.

### Changes Required

**File**: `src/components/Partners.jsx` (lines 1-8)

```jsx
const partners = [
  { name: 'Snibe', italic: true },
  { name: 'DiaSys', italic: false },
  { name: 'Medica', italic: true },
  { name: 'Bionime', italic: false },
  { name: 'Lifotronic', italic: true },
  { name: 'Rayto', italic: false },
  { name: 'Edan', italic: true },
  { name: 'CTK Biotech', italic: false },
]
```

Order: SNIBE → DiaSys (highest-value analyzers) → Medica → Bionime → Lifotronic (specialty analyzers) → Rayto → Edan (legacy partners still represented) → CTK Biotech (rapid tests). Italic-alternating pattern preserved.

### Success Criteria

#### Automated Verification
- [ ] `npm run lint` passes.

#### Manual Verification
- [ ] Partners marquee scrolls with 8 names in the specified order.
- [ ] No "GE Healthcare" string remains.
- [ ] Hover-pause still works.

**Implementation Note**: Pause for manual confirmation before Phase 6.

---

## Phase 6: (consolidated into Phase 1) — removed

The original Phase 5 (remove unused hematology illustration) was bundled into Phase 1 since both are illustration-map changes.

---

## Phase 7: Final verification

### Overview
End-to-end check before opening a PR. No code changes.

### Verification Checklist

- [ ] `npm run lint` — clean.
- [ ] `npm run dev` — site builds without console errors.
- [ ] Scroll through `/`:
  - [ ] Hero shows MAGLUMI X6 with immunology illustration.
  - [ ] Partners marquee has 8 brands (Snibe, DiaSys, Medica, Bionime, Lifotronic, Rayto, Edan, CTK Biotech).
  - [ ] Products section shows 3 categories totaling 11, with "Extended portfolios on request" hint visible.
  - [ ] Brochure spotlight features MAGLUMI X6.
  - [ ] All 11 product cards render.
  - [ ] Bionime GE100 card renders POC handheld illustration (not benchtop).
- [ ] Click each filter pill: All=11, Chemistry=6, Immunology=2, Rapid Tests=3.
- [ ] Search "Medica" → 1, "MAGLUMI" → 2, "HbA1c" → 1, "glucose" → 1, "diabetes" → matches Bionime + Lifotronic descriptions, "dengue" → 1.
- [ ] Click "Request datasheet"/"Book a demo" → scrolls to `#contact`.
- [ ] Navbar anchor links still work.
- [ ] No remaining strings: `grep -rEi "hemaray|rafia|afp.fia|respons.94|respons.92|rayto.*hema|GE Healthcare|106.product" src/` returns empty.
- [ ] CTK Typhoid + Malaria cards show no sensitivity/specificity numbers.
- [ ] `prefers-reduced-motion` toggle in devtools still neutralizes the marquee animation.

### Commit + PR

- [ ] 5 commits on `new-products` branch (Phases 1 / 2 / 3 / 4 / 5; Phase 7 is no-code).
- [ ] Commit messages describe the *why* (e.g., `feat: add POC handheld illustration and drop unused hematology`, `feat: replace product brochure with 2026-05-20 documented catalog`, `feat: feature MAGLUMI X6 in hero`, `feat: update partner marquee with Medica/Bionime/Lifotronic`, `chore: refocus top-level products on documented catalog`).
- [ ] Surface branch name `new-products` at handoff.

---

## Testing Strategy

No automated tests in this repo per `CLAUDE.md`. Verification is `npm run lint` + manual browser walkthrough.

## Rollback Plan

5-commit content swap on a feature branch:

- **Mid-implementation**: `git reset --hard origin/main` then re-run. No external state changes.
- **Post-merge**: `git revert` each commit in reverse order, or revert the merge commit. Vercel auto-deploys `main`, so revert PR → one deploy cycle to restore.

## Open follow-ups (not in scope here)

- Add an illustration tailored to HPLC (Lifotronic H8) — currently falls back to chemistry. Less misleading than the GE100 case but still a visual inaccuracy.
- Decide whether to commit `catalog-spec-sheets-2026-05-20.md` to the repo (e.g., under `docs/catalog/` or `thoughts/`) for audit history.
- Fill in Appendix A fields (FDA-CPR numbers, local warranty, MTTR SLA, LIS profiles) once sales-engineering provides them.
- Consider per-product "View spec sheet (PDF)" links once verified manuals are loaded into the customer-facing site or a CDN.
