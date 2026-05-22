---
name: add-products
description: Add one or more products to the LabSolution Technologies site catalog. Use this skill whenever a Site Editor wants to add a new diagnostic instrument, reagent, rapid test, or analyzer to the brochure — phrases like "add a new product", "add the DiaSys Respons 1000 to the catalog", "I have a brochure for [model]", "put this rapid test on the site", "add these to our product list", "we just took on a new line — add it", or any time the user is dropping a product brochure (PDF/image) or asking you to look something up online and put it on the site. Handles two input modes: (a) the user feeds a product brochure file, or (b) you search the web from a model name. Produces a single PR that updates the brochure catalog, bumps the category count on the products section, and runs lint + build before pushing.
---

# Add products to the catalog

This skill walks you through adding one or more diagnostic products to the LabSolution Technologies catalog. The catalog is the lab's storefront — every product card is a sales asset, so the data model is strict and the brand voice has to stay on. This skill makes that fast and consistent.

The site lives in this repo. Product data lives in two React components in `src/components/`:

- `src/components/ProductBrochure.jsx` — the catalog grid with per-product cards. Adding a product means appending one entry to the `products` array.
- `src/components/Products.jsx` — the headline category strip. Adding a product means bumping the `count` on the matching category and (rarely) updating the `description`/`span`.

A third file, `src/components/ProductIllustration.jsx`, renders an SVG illustration based on the product's `category`. New entries reuse the existing illustration set — no edits needed unless the product introduces a brand-new category (rare; flag to the Owner first if so).

## When to invoke this skill

Trigger this skill the moment the user signals an *additive* change to the catalog. Examples:

- "Add the DiaSys Respons 1000 — here's the brochure" + PDF/image attached
- "Put the new Rayto CBC analyzer on the site, can you find the specs online?"
- "We have 3 new CTK rapid tests to add: [names]"
- "Update the catalog with this new product line from X"

If the user is *removing* or *editing* an existing product, this skill doesn't apply — that's a direct edit to `ProductBrochure.jsx`.

## Workflow

### 1. Confirm the operating branch

You should be on a fresh `editor/<slug>` branch off `main`. If you're on `main` directly, stop and create the branch first (e.g., `git switch -c editor/add-diasys-1000`). One branch per logical add — if the user is adding 5 unrelated products, that's one branch with one logical commit ("feat: add 5 rapid tests to catalog") or one branch per product, your call based on whether they share a theme.

### 2. Gather inputs

You're in one of two modes:

**Mode A — Brochure provided.** The user has attached a PDF or image of the manufacturer's brochure or datasheet. Read it (use the PDF tool for PDFs, vision for images) and extract: brand, model name, tagline, description, top 4 specs, category. If anything is ambiguous (e.g., the brochure lists 8 specs and you have to pick 4), surface your picks to the user and confirm before writing files.

**Mode B — Web search.** The user gave you a model name and asked you to look it up. Search the web (use WebSearch then WebFetch on the most authoritative result — usually the manufacturer's product page, then the distributor's spec sheet as a cross-check). Pull the same fields. Cite the URL(s) in your summary back to the user so they can verify. Be skeptical of marketing fluff; lean on technical specifications over vibes.

If the brand or category is *brand-new* to this catalog (no other product in `ProductBrochure.jsx` shares it), flag this to the user before proceeding — a new category requires illustration work the Owner usually wants to scope separately.

### 3. Fill the data model

Each product is a single entry in the `products` array in `src/components/ProductBrochure.jsx`. Schema:

```js
{
  id: 'kebab-case-slug',          // unique across products; usually `<brand>-<model-number>` lowercased
  category: 'chemistry',          // one of: 'chemistry' | 'hematology' | 'immunology' | 'rapid'
  model: 'DiaSys Respons 1000',   // marketing name, title case
  brand: 'DiaSys',                // manufacturer, as it appears on packaging
  tagline: '…',                   // short italic subtitle, one line, ≤ ~60 chars
  description: '…',               // 2–3 sentences of prose; what it is + what it does well
  specs: [                        // EXACTLY 4 specs — the UI grid is 2×2 / 4×1 and breaks with other counts
    { label: 'Throughput',   value: '600 T/H' },
    { label: 'Sample tray',  value: '90 + STAT' },
    { label: 'Wavelengths',  value: '14 · 340–700 nm' },
    { label: 'Storage',      value: '500,000 results' },
  ],
  highlight: true,                // OPTIONAL — set on only one product across the whole array (the flagship)
}
```

