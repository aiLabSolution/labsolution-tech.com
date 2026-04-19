# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for LabSolution Technologies, Inc. — a Philippines-based healthcare/diagnostics distributor. Single-page React app deployed to Vercel as the production site at `labsolution-tech.com` (team `ai-labsolution`, project already linked via `.vercel/project.json`).

## Commands

- `npm run dev` — Vite dev server with HMR.
- `npm run build` — production build → `dist/`.
- `npm run lint` — ESLint flat config; this is the only automated gate.
- `npm run preview` — serve the built bundle locally.
- `vercel` / `vercel --prod` — ad-hoc preview or production deploy from the CLI.

No test runner, no type-check, no formatter script exist. Do not add them unless asked.

## Architecture

- **Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`). JSX only, no TypeScript. `lucide-react` is the only icon library.
- **Composition:** `src/App.jsx` is the entire page. It renders section components in order: `Navbar → Hero → Products → ProductBrochure → Features → About → Locations → Contact → Footer`. Navigation is anchor-based — each section owns its own `id` (`#products`, `#brochure`, `#about`, `#locations`, `#contact`) and the `navLinks` array in `src/components/Navbar.jsx` is the authoritative link list. When adding or renaming a section, update both the component's `id` and `navLinks`.
- **Design tokens:** Tailwind v4 `@theme` block in `src/index.css` defines the semantic palette (`--color-primary`, `--color-secondary`, `--color-cta`, `--color-cta-hover`, `--color-accent`, `--color-accent-hover`, `--color-accent-soft`, `--color-surface`, `--color-surface-alt`, `--color-warm`, `--color-border`) and fonts (`--font-heading: Figtree`, `--font-body: Noto Sans`). Components consume these via utilities like `bg-cta`, `text-primary`, `border-border`. Prefer these tokens over raw hex or Tailwind defaults so the site stays on-brand.
- **Reduced motion:** `index.css` contains a global `prefers-reduced-motion` override that neutralizes animations and transitions. Author new motion assuming that override exists.
- **Static brochure pages:** `public/packaging-system.html` and `public/sticker.html` are standalone HTML documents served directly by Vercel, outside the React bundle. Keep them in `public/`; do not import them from React.

## Deployment & CI

- `main` is the production branch. `.vercel/` is git-ignored (project linkage only).
- `.github/CICD_PLAN.md` is the source of truth for the planned migration from Vercel Git auto-deploy to a GitHub Actions workflow (`vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`). Read it before changing CI, adding `vercel.json`, or wiring secrets — several pieces (token minting, secret upload, the `deploymentEnabled` toggle) are pending and the plan tracks which.

## Working agreement

- **Atomic commits.** One logical change per commit. Do not bundle a refactor with a feature, a typo fix with a style change, or config edits with content edits. If the commit message needs "and" to describe it, split the commit. Messages describe *why*; the diff shows *what*.
- **Worktree for multi-commit work.** Any task expected to produce more than a single commit must run in a dedicated git worktree checked out from `main` (or a fresh branch created from `main`). Do not accumulate unrelated commits on `devops` or other long-lived branches. Create the worktree before starting, name the branch descriptively, and surface the branch name at handoff so the user can review/PR it.
