# LabSolution Marketing Site Context

Marketing site for LabSolution Technologies, Inc. — a Philippines-based healthcare/diagnostics distributor. Single-page React app at `labsolution-tech.com`. This file captures the project-specific terminology that distinguishes how we talk about the catalog, the partners, and the featured content on the site.

## Language

**Active Portfolio**:
The full set of brands and SKUs LabSolution currently represents and distributes in the Philippines. Broader than what the website itself enumerates — includes reagents, consumables, hematology, and brands (e.g., Rayto, Edan) whose products are not yet documented to spec-sheet depth.
_Avoid_: full catalog, inventory, product line

**Documented Catalog**:
The subset of the Active Portfolio that has been researched to spec-sheet depth and is rendered on `labsolution-tech.com`. Currently 11 products defined in `catalog-spec-sheets-2026-05-20.md`. This is what visitors see in `ProductBrochure.jsx` and `Products.jsx`.
_Avoid_: featured products, catalog

**Flagship**:
The single product featured in the hero card at the top of the page. Visually prominent — gets its own illustration, tagline, and 3 hero specs. Picked for commercial priority + brand positioning, not necessarily the highest-throughput product.
_Avoid_: hero product, top product

**Partner**:
A manufacturer LabSolution actively represents in the Philippines. Rendered in the marquee strip in `Partners.jsx`. Drawn from the Active Portfolio — partners may appear in the marquee even when none of their products are in the Documented Catalog.
_Avoid_: brand, vendor (vendor is too generic — covers reagent suppliers, service vendors, etc.)

## Relationships

- A **Documented Catalog** entry is exactly one **Active Portfolio** SKU (1:1, subset).
- Every **Documented Catalog** entry's manufacturer is a **Partner** (but not every **Partner** has a product in the **Documented Catalog**).
- Exactly one **Documented Catalog** entry is the **Flagship** at any time.

## Example dialogue

> **Dev:** "I removed Rayto from the marquee since none of their products are in the new catalog."
> **Domain expert:** "Rayto is still in our **Active Portfolio** — we sell their hematology line. The new **Documented Catalog** just doesn't have a Rayto spec sheet yet. Partners stays."

> **Dev:** "If we add the FDA-CPR field to the catalog, do we add it to the marquee too?"
> **Domain expert:** "No — FDA-CPR lives on the **Documented Catalog** entry. The **Partners** marquee is the manufacturers we represent, not the regulatory metadata of individual SKUs."

## Flagged ambiguities

- "Catalog" by itself was ambiguous: it meant either the Active Portfolio (what we *sell*) or the Documented Catalog (what we *publish*). Resolved 2026-05-20 — these are distinct, with the website rendering only the Documented Catalog.
