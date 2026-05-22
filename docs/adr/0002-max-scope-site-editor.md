# Max-scope Site Editor with compensating gates

## Context

A non-engineer **Site Editor** drives the harness via a Runtime. We had to decide how much of the repo the Site Editor (through the Runtime) is allowed to change. The narrow option (content + brand tokens only) is conservative but bottlenecks on the Owner for any structural work. The wide option (anything except security-sensitive paths) is flexible but loads the Owner's review with brand/a11y/perf catches.

## Decision

The Site Editor may change anything in the repo **except** `api/contact.js` (PII / email) and the harness files themselves (`CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `README.md`, `.github/`).

To compensate for the wide scope, the following gates apply:

1. **Thick instruction layer** in `CLAUDE.md` (persona, scope, brand non-negotiables, pre-PR checklist, out-of-scope failure mode).
2. **CI gates** that block merge if they fail: existing `npm run lint` + `vercel build` in `preview.yml`, plus a new ESLint rule banning raw hex in `.jsx`/`.js`.
3. **Owner approval required on every PR**, enforced by branch protection on `main` (admins excluded so the Owner can override for solo maintenance).

## Considered options

- Content-only scope. Rejected — bottlenecks the Owner on every structural change a Site Editor might want.
- Content + brand tokens + new brochure pages. Rejected for being a half-measure; the cliff between "allowed" and "blocked" was arbitrary.
- Anything goes, no gates. Rejected — too much load on Owner review.
- Anything except `api/` and harness, plus gates (chosen).

## Consequences

- The Owner is the only line of defence for changes that pass lint+build but introduce regressions in brand consistency, mobile layout, or accessibility. Acceptable while review volume is low.
- If review load grows or drift is observed, add axe-core / Lighthouse / bundle-size gates — already noted as out of scope for v1.
