# LabSolution Site Context

Marketing site for LabSolution Technologies, Inc. — a Philippines-based healthcare/diagnostics distributor. Single-page React app at `labsolution-tech.com`. This file captures the project-specific terminology used to talk about (a) the catalog, partners, and featured content on the site itself and (b) the agentic harness that lets a non-engineer drive code changes to it.

## Catalog & brand language

**Active Portfolio**:
The full set of brands and SKUs LabSolution currently represents and distributes in the Philippines. Broader than what the website itself enumerates — includes reagents, consumables, hematology, and brands (e.g., Rayto, Edan) whose products are not yet documented to spec-sheet depth.
_Avoid_: full catalog, inventory, product line

**Documented Catalog**:
The subset of the Active Portfolio that has been researched to spec-sheet depth and is rendered on `labsolution-tech.com`. Currently 11 products defined in `docs/catalog-spec-sheets-2026-05-20.md`. This is what visitors see in `ProductBrochure.jsx` and `Products.jsx`.
_Avoid_: featured products, catalog

**Flagship**:
The single product featured in the hero card at the top of the page. Visually prominent — gets its own illustration, tagline, and 3 hero specs. Picked for commercial priority + brand positioning, not necessarily the highest-throughput product.
_Avoid_: hero product, top product

**Partner**:
A manufacturer LabSolution actively represents in the Philippines. Rendered in the marquee strip in `Partners.jsx`. Drawn from the Active Portfolio — partners may appear in the marquee even when none of their products are in the Documented Catalog.
_Avoid_: brand, vendor (vendor is too generic — covers reagent suppliers, service vendors, etc.)

### Relationships

- A **Documented Catalog** entry is exactly one **Active Portfolio** SKU (1:1, subset).
- Every **Documented Catalog** entry's manufacturer is a **Partner** (but not every **Partner** has a product in the **Documented Catalog**).
- Exactly one **Documented Catalog** entry is the **Flagship** at any time.

### Example dialogue

> **Dev:** "I removed Rayto from the marquee since none of their products are in the new catalog."
> **Domain expert:** "Rayto is still in our **Active Portfolio** — we sell their hematology line. The new **Documented Catalog** just doesn't have a Rayto spec sheet yet. Partners stays."

> **Dev:** "If we add the FDA-CPR field to the catalog, do we add it to the marquee too?"
> **Domain expert:** "No — FDA-CPR lives on the **Documented Catalog** entry. The **Partners** marquee is the manufacturers we represent, not the regulatory metadata of individual SKUs."

## Agentic-harness language

**Site Editor**:
A non-engineer at LabSolution (marketing, content, or operations) who drives changes to the site through the agentic harness. Fluent in English, comfortable with web apps, but does not read JSX and has never used git, npm, or a terminal.
_Avoid_: "less technical personnel", "non-tech user", "content person"

**Agentic Harness**:
The scaffolding — curated instruction files (`CLAUDE.md`, `AGENTS.md`, shared prompts/skills), restricted tool surface, preview workflow, and review gate — that lets a Site Editor safely produce code changes to this repo. Lives *in the repo*; runtime-agnostic.
_Avoid_: "the agent", "the bot", "the AI", "the prompt"

**Runtime**:
A concrete AI coding agent that reads the harness and executes work — currently Codex (web app, Mac app, or CLI) and Claude Code (Mac app or CLI). The harness is designed so any of these can drive it.
_Avoid_: "the agent" (use Runtime when you mean the platform; use Agentic Harness when you mean the repo scaffolding)

**Owner**:
The maintainer of this repo and the harness itself (Marloe). Reviews and merges every change a Site Editor produces, and runs heavier CLI Runtimes for harness maintenance and rescue.
_Avoid_: "admin", "developer"

**Proposed Change**:
A single PR opened by a Runtime on behalf of a Site Editor, targeting `main` from a feature branch. Carries the Vercel preview URL in the PR comments and is the only path by which Site Editor work reaches production.
_Avoid_: "the change", "the edit", "the request"

### Relationships

- A **Site Editor** drives a **Runtime** (running locally on their Mac with a clone of this repo).
- The **Runtime** reads the **Agentic Harness**, makes file changes, commits to a feature branch, pushes, and opens a **Proposed Change** (PR) via `gh`.
- The `preview.yml` workflow lints, builds, and deploys to Vercel, then upserts a comment with the preview URL on the **Proposed Change**.
- The **Owner** reviews the **Proposed Change** on github.com and merges it.
- The `production.yml` workflow runs on push to `main` and deploys to production.

## Flagged ambiguities

- "Catalog" by itself was ambiguous: it meant either the Active Portfolio (what we *sell*) or the Documented Catalog (what we *publish*). Resolved 2026-05-20 — these are distinct, with the website rendering only the Documented Catalog.
