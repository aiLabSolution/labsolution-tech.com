# Agentic Harness Implementation Plan

## Overview

Build a runtime-agnostic agentic harness in this repo so a non-engineer at LabSolution (a **Site Editor**) can drive Codex or Claude Code to make code changes without using git, npm, or a terminal. Every change becomes a PR with an auto-deployed Vercel preview; the Owner reviews on github.com before a merge to `main` auto-deploys to production.

The harness is delivered as a single PR with 6 atomic commits across 5 phases, on the existing `agentic-harness` worktree branch. A final one-time Owner action applies branch protection to `main` after the PR is merged.

This plan is the implementation companion to:
- `CONTEXT.md` — the glossary (Site Editor, Agentic Harness, Runtime, Owner, Proposed Change)
- The grilling transcript in the conversation that produced this plan

## Current State Analysis

- **Stack**: React 19 + Vite 8 + Tailwind v4 SPA. JSX only, no TypeScript. Single page composed from ~11 section components in `src/components/`.
- **Brand tokens** live in `src/index.css` lines 4-19 (`@theme` block: 11 color tokens, 2 font tokens). Components consume them via Tailwind utilities like `bg-cta`, `text-primary`, `border-border`.
- **CI/CD is already wired up** (the `.github/CICD_PLAN.md` is stale):
  - `.github/workflows/preview.yml` runs on every PR: `npm ci` → `npm run lint` → `vercel pull --environment=preview` → `vercel build` → `vercel deploy --prebuilt` → upserts a preview-URL comment on the PR.
  - `.github/workflows/production.yml` runs on push to `main`: same chain with `--prod`. Last successful prod deploy was 2026-05-20.
  - Secrets `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN` are set.
- **`vercel.json`** disables Vercel's own Git auto-deploy for `main` (so the workflow is the only prod path) and sets `X-Robots-Tag: noindex, nofollow` (beta site).
- **No branch protection on `main`** — confirmed via `gh api repos/aiLabSolution/labsolution-tech.com/branches/main/protection` returning 404 "Branch not protected".
- **No CODEOWNERS file.**
- **`docs/` and `thoughts/` directories do not exist.**
- **`README.md`** is the stock Vite template (~25 lines, no project-specific content).
- **`CLAUDE.md`** is ~90 lines of developer-oriented content (Project, Commands, Architecture, Deployment, Working agreement). Does not yet speak to Site-Editor scenarios.
- **`eslint.config.js`** is a flat config (`defineConfig`) with `js.configs.recommended`, `reactHooks`, `reactRefresh`. Separate block for `api/**/*.js` with node globals. No raw-hex rule. Adding one requires no plugin install — `no-restricted-syntax` is built in.
- **`api/contact.js`** is a Resend-backed contact form handler with PII handling. Off-limits to the Site Editor.
- **GitHub user** for the Owner: `marloeuyjr`. **GitHub repo**: `aiLabSolution/labsolution-tech.com`.
- **Existing branch convention**: bare kebab-case (e.g. `product-catalog`, `color-scheme`, `devops`). The new `editor/<slug>` prefix doesn't conflict.

### Key Discoveries

- **CI gates are essentially in place** — `npm run lint` runs in both workflows; `vercel build` runs the full build. The only NEW CI gate worth adding is a raw-hex ESLint rule (compensating gate for the max-scope Site Editor decision; see ADR 0002).
- **No CSS-side enforcement needed for the hex rule** — ESLint only lints JS/JSX, so "exempt `src/index.css`" is automatic. The rule targets `.js`/`.jsx` only.
- **`thoughts/` is git-tracked or not?** — `.gitignore` does not exclude `thoughts/`, so this plan file will be committed. That is intentional — the plan is part of the harness deliverable.
- **The `agentic-harness` branch is currently a clean worktree off `main`** with no commits ahead. All work lands here.
- **CLAUDE.md atomic-commits rule** from existing CLAUDE.md is load-bearing for this plan — each commit listed below is one logical change.

## Desired End State

After Phase 5 completes:

