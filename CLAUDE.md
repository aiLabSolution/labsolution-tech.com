# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- **Production**: every push to `main` triggers `.github/workflows/production.yml` → `npm run lint` → `vercel build --prod` → `vercel deploy --prebuilt --prod`. Live URL: https://labsolution-tech.com.
- **Previews**: every pull request triggers `.github/workflows/preview.yml` → same chain → upserts a Vercel preview URL as a PR comment.
- `vercel.json` keeps Vercel's own Git auto-deploy off for `main` so the GitHub Action is the only production path. `.vercel/` is git-ignored.
- **Branch protection on `main`** (configured via `gh api`): require PR, require 1 approving review, require `Preview Deployment` status check, block force and direct pushes. Admins are NOT included so the Owner can override for solo maintenance.

## Working agreement

- **Atomic commits.** One logical change per commit. Do not bundle a refactor with a feature, a typo fix with a style change, or config edits with content edits. If the commit message needs "and" to describe it, split the commit. Messages describe *why*; the diff shows *what*.
- **Worktree for multi-commit work.** Any task expected to produce more than a single commit must run in a dedicated git worktree checked out from `main` (or a fresh branch created from `main`). Do not accumulate unrelated commits on `devops` or other long-lived branches. Create the worktree before starting, name the branch descriptively, and surface the branch name at handoff so the user can review/PR it.
