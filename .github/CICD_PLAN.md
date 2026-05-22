# CI/CD Plan (superseded)

The migration this document described is complete. Production and preview deployments are now driven by:

- `.github/workflows/production.yml` — push to `main` → `vercel deploy --prebuilt --prod`.
- `.github/workflows/preview.yml` — pull request → `vercel deploy --prebuilt` → preview URL comment.

`vercel.json` keeps Vercel's own Git auto-deploy off for `main` so the GitHub Action is the only production path.

Branch protection on `main` is documented in [CLAUDE.md](../CLAUDE.md#deployment--ci).

This file is kept for git history; do not extend it. New CI/CD decisions go to `docs/adr/`.