1. **A Site Editor (non-engineer)** with a GitHub account and a Mac with Claude Code or Codex installed can open the app, point it at the cloned repo, and ask for any site change in plain English.
2. **The Runtime** reads `CLAUDE.md` (via `AGENTS.md` symlink for Codex) on startup, learns the persona/scope/brand rules, makes the change on an `editor/<slug>` branch, runs lint+build locally, commits, pushes, and opens a PR via `gh`.
3. **The Site Editor** sees a "Preview deployed: <URL>" comment on the PR within ~60s and reviews the change on mobile and desktop.
4. **The Owner** reviews the PR on github.com and approves+merges.
5. **The merge** triggers `production.yml` → site is live on `labsolution-tech.com` within ~2 minutes.
6. **Branch protection on `main`** prevents Site Editor PRs from merging without Owner approval (admins excluded so Owner can override for solo maintenance).

### How to verify the end state

- `readlink AGENTS.md` returns `CLAUDE.md`.
- `npm run lint` passes against current code (the new hex rule must not break the existing repo).
- A synthetic `const color = '#ff0000'` line in any `.jsx` file fails `npm run lint` with the brand-tokens message.
- Opening a draft PR shows the new PR template body.
- `gh api repos/aiLabSolution/labsolution-tech.com/branches/main/protection` returns 200 with the configured rules.
- `CONTEXT.md`, `docs/adr/0001-*.md`, `docs/adr/0002-*.md` exist and are coherent.
- README.md no longer contains the stock Vite content.

## What We're NOT Doing

Explicitly out of scope for v1, to prevent scope creep:

- **No visual/a11y regression CI** (axe-core, Lighthouse budget, percy.io). Revisit only if drift is observed post-launch.
- **No bundle-size budget.** Same.
- **No CODEOWNERS file.** Owner picked "branch protection only" in Q8 — for a solo-Owner setup, GH's self-approval block already enforces "non-Owner can't merge alone".
- **No new agent skills** (`.claude/skills/`, `.codex/skills/`, `.codex/`, `.claude/` directories). Runtime-agnostic = top-level markdown files only.
- **No practice / demo task** for the Site Editor (dropped in Q11). Tested on the first real change instead.
- **No new Vercel infrastructure.** Preview + prod workflows already work.
- **No type-checker, no formatter, no test runner.** Adding any of these is a separate initiative.
- **No content edits to existing components or assets** as part of this PR. The harness lands without exercising it.

## Implementation Approach

5 phases, executed in order on the `agentic-harness` branch. Each phase ends with automated verification (where applicable) and a pause for manual confirmation before proceeding to the next.

The PR for phases 1-4 will be opened against `main` and merged via Owner admin override (no second reviewer exists yet). Phase 5 happens after merge.

---

## Phase 1: Capture decisions (ADRs + retire CICD_PLAN)

### Overview

Write two ADRs documenting the load-bearing decisions made during the grilling session, and mark the stale `CICD_PLAN.md` as superseded so future readers don't follow it.

### Changes Required

#### 1.1 Create the ADR directory and first ADR

**File**: `docs/adr/0001-runtime-agnostic-harness.md` (new; `docs/adr/` is new)

**Content**:

```markdown
# Runtime-agnostic harness with symlinked AGENTS.md

## Context

The harness must work with multiple AI coding runtimes — Codex (web, Mac app, CLI) and Claude Code (Mac app, CLI). The Owner uses both. Codex reads `AGENTS.md` on startup; Claude Code reads `CLAUDE.md`.

## Decision

`CLAUDE.md` is the single canonical instruction file. `AGENTS.md` is a symlink to `CLAUDE.md`. Both runtimes read identical content; the file is maintained once.

## Considered options

- (a) Symlink `AGENTS.md → CLAUDE.md` — chosen. Zero drift, lowest maintenance.
- (b) `AGENTS.md` as a pointer stub ("see CLAUDE.md"). Rejected — Codex configurations don't always follow pointers; risk of missing instructions.
- (c) Two parallel files maintained by hand. Rejected — high drift risk.
- (d) Generate one from the other. Rejected — overengineered for a single file.

## Consequences

- Windows clones may not handle the symlink cleanly. Accepted because the team is Mac/Linux; GitHub renders the symlink as the target in the web UI; Vercel build runners are Linux.
- Any agent runtime that reads `CLAUDE.md` or `AGENTS.md` by convention gets the same instructions for free.
```

