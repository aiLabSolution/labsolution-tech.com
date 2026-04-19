# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for LabSolution Technologies, Inc. — a Philippines-based healthcare/diagnostics distributor. Single-page React app deployed to Vercel as the production site at `labsolution-tech.com` (team `ai-labsolution`, project already linked via `.vercel/project.json`).

## Commands

- `npm run dev` — Vite dev server with HMR.
- `npm run build` — production build → `dist/`.
- `npm run lint` — ESLint flat config; this is the only automated gate.
- `npm run preview` — serve the built bundle locally.
- `vercel` — ad-hoc preview deploy from the CLI. Avoid `vercel --prod` locally; production deploys go through the GitHub Action so the lint gate runs.

No test runner, no type-check, no formatter script exist. Do not add them unless asked.

## Architecture

- **Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`). JSX only, no TypeScript. `lucide-react` is the only icon library.
- **Composition:** `src/App.jsx` is the entire page. It renders section components in order: `Navbar → Hero → Products → ProductBrochure → Features → About → Locations → Contact → Footer`. Navigation is anchor-based — each section owns its own `id` (`#products`, `#brochure`, `#about`, `#locations`, `#contact`) and the `navLinks` array in `src/components/Navbar.jsx` is the authoritative link list. When adding or renaming a section, update both the component's `id` and `navLinks`.
- **Design tokens:** Tailwind v4 `@theme` block in `src/index.css` defines the semantic palette (`--color-primary`, `--color-secondary`, `--color-cta`, `--color-cta-hover`, `--color-accent`, `--color-accent-hover`, `--color-accent-soft`, `--color-surface`, `--color-surface-alt`, `--color-warm`, `--color-border`) and fonts (`--font-heading: Figtree`, `--font-body: Noto Sans`). Components consume these via utilities like `bg-cta`, `text-primary`, `border-border`. Prefer these tokens over raw hex or Tailwind defaults so the site stays on-brand.
- **Reduced motion:** `index.css` contains a global `prefers-reduced-motion` override that neutralizes animations and transitions. Author new motion assuming that override exists.
- **Static brochure pages:** `public/packaging-system.html` and `public/sticker.html` are standalone HTML documents served directly by Vercel, outside the React bundle. Keep them in `public/`; do not import them from React.

## Deployment & CI

- `main` is the production branch. `.vercel/` is git-ignored (project linkage only).
- Production deploys run from `.github/workflows/production.yml` on push to `main`: `npm ci` → `npm run lint` → `vercel pull/build/deploy --prod` using `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` repo secrets (already set).
- PR previews run from `.github/workflows/preview.yml` on `pull_request`: same lint gate, then a non-prod `vercel deploy` whose URL is upserted as a single comment on the PR. A per-PR concurrency group cancels superseded runs.
- `vercel.json` sets `git.deploymentEnabled.main = false` so Vercel's Git integration does not produce a duplicate prod deploy. Leave `main` disabled; if you ever add another branch, decide whether the Action also needs to handle it.
- Both workflows declare `permissions:` explicitly, which restricts `GITHUB_TOKEN` to the listed scopes — everything else becomes `none`. `actions/checkout` needs `contents: read`; don't strip it (previous bug: preview workflow's checkout failed with "Repository not found" because only `pull-requests: write` was declared).
- `.github/CICD_PLAN.md` is the historical migration plan. Step 7 (branch protection) is deferred: the repo is private on a free-plan org, and GitHub gates branch protection / rulesets behind a paid plan in that combo. Until that changes, protection is enforced only by convention (see Working agreement).

## Working agreement

- **Atomic commits.** One logical change per commit. Do not bundle a refactor with a feature, a typo fix with a style change, or config edits with content edits. If the commit message needs "and" to describe it, split the commit. Messages describe *why*; the diff shows *what*.
- **Worktree for multi-commit work.** Any task expected to produce more than a single commit must run in a dedicated git worktree checked out from `main` (or a fresh branch created from `main`). Do not accumulate unrelated commits on `devops` or other long-lived branches. Create the worktree before starting, name the branch descriptively, and surface the branch name at handoff so the user can review/PR it.
