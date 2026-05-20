# Documented Catalog as the public surface; broader Active Portfolio signaled on request

The website renders only the **Documented Catalog** — the spec-sheeted subset of products we publish to labsolution-tech.com (currently the 11 entries in `catalog-spec-sheets-2026-05-20.md`). The broader **Active Portfolio** (Rayto, Edan, reagents, consumables) is signaled via "available on request" copy in `Products.jsx` and `ProductBrochure.jsx` — never enumerated with fabricated counts.

The alternative was a breadth-marketing posture (the previous "106+ products" framing), which is more impressive at a glance but quotes performance specs we cannot substantiate against in-repo vendor manuals. In a regulated diagnostics market we'd rather signal credibility than breadth, and let interested buyers ask for the rest.

## Consequences

- **Partners marquee may include brands with zero Documented Catalog entries** (e.g., Rayto, Edan). This is intentional — Partners enumerates Active Portfolio manufacturers, not Documented Catalog manufacturers. See `CONTEXT.md`.
- **The big "11+" numeral in `Products.jsx` will lag the marketing reality** until more vendor manuals are loaded into `manuals-and-lis-protocol/` and the catalog spec sheet is refreshed.
- **Surrogate-source performance claims are dropped from product cards** (e.g., CTK Typhoid 100% sensitivity, CTK Malaria Pf/Pv sensitivity numbers). They reappear only once lot-specific or instrument-specific data is added to the in-repo manuals.