Field rules:

- **`id`** must be unique. Skim the existing array. Typical pattern: `diasys-940`, `hemaray-51`, `covid-flu-combo`. Use the model number if there is one.
- **`category`** is the *brochure filter* category, not the Products.jsx category. The four valid values are listed in the `categories` array at the top of `ProductBrochure.jsx`. Pick the closest existing one; don't invent.
- **`tagline`** sits under the model name in italics. Keep it terse — "High-throughput automated chemistry analyzer", "Point-of-care glucose monitoring". No marketing exclamation, no "the world's first…" unless verifiable.
- **`description`** appears as body copy. 2–3 sentences. State the use case, the technology, and one distinctive performance number. Write like a lab manager would brief their team, not like an ad agency.
- **`specs`** must have length exactly 4. Pick the four numbers a lab buyer cares about most — throughput, sample volume, range, cycle time, accuracy/CV, certifications, kit size, sample type. `label` is short (≤ ~14 chars); `value` can be a unit-bearing number or a short phrase. Use the special middot character `·` (not a regular dot) to separate compound values like `12 · 340–705 nm`.
- **`highlight`** is the "Flagship" tag and pulls the product into the FeaturedSpotlight. Set this on *at most one* product across the whole array. If the user wants to make a new product flagship, you must remove `highlight` from the current flagship in the same edit.

### 4. Pick the right Products.jsx category to bump

The Products.jsx categories (headline strip) don't 1:1 map to ProductBrochure.jsx categories. Map deliberately:

| New product is a…                                      | ProductBrochure category | Products.jsx `title` to bump  |
| ------------------------------------------------------ | ------------------------ | ----------------------------- |
| Chemistry analyzer / instrument                        | `chemistry`              | "Chemistry Analyzers"         |
| Chemistry reagent kit                                  | `chemistry`              | "Chemistry Reagents"          |
| Blood gas / electrolyte analyzer or kit                | `chemistry` (closest) or flag to owner | "Blood Gas & Electrolytes" |
| CBC analyzer / hematology instrument or reagent        | `hematology`             | "Hematology"                  |
| FIA / IFA / immunoassay analyzer or reagent kit        | `immunology`             | "Immunology"                  |
| CTK Biotech (or similar) lateral-flow rapid test       | `rapid`                  | "CTK Biotech Rapid Tests"     |

Open `src/components/Products.jsx`, find the matching category by `title`, and increment its `count` by 1 (or by however many products you added in this PR). If the category description or `span` no longer fits because you've added something distinctive (e.g., your new product is the first sub-3% CV in immunology and the description says "<3% CV"), you may refine the wording — but keep edits narrow and surface them to the user before committing.

### 5. Edit files

Open `src/components/ProductBrochure.jsx` and append the new entry (or entries) to the `products` array, keeping the file's grouping convention: items are grouped roughly by category in the order they appear. Match the indentation and trailing-comma style of the surrounding entries.

Open `src/components/Products.jsx` and bump the matching category's `count`.

Don't reorder unrelated entries. Don't reformat the file. Don't sneak in changes outside the catalog.

### 6. Brand-token check

The brand-token rule (ADR 0002, see [`docs/adr/`](../../docs/adr/) if present) forbids raw hex in `.jsx`/`.js`. ESLint enforces it. If any string you wrote contains `#` followed by 3+ hex characters (e.g., `#FF0000`, `#286`), either reword to avoid it or replace with a brand-token Tailwind utility. The new product entry should not need raw hex — illustrations are picked from a fixed palette by `ProductIllustration.jsx`.

### 7. Run lint and build locally

```sh
npm run lint
npm run build
```

Both must pass. If lint flags a raw-hex error on your changes, fix it. If build fails because of a JSX syntax error in your edit, fix it. Do not push or open a PR until both are clean.

### 8. Commit

One commit per logical addition. Conventional-commit prefix:

```
feat(catalog): add DiaSys Respons 1000 to the chemistry brochure

A 600 T/H high-throughput analyzer added to the catalog at the Site
Editor's request — bumps the Chemistry Analyzers count from 9 to 10.
```