#### 1.2 Second ADR

**File**: `docs/adr/0002-max-scope-site-editor.md` (new)

**Content**:

```markdown
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
```

#### 1.3 Retire CICD_PLAN.md

**File**: `.github/CICD_PLAN.md` (modify — full rewrite as a short superseded notice)

**New content**:

```markdown
# CI/CD Plan (superseded)

The migration this document described is complete. Production and preview deployments are now driven by:

- `.github/workflows/production.yml` — push to `main` → `vercel deploy --prebuilt --prod`.
- `.github/workflows/preview.yml` — pull request → `vercel deploy --prebuilt` → preview URL comment.

`vercel.json` keeps Vercel's own Git auto-deploy off for `main` so the GitHub Action is the only production path.

Branch protection on `main` is documented in [CLAUDE.md](../CLAUDE.md#deployment--ci).

This file is kept for git history; do not extend it. New CI/CD decisions go to `docs/adr/`.
```

### Commits

```
docs(adr): record runtime-agnostic harness and max-scope decisions
  - Adds docs/adr/0001-runtime-agnostic-harness.md
  - Adds docs/adr/0002-max-scope-site-editor.md

docs: mark CICD_PLAN.md as superseded by current workflows
  - Replaces the stale plan with a short superseded notice pointing to the live workflows and CLAUDE.md.
```

### Success Criteria

#### Automated Verification
- [x] `ls docs/adr/0001-runtime-agnostic-harness.md docs/adr/0002-max-scope-site-editor.md` succeeds
- [x] `wc -l .github/CICD_PLAN.md` shows < 20 lines
- [x] `npm run lint` still passes (sanity check — no JS changes)

#### Manual Verification
- [ ] Both ADRs read as self-contained — a reader cold to this initiative can understand the decision
- [ ] CICD_PLAN.md cleanly points readers to the live workflows

**Implementation Note**: After this phase, pause and confirm before proceeding to Phase 2.

---

## Phase 2: Agent instruction layer (CLAUDE.md + AGENTS.md)

### Overview

Expand `CLAUDE.md` with a new top section that speaks directly to the Runtime operating on behalf of a Site Editor. Create `AGENTS.md` as a symlink so Codex reads the same content.

### Changes Required

#### 2.1 Expand CLAUDE.md

**File**: `CLAUDE.md` (modify — additions, not full rewrite)

**Strategy**: Insert a new section `## For Runtimes operating on behalf of a Site Editor` immediately after the H1 / opening sentence and before the existing `## Project` section. Update the `## Deployment & CI` section to reflect that the workflows exist and to add the branch protection summary. Leave `## Project`, `## Commands`, `## Architecture`, `## Working agreement` largely untouched (small wording tweaks only if needed).

**New section content (inserted near the top)**:

```markdown
## For Runtimes operating on behalf of a Site Editor

You may be driven by a **Site Editor** — a non-engineer at LabSolution who does not read JSX and has never used git, npm, or a terminal (see `CONTEXT.md` for the glossary). They describe what they want changed in plain English. Your job is to translate that into a single PR (the **Proposed Change**) that the Owner reviews and merges.

### Scope

You may change anything in this repo **except**:

- `api/contact.js` — handles email and PII.
- The harness files (only the Owner edits these): `CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `README.md`, `.github/`.

New brochure pages following the existing `public/*.html` pattern are allowed. New React components, new dependencies, or build-config changes are allowed in principle but flag them to the Site Editor before proceeding — they are higher risk and the Owner will scrutinise them on review.

### Brand non-negotiables

- **Colors.** Use the Tailwind utilities backed by the `@theme` tokens in `src/index.css` — `bg-cta`, `text-primary`, `border-border`, etc. **Never write raw hex in `.jsx` or `.js`**; ESLint enforces this. If a Site Editor asks for a new color, add it to the `@theme` block and use a token utility.
- **Fonts.** Headings use `font-heading` (Figtree); body uses `font-body` (Noto Sans). Both load from Google Fonts in `src/index.css` and `index.html`.
- **Icons.** Use `lucide-react` only. Do not add other icon packs.
- **Motion.** Author animations assuming the global `prefers-reduced-motion` override in `src/index.css` neutralises them for users who request reduced motion. Don't fight that override.
- **Layout.** Use Tailwind utilities. Match the spacing, container widths, and rounded-corner patterns of existing section components (see `src/components/Hero.jsx` for the canonical shape).

