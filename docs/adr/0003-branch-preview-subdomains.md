# ADR 0003 — Branch preview subdomains under `*.labsolution-tech.com`

## Status

Accepted. 2026-05-23. Authored by Marloe Uy.

## Context

Before this change the site had two preview systems racing each other:

1. `.github/workflows/preview.yml`, triggered on pull-request events, ran lint + `vercel build` + `vercel deploy --prebuilt` and commented a `*.vercel.app` URL on the PR.
2. Vercel's own Git integration auto-deployed the same branch and assigned `labsolution-techcom-git-<branch>-ai-labsolution.vercel.app`.

Both URLs lived under `vercel.app` and inherited the team-level Vercel Authentication gate — Site Editors and external collaborators had to be logged into a Vercel account on the right team to even view the preview. That gate was the single biggest friction point for the agentic-harness workflow (`docs/adr/0002-max-scope-site-editor.md`).

The blocker to making previews publicly accessible was safety. Two latent properties had to be established first:

- **No real email from previews.** `api/contact.js` reads `RESEND_API_KEY` from the preview environment and would send to the sales inbox on every form submission. A public preview meant anyone could spam the inbox.
- **No SEO leak.** Without `noindex`, every branch deploy would be a public, crawlable copy of the site, polluting search results and competing with production.

PR 1 (`chore/vercel-cicd`, merged 2026-05-23) landed both: the contact form short-circuits on non-production `VERCEL_ENV`, and a Vite build plugin injects the noindex meta tag and overwrites `dist/robots.txt` with `Disallow: /` whenever `VERCEL_ENV === 'preview'`. With those in place, public previews became acceptable.

The DNS zone already had `* ALIAS cname.vercel-dns-016.com.`, so `<anything>.labsolution-tech.com` already routed to Vercel's edge — no new DNS work was required.

## Decision

One deploy path, custom-domain previews:

- **`vercel.json`** sets `"git": { "deploymentEnabled": false }` — Vercel's Git integration no longer creates parallel deploys on any branch. The GitHub Actions workflows are the sole deploy mechanism for both `main` and non-`main` branches.
- **`.github/workflows/preview.yml`** triggers on `push: branches-ignore: [main]` (not just PR events), so every branch push gets a preview regardless of whether a PR is open. It slugifies `github.ref_name` (lowercase, non-alphanumerics → `-`, truncated to 50 chars), runs `vercel deploy --prebuilt`, then `vercel alias set <deployment-url> <slug>.labsolution-tech.com`. If a PR is open for the branch, the workflow upserts a comment with the subdomain; if not, the deployment is reachable anyway via the predictable URL.
- **Reserved slugs:** `www` and `main` are explicitly rejected at slug-validation time. `www` would collide with the production canonical; `main` would conflict with the production branch and confuse cleanup.
- **`.github/workflows/preview-cleanup.yml`** runs on `pull_request: closed` (only when `merged == true`) or `delete: ref_type == 'branch'`, recomputes the slug with the same rules, and calls `vercel alias rm <slug>.labsolution-tech.com --yes`. Reserved slugs and empty slugs are skipped (safety net against a hypothetical branch named `www`).
- **Vercel Authentication is disabled at the project level** so previews under `*.labsolution-tech.com` resolve without an SSO challenge. The two safety properties from PR 1 hold the line in place of the gate.
- **The `*.labsolution-tech.com` wildcard domain is attached to the project** so any `<anything>.labsolution-tech.com` an alias creates becomes immediately accessible.
- **Pinned Vercel CLI** at `54.3.0` in both workflows so an upstream CLI change can't silently break a deploy.

## Consequences

- Every push to a non-`main` branch produces `https://<slug>.labsolution-tech.com`, publicly accessible to anyone with the link. Site Editors no longer need a Vercel account to review their PR.
- The `api/contact.js` short-circuit is a **load-bearing safety property**. Removing it would expose the sales inbox to public preview traffic. Flagged in `CLAUDE.md` as Owner-only.
- The noindex meta tag and `Disallow: /` robots.txt on previews keep `<slug>.labsolution-tech.com` URLs out of search engines while leaving production fully crawlable.
- **Slug collisions are last-write-wins.** Two branches that slugify to the same name share one preview URL; whichever pushed last wins. No collision detection is built in — documented and acceptable for a team of one Owner plus a Site Editor.
- **Cleanup is best-effort.** `vercel alias rm` is idempotent on already-gone aliases, but a branch that's abandoned without merging or being deleted will leave its subdomain pointing at a stale deployment. We don't garbage-collect on a timer. Stakeholders can release a stale alias manually with `vercel alias rm <slug>.labsolution-tech.com --yes`.
- **Cancelling a deploy mid-flight is fine.** The preview workflow's `concurrency` group is `preview-${github.ref}` with `cancel-in-progress: true`, so a fresh push on the same branch cancels the older run. Production has the inverse: serialized queue, `cancel-in-progress: false`.
- The legacy `beta.labsolution-tech.com` and `beta2.labsolution-tech.com` aliases were released as part of platform setup. Nothing external references them.
- The `Preview Deployment` workflow `name:` is unchanged so the existing branch-protection required-status check on `main` keeps matching.

Superseded: `.github/CICD_PLAN.md` (which described the prior PR-triggered preview model).

## Rollback

In order of decreasing severity:

1. Revert the PR that landed this ADR + workflow set; Vercel's Git integration resumes; previews return to `*.vercel.app`.
2. Re-enable Vercel Authentication via the dashboard or `PATCH /v9/projects/...` with `{ "ssoProtection": { "deploymentType": "preview" } }`.
3. Remove the wildcard with `vercel domains rm "*.labsolution-tech.com"`.
4. Re-create `beta.` / `beta2.` aliases if any external link surfaced that depended on them.

Total rollback time: ~10 minutes.