If you added several products in one PR, list them in the body:

```
feat(catalog): add 3 new CTK rapid tests

- Norovirus Ag Rapid Test
- Influenza A subtyping H1N1
- HBsAg Combo

Bumps the CTK Biotech Rapid Tests count from 41 to 44.
```

### 9. Push and open the PR

Push the branch and open the PR using `gh pr create`. The repo has a `.github/pull_request_template.md` (once the agentic harness has merged) — let `gh` use it by default, then fill in the "What's changing and why" block with plain English. Tag the Owner: `@marloeuyjr please review`. The preview workflow will post a Vercel URL within ~60 seconds; tell the Site Editor to check the new card on the preview, on mobile and desktop, before you ask the Owner to review.

## Pitfalls and judgment calls

- **specs.length must be 4.** The CSS grid is built for 4. If the brochure has 6 specs, pick the 4 most differentiated. If it has 3, find a fourth (typical extras: certification, kit size, sample type, intended use).
- **The middot `·` (U+00B7), not a regular dot.** Existing entries use it for compound spec values. Match style.
- **Don't introduce a new category casually.** If the product genuinely doesn't fit `chemistry`/`hematology`/`immunology`/`rapid`, stop and flag to `@marloeuyjr` — a new category needs both filter and illustration work.
- **One `highlight: true` at a time.** If the user asks for the new product to be flagship, remove `highlight` from the current one in the same diff and call it out in the commit message.
- **Web-search hygiene.** Manufacturer pages are the canonical source for specs. Distributor pages and aggregators often round numbers or paraphrase. Cite the source URL(s) in your summary; if numbers disagree across sources, surface the discrepancy and let the user decide.
- **Image-heavy brochures.** If a PDF brochure is mostly imagery and OCR-poor, ask the user for the model number or a text spec sheet rather than guessing — wrong specs on a sales site are worse than no card.
- **Pricing.** Don't put prices on cards. The catalog is "Request a quote" pattern by design.
- **More than ~5 products at once.** That's a catalog refresh, not a single edit. Either split into multiple PRs grouped by category, or flag to `@marloeuyjr` before continuing.

## Worked examples

### Example A — Brochure mode

User attaches `respons-1000-brochure.pdf` and says "add this one".

1. Read PDF. Extract: brand "DiaSys", model "Respons 1000", category fits `chemistry`, tagline "Walk-away high-throughput chemistry analyzer".
2. Pick 4 specs from the spec table: throughput, sample tray, wavelengths, results storage.
3. Append to `products` array in `ProductBrochure.jsx`, after the existing DiaSys entries:

   ```js
   {
     id: 'diasys-1000',
     category: 'chemistry',
     model: 'DiaSys Respons 1000',
     brand: 'DiaSys',
     tagline: 'Walk-away high-throughput chemistry analyzer',
     description:
       'Random-access biochemistry for large hospital and reference labs. 600 tests/hour with onboard refrigerated reagent storage, automatic dilution, and an integrated ISE module for routine electrolytes.',
     specs: [
       { label: 'Throughput',   value: '600 T/H' },
       { label: 'Sample tray',  value: '90 + STAT' },
       { label: 'Wavelengths',  value: '14 · 340–700 nm' },
       { label: 'Storage',      value: '500,000 results' },
     ],
   },
   ```

4. Bump `count` on "Chemistry Analyzers" in `Products.jsx` from 9 to 10.
5. `npm run lint && npm run build` — both pass.
6. Commit: `feat(catalog): add DiaSys Respons 1000 to the chemistry brochure`.
7. Push, open PR, tag Owner.

### Example B — Web-search mode

User says "add the Rayto Hemaray 90 — find the specs".

1. WebSearch for `"Rayto Hemaray 90" specifications`.
2. WebFetch the top manufacturer hit (`rayto.com/...`). Confirm with a second source.
3. Extract: brand "Rayto", model "Hemaray 90", category `hematology`.
4. Summarize the picked fields back to the user *before* writing files, with the source URL. Wait for confirmation.
5. On user OK, append to `products`, bump "Hematology" count in `Products.jsx`, lint, build, commit, push, PR.

If the sources disagree on a spec (e.g., one says 80 samples/h and another says 60), call it out: "Manufacturer page says 80; the 2024 distributor sheet says 60. Which value should I use?"