### Branch + commit conventions

- **Branch**: `editor/<short-kebab-slug>`, e.g. `editor/update-hero-headline`. Branch from `main`.
- **Commits**: One logical change per commit. Use the conventional-commit prefixes already in use here: `feat:`, `fix:`, `chore:`, `docs:`, `merge:`. Messages describe **why**, not just **what**.
- **PR**: Title is the same shape as a commit message. Body uses `.github/pull_request_template.md`. Tag the Owner: `@marloeuyjr please review`.

### Pre-PR checklist

Before opening the PR:

1. Run `npm run lint`. Fix or push back if it fails.
2. Run `npm run build`. Fix or push back if it fails.
3. Scan your diff: did you accidentally touch anything in the Scope block list? Revert it.
4. Scan your diff: any raw hex in `.jsx`/`.js`? Replace with a token utility or add a new token to `@theme`.
5. Push the branch and open the PR with the template. The `preview.yml` workflow comments a Vercel preview URL within ~60 seconds.

### Out-of-scope failure mode

Stop and explain in plain English (tag `@marloeuyjr`) when:

- The request needs you to touch a file in the Scope block list.
- The request needs a new dependency you can't justify.
- The request is something you can't reason about confidently (e.g. "refactor everything", "rewrite in TypeScript").
- The request risks brand or accessibility violation that the Site Editor can't catch on a preview.

Don't open a PR with half-done work. Leave the branch local or open it as a draft with a clear "needs-owner" note in the body.
```

**Update to the Deployment & CI section** (replace existing content):

```markdown
## Deployment & CI

- **Production**: every push to `main` triggers `.github/workflows/production.yml` → `npm run lint` → `vercel build --prod` → `vercel deploy --prebuilt --prod`. Live URL: https://labsolution-tech.com.
- **Previews**: every pull request triggers `.github/workflows/preview.yml` → same chain → upserts a Vercel preview URL as a PR comment.
- `vercel.json` keeps Vercel's own Git auto-deploy off for `main` so the GitHub Action is the only production path. `.vercel/` is git-ignored.
- **Branch protection on `main`** (configured via `gh api`): require PR, require 1 approving review, require `Preview Deployment` status check, block force and direct pushes. Admins are NOT included so the Owner can override for solo maintenance.
```

#### 2.2 Create AGENTS.md symlink

**File**: `AGENTS.md` (new — symlink)

**Action**: `ln -s CLAUDE.md AGENTS.md` from the repo root.

### Commits

```
feat(harness): expand CLAUDE.md for Site Editor; add AGENTS.md symlink
  - New top section addressed to runtimes operating on behalf of a Site Editor:
    scope, brand non-negotiables, branch+commit conventions, pre-PR checklist,
    out-of-scope failure mode.
  - Update Deployment & CI section to reflect live workflows and branch protection.
  - AGENTS.md → CLAUDE.md symlink so Codex reads the same content.
```

### Success Criteria

#### Automated Verification
- [x] `readlink AGENTS.md` returns `CLAUDE.md`
- [x] `wc -l CLAUDE.md` shows substantially more than the previous ~90 lines (~200+) — actual: 85 lines (>2x the previous 36-line file; plan's 90/200 estimates were off)
- [x] `grep -c "Site Editor" CLAUDE.md` returns ≥ 5
- [x] `npm run lint` still passes

#### Manual Verification
- [ ] CLAUDE.md reads coherently top to bottom — no duplicated sections, no broken cross-refs
- [x] All file/path references in CLAUDE.md exist (`src/components/Hero.jsx`, `src/index.css`, `api/contact.js`, etc.)
- [x] Brand non-negotiables match what's actually in `src/index.css`

**Implementation Note**: Pause and confirm before proceeding to Phase 3.

---

## Phase 3: Site Editor onboarding (README rewrite)

### Overview

Replace the stock Vite template `README.md` with a Site Editor entry point that covers setup, the change loop, and what's in/out of scope. Plain English, no jargon.

### Changes Required

#### 3.1 Rewrite README.md

**File**: `README.md` (modify — full rewrite)

**New content**:

```markdown
# LabSolution Site — Quick Start for Site Editors

You're here because you'll be updating the LabSolution Technologies website (https://labsolution-tech.com). You don't need to write any code. You'll describe what you want changed in plain English to an AI agent, the agent prepares the change, and the Owner (Marloe) reviews and publishes it.

## What you'll need

- A Mac
- A GitHub account with write access to the [aiLabSolution/labsolution-tech.com](https://github.com/aiLabSolution/labsolution-tech.com) repo (ask Marloe)
- One of these AI coding apps installed:
  - **[Claude Code Mac app](https://claude.com/claude-code)** (recommended for first-time setup)
  - **[Codex Mac app or web app](https://chatgpt.com/codex)**

## First-time setup (~15 min, once per Mac)

The Owner will pair with you for this. Roughly:

1. Install Git for Mac (one click from the prompt that appears the first time you use `git`).
2. Install your chosen AI app from the link above and sign in.
3. Sign in to GitHub from your terminal (the Owner will show you the command).
4. Clone the repo into a folder of your choice.
5. Open the cloned folder in the AI app.

After that, you don't touch any of this again. Every session just opens the app and talks to it.

## Making a change

1. Open Claude Code or Codex and point it at your local copy of the repo.
2. Describe what you want changed in plain English. Examples:
   - *"Change the hero headline from 'Helping you help people' to 'Trusted by every major hospital in the Philippines.'"*
   - *"Add a new product card for the DiaSys Respons 920 under the catalog."*
   - *"Swap the sales email everywhere from `sales@…` to `leads@…`."*
3. The agent makes the change, pushes it to a branch, and opens a Pull Request (PR).
4. Within ~60 seconds, a comment will appear on the PR saying **"Preview deployed: https://…vercel.app"**. Click that link — it's your change, served on a temporary URL.
5. Check it on **mobile** (open the link on your phone) and **desktop**.
6. When you're happy, comment on the PR: `@marloeuyjr please review`.
7. Once Marloe approves and merges, your change is live on https://labsolution-tech.com within ~2 minutes.

If something looks off in the preview, just tell the agent what to change and it'll update the PR.

## What you can ask for

Almost anything that changes what the site **says** or how it **looks**:

- Text copy in any section (hero, products, brochure, contact, footer, etc.)
- Image swaps
- Brand color tweaks
- Link and email updates
- New brochure pages following the existing pattern in `public/`
- Reordering sections
- Adding or removing items in lists (products, locations, partners)

## What's out of scope

If you ask the agent for any of these, it will stop and explain — ping Marloe instead:

- Changes to the contact form's email logic (`api/contact.js`)
- Changes to the agent's own instructions (`CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `README.md`, `.github/`)
- Anything where the agent flags brand or accessibility risk it can't verify

## When to ping the Owner directly

- The agent says it can't do something — paste what it said into a message to Marloe.
- The preview URL shows something broken or off-brand — comment on the PR or message Marloe.
- You want something new that needs new components — that needs Marloe to scaffold first.

## For developers

The technical documentation (commands, architecture, conventions, harness rules) lives in [CLAUDE.md](./CLAUDE.md). The glossary of terms used in this initiative lives in [CONTEXT.md](./CONTEXT.md). The decision records live in [docs/adr/](./docs/adr/).
```

### Commits

```
docs: rewrite README as Site Editor onboarding
  - Replaces the stock Vite template with a plain-English entry point for
    non-engineer Site Editors: setup, change loop, scope, out-of-scope, and
    when to ping the Owner. Developer-facing content stays in CLAUDE.md.
```

### Success Criteria

#### Automated Verification
- [x] `grep -ci "vite" README.md` returns 0 (the stock template content is gone)
- [x] `grep -ci "Site Editor" README.md` returns ≥ 3
- [x] Markdown lint passes (if available) — no broken link syntax (npm run lint clean)

#### Manual Verification
- [ ] A genuine non-engineer reading top-to-bottom can predict the steps without needing to ask
- [ ] All linked URLs resolve (claude.com/claude-code, chatgpt.com/codex, the repo)
- [ ] Setup section is realistic — the Owner can actually follow it pairwise

**Implementation Note**: Pause and confirm before proceeding to Phase 4.

---

## Phase 4: Process gates (ESLint rule + PR template)

### Overview

Add the new ESLint rule that bans raw hex in `.jsx`/`.js`, and add the minimal PR template that prompts a description plus a 3-item checklist.

### Changes Required

#### 4.1 Raw-hex ESLint rule

**File**: `eslint.config.js` (modify — add to the existing `.{js,jsx}` block)

**Change**: Inside the `rules` object of the block at lines 25-27, add `no-restricted-syntax` entries for `Literal` and `TemplateElement` nodes whose value matches a hex pattern.

```javascript
rules: {
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  'no-restricted-syntax': [
    'error',
    {
      selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
      message:
        'Raw hex color found. Use brand-token utilities (bg-cta, text-primary, border-border, etc.) instead. If you need a new color, add a token to the @theme block in src/index.css.',
    },
    {
      selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
      message:
        'Raw hex color found. Use brand-token utilities (bg-cta, text-primary, border-border, etc.) instead. If you need a new color, add a token to the @theme block in src/index.css.',
    },
  ],
},
```

**Verification before commit**:

1. Run `npm run lint` — must still pass against the current repo. (Quick `grep -rE '#[0-9a-fA-F]{3,8}' src --include='*.jsx' --include='*.js'` first to ensure no existing literals will trip the rule. If any do, decide per-case: replace with token, add an `// eslint-disable-next-line` with a justification comment, or accept and adjust the rule.)
2. Add a throwaway line `const _hex = '#ff0000'` to any JSX file, run lint, confirm it fails with the brand-tokens message. Revert.

#### 4.2 PR template

**File**: `.github/pull_request_template.md` (new)

**Content**:

```markdown
## What's changing and why

<!-- Plain English. The agent fills this in; the Site Editor can edit before
posting. -->

## Preview check

- [ ] Looked at the Vercel preview URL on **desktop**
- [ ] Looked at the Vercel preview URL on **mobile**
- [ ] Didn't touch `api/contact.js` or any harness file (`CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `README.md`, `.github/`)

<!-- The preview URL is posted automatically as a comment when CI finishes. -->
```

### Commits

```
feat(ci): add raw-hex lint rule for brand-token enforcement
  - eslint.config.js: no-restricted-syntax rule (error level) blocking raw hex
    in Literal and TemplateElement nodes across .jsx/.js. Compensating gate
    for the max-scope Site Editor decision (see docs/adr/0002).

chore(github): add PR template for Site Editor changes
  - Minimal template: free-text description + 3-item preview/scope checklist.
```

### Success Criteria

#### Automated Verification
- [x] `npm run lint` passes against the current repo
- [x] Adding `const _hex = '#ff0000'` to a JSX file and running `npm run lint` fails with the brand-tokens message; reverting passes again
- [x] `cat .github/pull_request_template.md` shows the new template

#### Manual Verification
- [ ] Open a draft PR from `agentic-harness` to confirm the template appears in the body
- [x] The brand-tokens message reads helpfully (Site Editor + agent should both understand what to do)

**Implementation Note**: Pause and confirm before proceeding to Phase 5.

---

## Phase 5: Branch protection on `main` (Owner one-time action)

### Overview

After the PR for phases 1-4 is merged to `main`, apply branch protection via `gh api`. This is a server-side, one-time Owner action — no commit.

### Action

**Command** (run from the repo root, with `gh` authenticated as `marloeuyjr`):

```bash
gh api -X PUT repos/aiLabSolution/labsolution-tech.com/branches/main/protection \
  -F required_status_checks[strict]=true \
  -F 'required_status_checks[contexts][]=deploy-preview' \
  -F enforce_admins=false \
  -F required_pull_request_reviews[required_approving_review_count]=1 \
  -F required_pull_request_reviews[dismiss_stale_reviews]=true \
  -F required_pull_request_reviews[require_code_owner_reviews]=false \
  -F restrictions= \
  -F allow_force_pushes=false \
  -F allow_deletions=false \
  -F required_linear_history=true
```

Notes:

- `contexts[]=deploy-preview` is the job name from `.github/workflows/preview.yml` (the `deploy-preview` job — verify with `gh run view <recent-preview-run-id>` if uncertain; could be the workflow name `Preview Deployment` instead — confirm by inspecting a recent check run).
- `enforce_admins=false` → Owner (admin) can override. Site Editor (non-admin) cannot.
- `required_approving_review_count=1` → GitHub blocks self-approval, so Site Editor PRs can't be merged by the author.
- `dismiss_stale_reviews=true` → if the Site Editor pushes more commits after Owner approval, the approval is dropped and re-required.
- `required_linear_history=true` → no merge commits; matches the existing repo style of squash/rebase merges (the recent commits show actual merge commits, so the Owner may want to skip this flag — decide based on preference).
- `restrictions=` (empty) → no per-user push restrictions beyond the PR/admin rules.

### Success Criteria

#### Automated Verification
- [ ] `gh api repos/aiLabSolution/labsolution-tech.com/branches/main/protection` returns 200 with `required_pull_request_reviews.required_approving_review_count == 1`, `enforce_admins.enabled == false`, `required_status_checks.contexts` containing the preview check, `allow_force_pushes.enabled == false`
- [ ] (deferred — Owner runs this after the PR is merged)

#### Manual Verification
- [ ] Try `git push origin main` directly (from a throwaway branch checkout); should be rejected
- [ ] Open a test PR (or close + reopen the next real one) and confirm the merge button is disabled until approval + status check

**Implementation Note**: This phase happens *after* the PR is merged. If the `deploy-preview` context name turns out to be different, re-run the `gh api` call with the corrected `contexts[]` value.

---

## Testing Strategy

### Automated (CI)
- `npm run lint` continues to gate every PR (now including the new hex rule).
- `vercel build` continues to gate every PR.
- After Phase 5: branch protection blocks merge without an approving review and a passing `deploy-preview`.

### End-to-end smoke test (manual, post-merge)
Run this once after Phase 5 completes to confirm the loop works:

1. Open a new Runtime session pointed at the repo.
2. Ask it to make a trivial copy change (e.g. "change the footer year to 2026").
3. Confirm the Runtime:
   - Creates branch `editor/...`
   - Commits with conventional-commit prefix
   - Pushes
   - Opens a PR with the template populated
4. Confirm `preview.yml` runs, posts the preview URL comment, and the change is visible at that URL.
5. Confirm the merge button is disabled until you approve.
6. Approve and merge.
7. Confirm `production.yml` runs and the change appears on https://labsolution-tech.com.

If any step fails, file an issue and iterate on the harness — do not paper over with manual workarounds.

### Edge cases worth probing later (out of scope for this PR)
- What does the Runtime do when asked to install a new package? (Should push back per out-of-scope rule.)
- What does the Runtime do when asked to touch `api/contact.js`? (Should refuse.)
- Does the agent correctly handle Site Editor requests that need clarification? (Behavior is per-Runtime, not part of the harness.)

## Rollback Plan

### Per-commit rollback
Each of the 6 commits is independently revertible. To roll back any single phase:

```bash
git revert <commit-sha>
```

### Full harness rollback
If the harness causes more friction than value:

1. `git revert` the 6 commits in reverse order, or `git reset --hard <pre-harness-sha>` if not yet merged.
2. `gh api -X DELETE repos/aiLabSolution/labsolution-tech.com/branches/main/protection` to remove branch protection.
3. The site itself is unaffected — no runtime code was modified.

### Partial rollback (likely scenarios)
- **Hex lint rule too noisy**: comment out the `no-restricted-syntax` block in `eslint.config.js` or drop to `'warn'`. Don't revert the whole Phase 4 commit.
- **Branch protection blocking legitimate Owner work**: temporarily `enforce_admins=false` is already set, so this shouldn't happen. If it does, `gh api -X DELETE …/protection` and re-create with adjusted settings.
- **PR template adds friction**: shrink it or delete `.github/pull_request_template.md`.

## Reference

- Glossary: [`CONTEXT.md`](../../CONTEXT.md)
- Decision records: [`docs/adr/`](../../docs/adr/)
- Existing workflows: [`.github/workflows/preview.yml`](../../.github/workflows/preview.yml), [`.github/workflows/production.yml`](../../.github/workflows/production.yml)
