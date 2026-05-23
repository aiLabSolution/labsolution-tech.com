# Branch Preview Subdomains + CI/CD Hygiene Implementation Plan

## Overview

Replace today's auth-gated `*.vercel.app` preview URLs with publicly-accessible per-branch subdomains under `*.labsolution-tech.com`. Every branch except `main` gets a stable URL like `<branch-slug>.labsolution-tech.com`, no Vercel login required. Subdomains release automatically when the branch merges to `main` or is deleted. Bundle with CI/CD hygiene: pin Vercel CLI version, add a `concurrency` group + timeout + least-privilege permissions + body-grep health check to production.

The work ships in **two PRs**:

1. **PR 1 — Safety + production hygiene** (on `chore/vercel-cicd`). Land the safety primitives (contact-form short-circuit, env-aware noindex, production robots.txt) and the production workflow hygiene before previews go public.
2. **PR 2 — Preview subdomain switchover** (on a fresh branch from updated `main`). Flip the preview deploy path to GitHub Actions only, alias to subdomain, add the cleanup workflow, write the ADR and doc updates.

Manual platform setup (disable Vercel Authentication, add wildcard, release legacy aliases) happens between PR 1 and PR 2.

## Current State Analysis

**Deploys today:**

- **Production**: push to `main` → `.github/workflows/production.yml` runs lint → `vercel build --prod` → `vercel deploy --prebuilt --prod`. Vercel's own git auto-deploy for `main` is disabled in `vercel.json` so the workflow is the sole production path.
- **Previews — two systems racing each other:**
  1. `.github/workflows/preview.yml` triggers on PR open/sync/reopen, deploys, comments on the PR with a `*.vercel.app` URL.
  2. **Vercel's own git auto-deploy** is still enabled for non-`main` branches and creates a parallel deployment + an alias at `labsolution-techcom-git-<branch>-ai-labsolution.vercel.app`.
  - Both URLs land under `vercel.app` and inherit the team-level "Vercel Authentication" gate — the login wall to remove.

**Aliases on `*.labsolution-tech.com`:**
- `www.labsolution-tech.com` → production (keep).
- `beta.labsolution-tech.com` and `beta2.labsolution-tech.com` → legacy experimental (release).

**DNS:** `labsolution-tech.com` is on Vercel nameservers. The zone has `* ALIAS cname.vercel-dns-016.com.`, so any `<x>.labsolution-tech.com` already routes to Vercel's edge.

**Safety posture today (before this plan):**
- `public/robots.txt` contains `Disallow: /` → production isn't indexable.
- `api/contact.js` reads `RESEND_API_KEY` and sends to `sales.labsolutiontechnologies@gmail.com` unconditionally. Vercel's `Preview` environment already has `RESEND_API_KEY` set, so the moment a preview is public, anyone can spam the sales inbox via the contact form.
- `vercel.json` no longer carries `X-Robots-Tag: noindex, nofollow` (removed in `3644c95` on `chore/vercel-cicd`).

**CI/CD gaps:**
- Both workflows install `vercel@latest` per run (silent breakage risk).
- `production.yml`: no `concurrency`, no `timeout-minutes`, no explicit `permissions:`, no post-deploy health check.
- `preview.yml`'s `concurrency` group is keyed on the PR number — won't apply if the trigger moves to `push`.

**Repo settings:**
- `delete_branch_on_merge: false` (verified via `gh api`). Branches survive merge unless manually deleted.
- Branch protection on `main` requires the `Preview Deployment` status check — derived from the workflow `name:` field; keep that exact.

### Key Discoveries

- **Custom domains do not inherit the team-level Vercel Authentication gate.** Verified by `curl -sI https://beta2.labsolution-tech.com` → `HTTP/2 200` while the matching `.vercel.app` URL returns `HTTP/2 401` with `_vercel_sso_nonce`. Routing previews through `*.labsolution-tech.com` removes the gate end users hit.
- DNS wildcard already in place → no DNS work needed.
- `vercel alias set <deployment-url> <subdomain>` is the unit operation. Idempotent on rebind.
- `vercel alias rm <subdomain> --yes` is idempotent on already-gone aliases.
- `vercel.json` accepts a single boolean `"git": { "deploymentEnabled": false }` to disable across all branches.
- `gh pr list --head <branch> --state open --json number` finds the open PR (if any) from a push event so we can still upsert a comment.
- `VERCEL_ENV` is auto-injected by `vercel build` as `production`, `preview`, or `development` (unset locally without `vercel`). Available at both build time (for the Vite plugin) and request time (for `api/contact.js`).

## Desired End State

- Pushing any non-`main` branch produces a deploy at `https://<slug>.labsolution-tech.com`, publicly accessible, no auth challenge.
- `main` continues to deploy production to `https://www.labsolution-tech.com`.
- Exactly one deploy fires per push (no double-deploy from Vercel's git integration).
- Preview subdomains release automatically when their PR is merged to `main` OR when the branch is deleted.
- Preview deployments serve `X-Robots-Tag: noindex,nofollow` via meta tag and a `Disallow: /` robots.txt; production is searchable.
- Contact form on previews short-circuits without sending email; in production it sends as today.
- Production deploys are race-safe, time-bounded, least-privileged, and health-checked with a body grep.
- The new flow is captured in `docs/adr/0003-branch-preview-subdomains.md` and the harness files reflect the change.

**How to verify:**

- Push `smoke-test-1` → `https://smoke-test-1.labsolution-tech.com` returns 200 with no login, body contains `LabSolution`, response has `<meta name="robots" content="noindex,nofollow">`.
- Open a PR; preview comment appears with that URL.
- Merge the PR; `https://smoke-test-1.labsolution-tech.com` starts 404'ing within ~60s.
- Push a branch named `www`; workflow fails at slug validation.
- Production deploy with a deliberately broken build fails the workflow at the health-check step.

## What We're NOT Doing

- Not migrating `vercel.json` → `vercel.ts` (separate decision; adds a dep).
- Not changing the production canonical from `www.labsolution-tech.com` to apex.
- Not building a stale-alias garbage collector beyond the merge/delete cleanup (no time-based cron).
- Not auto-rolling-back failed production deploys (operator decides).
- Not renumbering the duplicate `0001` ADRs (separate cleanup).
- Not adding rolling releases, canary, or Dependabot for the Vercel CLI.
- Not changing the Node version, framework, or build command.
- Not introducing new npm dependencies.

## Implementation Approach

Two PRs, with manual platform work between them. Each PR is a single coherent review surface, atomic per commit.

No new GitHub secrets are required — both workflows already use `secrets.VERCEL_TOKEN`, `secrets.VERCEL_ORG_ID`, `secrets.VERCEL_PROJECT_ID`, and the auto-provided `secrets.GITHUB_TOKEN`.

The safety-first ordering is load-bearing: the contact-form short-circuit and the noindex plugin make public previews acceptable. PR 1 must merge **before** the Vercel Authentication gate is removed. After PR 2 merges, the preview flow flips to subdomains in one step.

---

## PR 1 — Safety + Production Hygiene

Branch: `chore/vercel-cicd` (already exists; one commit so far — `3644c95 fix: allow search-engine indexing on production`).

### Phase 1A — Contact form short-circuit on non-production

**Owner-only edit.** `CLAUDE.md` lists `api/contact.js` as off-limits because it handles PII/email; the Owner has explicitly authorized this change for the public-preview safety property.

#### Changes Required:

**File:** `api/contact.js`
**Changes:** Add an early return when `process.env.VERCEL_ENV !== 'production'`, before the `RESEND_API_KEY` check. Form looks like it works on previews; no mail leaves Vercel.

```js
// after honeypot + validation, before resend.emails.send():
if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
  // Public preview deploys must not send real email.
  return res.status(200).json({ ok: true, preview: true })
}
```

Place it after the honeypot and the required-fields validation so previews still exercise the input handling, but before any Resend call.

#### Success Criteria:

##### Automated:
- [ ] `npm run lint` ✓
- [ ] `npm run build` ✓

##### Manual:
- [ ] On a preview deploy (PR 2 era), submitting the form returns `{ ok: true, preview: true }` and the sales inbox stays empty.
- [ ] On production, the form still sends mail to the sales inbox.

**Implementation Note:** Atomic commit. Prefix `fix:` because it changes behavior. Flag the `api/contact.js` edit explicitly in the PR description ("Owner-authorized touch of off-limits file; safety prerequisite for public previews").

---

### Phase 1B — Env-aware noindex via Vite plugin

#### Changes Required:

**File:** `vite.config.js`
**Changes:** Add an inline plugin that runs on every build. When `VERCEL_ENV === 'preview'`, inject the noindex meta tag into `index.html` (via `transformIndexHtml`) and overwrite `dist/robots.txt` to `Disallow: /` (in `closeBundle`).

```js
// add to plugins array:
{
  name: 'preview-noindex',
  apply: 'build',
  transformIndexHtml(html) {
    if (process.env.VERCEL_ENV !== 'preview') return html
    return html.replace(
      '</head>',
      '  <meta name="robots" content="noindex,nofollow">\n  </head>'
    )
  },
  closeBundle() {
    if (process.env.VERCEL_ENV !== 'preview') return
    const fs = require('node:fs')
    const path = require('node:path')
    fs.writeFileSync(
      path.resolve('dist/robots.txt'),
      'User-agent: *\nDisallow: /\n'
    )
  },
}
```

Semantics: trigger only on the literal string `'preview'`. Production builds (`VERCEL_ENV === 'production'`) and local dev (unset) are unaffected.

#### Success Criteria:

##### Automated:
- [ ] `npm run lint` ✓
- [ ] `VERCEL_ENV=preview npm run build && grep -q 'noindex,nofollow' dist/index.html` ✓
- [ ] `VERCEL_ENV=preview npm run build && grep -q 'Disallow: /' dist/robots.txt` ✓
- [ ] `VERCEL_ENV=production npm run build && ! grep -q 'noindex' dist/index.html` ✓ (no injection on prod)

##### Manual:
- [ ] After PR 2, fetch `<slug>.labsolution-tech.com/robots.txt` → `Disallow: /`.
- [ ] After PR 2, view-source on `<slug>.labsolution-tech.com` → noindex meta tag present.
- [ ] `https://www.labsolution-tech.com/robots.txt` → `Allow: /` (from Phase 1C).
- [ ] `https://www.labsolution-tech.com` HTML → no noindex meta.

**Implementation Note:** Atomic commit. Prefix `feat:`. The plugin reads `process.env.VERCEL_ENV` synchronously at hook time; safe because Vite invokes hooks per build.

---

### Phase 1C — Production-friendly robots.txt

#### Changes Required:

**File:** `public/robots.txt`
**Changes:** Replace `Disallow: /` with the production-friendly default.

```
User-agent: *
Allow: /
```

Production now indexes; the Vite plugin overrides this file for preview builds.

#### Success Criteria:

##### Automated:
- [ ] `npm run build` → `dist/robots.txt` contains `Allow: /` (when `VERCEL_ENV !== 'preview'`).

##### Manual:
- [ ] After PR 1 merges and `main` redeploys, `https://www.labsolution-tech.com/robots.txt` returns `User-agent: *\nAllow: /`.

**Implementation Note:** Atomic commit, prefix `fix:`. Pair this commit with Phase 1B so the preview override and the production default ship together.

---

### Phase 1D — Production CI/CD hygiene

#### Changes Required:

**File:** `.github/workflows/production.yml`
**Changes:** Full rewrite. Pin Vercel CLI to `54.3.0`. Add `env.PRODUCTION_URL` and `env.HEALTH_CHECK_TOKEN` (the body grep string). Add `concurrency`, `timeout-minutes`, `permissions`. Append a retrying health check.

```yaml
name: Production Deployment

on:
  push:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  VERCEL_CLI_VERSION: '54.3.0'
  PRODUCTION_URL: https://www.labsolution-tech.com
  HEALTH_CHECK_TOKEN: 'LabSolution'

concurrency:
  group: production
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - run: npm ci

      - run: npm run lint

      - name: Install Vercel CLI
        run: npm install --global vercel@${{ env.VERCEL_CLI_VERSION }}

      - name: Pull Vercel environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> "$GITHUB_OUTPUT"
          {
            echo "### Production URL"
            echo "$url"
          } >> "$GITHUB_STEP_SUMMARY"

      - name: Health check
        run: |
          fail=1
          for i in 1 2 3 4 5; do
            body=$(curl -sS -L -o /tmp/body.html -w '%{http_code}' "${PRODUCTION_URL}") || body="000"
            if [ "$body" = "200" ] && grep -q "${HEALTH_CHECK_TOKEN}" /tmp/body.html; then
              echo "Health check passed: HTTP $body, body contains '${HEALTH_CHECK_TOKEN}'"
              fail=0
              break
            fi
            echo "Attempt $i: HTTP $body, token present: $(grep -q "${HEALTH_CHECK_TOKEN}" /tmp/body.html && echo yes || echo no). Retrying in 5s..."
            sleep 5
          done
          if [ $fail -eq 1 ]; then
            {
              echo "### Health check FAILED"
              echo "${PRODUCTION_URL} did not return 200 with body containing '${HEALTH_CHECK_TOKEN}' after 5 attempts."
              echo "Operator action required: investigate and roll back manually if needed."
            } >> "$GITHUB_STEP_SUMMARY"
            exit 1
          fi
```

The body grep token is `LabSolution` — present in the page title and navbar; effectively guaranteed to appear in a healthy render.

#### Success Criteria:

##### Automated:
- [ ] `actionlint .github/workflows/production.yml` (if installed) ✓
- [ ] On merge to `main`, the workflow completes; health check passes.

##### Manual:
- [ ] Two back-to-back pushes to `main` serialize (second waits for first; nothing cancels).
- [ ] Temporarily setting `HEALTH_CHECK_TOKEN: 'ThisDoesNotExist'` (in a throwaway PR — do not merge) causes the workflow to fail red with a clear summary message.

**Implementation Note:** Atomic commit, prefix `chore:`. `cancel-in-progress: false` on production — drain the queue, don't cancel mid-deploy.

---

## Platform Setup (between PR 1 and PR 2)

Manual platform configuration. No repo changes. Record completion of each step in PR 2's description.

### Steps:

1. **Disable Vercel Authentication for previews.**
   - Dashboard: Project `labsolution-tech.com` → Settings → Deployment Protection → Vercel Authentication → "Disabled" (or "Only Production Deployments").
   - Or via API: `PATCH https://api.vercel.com/v9/projects/prj_ROXJN9qeSgJGVCHYdq9Sn2GTYGEN?teamId=team_r8BNMGg1KoeFqA3AsDQkeJJ3` with body `{ "ssoProtection": null }`.

2. **Add `*.labsolution-tech.com` as a wildcard project domain.**
   ```bash
   vercel domains add "*.labsolution-tech.com" labsolution-tech.com
   ```
   Verify with `vercel domains inspect labsolution-tech.com`.

3. **Release legacy `*.labsolution-tech.com` aliases (keep only `www`).**
   ```bash
   vercel alias rm beta.labsolution-tech.com --yes --token=$VERCEL_TOKEN
   vercel alias rm beta2.labsolution-tech.com --yes --token=$VERCEL_TOKEN
   ```

4. **Sweep orphan auto-generated `*.vercel.app` branch aliases.** After PR 2 disables Vercel's git auto-deploy, these become permanently dead. Clean them now to keep the alias list tidy. List then remove:
   ```bash
   vercel alias ls | awk '/labsolution-techcom-git-/ {print $2}' \
     | xargs -I{} vercel alias rm {} --yes --token=$VERCEL_TOKEN
   ```
   (Safe — none of these are referenced by external links.)

5. **End-to-end smoke (one throwaway alias) to verify the wildcard works.**
   ```bash
   url=$(vercel deploy --prebuilt --token=$VERCEL_TOKEN)
   vercel alias set "$url" smoke-1.labsolution-tech.com --token=$VERCEL_TOKEN
   curl -sI https://smoke-1.labsolution-tech.com | head -1   # expect HTTP/2 200
   vercel alias rm smoke-1.labsolution-tech.com --yes --token=$VERCEL_TOKEN
   ```

### Success Criteria:

##### Automated:
- [ ] `curl -sI https://smoke-1.labsolution-tech.com | head -1` returns `HTTP/2 200` during the smoke step.
- [ ] `vercel domains inspect labsolution-tech.com` lists `*.labsolution-tech.com` against the project.
- [ ] `vercel alias ls | grep -E '(beta|beta2)\.labsolution-tech\.com'` returns nothing.

##### Manual:
- [ ] Opening a preview URL in incognito shows no Vercel login screen.
- [ ] `https://www.labsolution-tech.com` still serves the current production deployment.

**Implementation Note:** Phase 4's `vercel alias set` (in PR 2) will fail without step 2 done. Pause for confirmation after platform setup.

---

## PR 2 — Preview Subdomain Switchover

Branch: cut a fresh branch from updated `main` after PR 1 merges (suggested: `feat/branch-preview-subdomains`).

### Phase 2A — Single deploy path

#### Changes Required:

**File:** `vercel.json`
**Changes:** Collapse the per-branch `deploymentEnabled` override into a single boolean.

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

#### Success Criteria:

##### Automated:
- [ ] `npm run lint` ✓
- [ ] `npm run build` ✓
- [ ] `jq '.git.deploymentEnabled' vercel.json` returns `false`.

##### Manual:
- [ ] After merge, pushing a non-`main` branch produces no Vercel-auto-created deployment in the dashboard.

**Implementation Note:** Atomic commit, prefix `chore:`. Land Phase 2A and 2B in the same PR — Phase 2A alone takes preview deploys to zero until Phase 2B picks them back up.

---

### Phase 2B — Branch-subdomain preview workflow

#### Changes Required:

**File:** `.github/workflows/preview.yml`
**Changes:** Full rewrite. Keep `name: Preview Deployment` so the branch-protection required-check name on `main` stays valid.

```yaml
name: Preview Deployment

on:
  push:
    branches-ignore: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  VERCEL_CLI_VERSION: '54.3.0'
  DOMAIN_ROOT: labsolution-tech.com

concurrency:
  group: preview-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm

      - run: npm ci
      - run: npm run lint

      - name: Compute branch slug
        id: slug
        run: |
          raw="${{ github.ref_name }}"
          slug=$(printf '%s' "$raw" \
            | tr '[:upper:]' '[:lower:]' \
            | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' \
            | cut -c1-50 \
            | sed -E 's/-+$//')
          case "$slug" in
            ''|www|main)
              echo "::error::Branch '$raw' yields reserved or empty slug '$slug'. Rename the branch." && exit 1
              ;;
          esac
          echo "value=$slug" >> "$GITHUB_OUTPUT"
          echo "Computed slug: $slug"

      - name: Install Vercel CLI
        run: npm install --global vercel@${{ env.VERCEL_CLI_VERSION }}

      - name: Pull Vercel environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        id: deploy
        run: |
          url=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "url=$url" >> "$GITHUB_OUTPUT"
          echo "Deployment URL: $url"

      - name: Alias to subdomain
        id: alias
        run: |
          target="${{ steps.slug.outputs.value }}.${{ env.DOMAIN_ROOT }}"
          vercel alias set "${{ steps.deploy.outputs.url }}" "$target" --token=${{ secrets.VERCEL_TOKEN }}
          echo "target=https://$target" >> "$GITHUB_OUTPUT"
          {
            echo "### Preview URL"
            echo "https://$target"
          } >> "$GITHUB_STEP_SUMMARY"

      - name: Find open PR for branch
        id: pr
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          number=$(gh pr list --head "${{ github.ref_name }}" --state open --json number --jq '.[0].number // ""')
          echo "number=$number" >> "$GITHUB_OUTPUT"

      - name: Upsert preview comment
        if: steps.pr.outputs.number != ''
        uses: actions/github-script@v7
        with:
          script: |
            const target = '${{ steps.alias.outputs.target }}';
            const issue_number = Number('${{ steps.pr.outputs.number }}');
            const marker = '<!-- vercel-preview-comment -->';
            const body = `${marker}\nPreview deployed: ${target}\nCommit: \`${context.sha.slice(0, 7)}\``;
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number,
            });
            const existing = comments.find((c) => c.body && c.body.includes(marker));
            if (existing) {
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: existing.id,
                body,
              });
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number,
                body,
              });
            }
```

Reserved slugs: `www` (production), `main` (would conflict with the production branch's name), plus the empty case.

#### Success Criteria:

##### Automated:
- [ ] `actionlint .github/workflows/preview.yml` (if installed) ✓
- [ ] Push `smoke-test-1` → workflow succeeds; `curl -sI https://smoke-test-1.labsolution-tech.com` → `HTTP/2 200`.

##### Manual:
- [ ] Subdomain returns 200 in incognito; HTML contains the noindex meta tag.
- [ ] Open a PR from `smoke-test-1` → comment appears with the subdomain.
- [ ] Force-push to the branch → same subdomain serves the new build.
- [ ] Push a branch named `www` → workflow fails red with the reserved-slug message.
- [ ] Push `editor/foo-bar` → resolves at `editor-foo-bar.labsolution-tech.com`.

**Implementation Note:** Atomic commit, prefix `feat:`. The workflow `name:` must stay exactly `Preview Deployment` to preserve the branch-protection rule.

---

### Phase 2C — Auto-release cleanup workflow

#### Changes Required:

**File:** `.github/workflows/preview-cleanup.yml` (new)
**Changes:** Trigger on `pull_request: closed` (only when merged) OR `delete` (branch deleted). Compute slug from the branch name. Skip if reserved. Run `vercel alias rm` idempotently.

```yaml
name: Preview Cleanup

on:
  pull_request:
    types: [closed]
  delete:

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  VERCEL_CLI_VERSION: '54.3.0'
  DOMAIN_ROOT: labsolution-tech.com

jobs:
  release-alias:
    if: >-
      (github.event_name == 'pull_request' && github.event.pull_request.merged == true)
      || (github.event_name == 'delete' && github.event.ref_type == 'branch')
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: read
    steps:
      - name: Resolve branch name
        id: ref
        run: |
          if [ "${{ github.event_name }}" = "pull_request" ]; then
            echo "name=${{ github.event.pull_request.head.ref }}" >> "$GITHUB_OUTPUT"
          else
            echo "name=${{ github.event.ref }}" >> "$GITHUB_OUTPUT"
          fi

      - name: Compute slug
        id: slug
        run: |
          raw="${{ steps.ref.outputs.name }}"
          slug=$(printf '%s' "$raw" \
            | tr '[:upper:]' '[:lower:]' \
            | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' \
            | cut -c1-50 \
            | sed -E 's/-+$//')
          case "$slug" in
            ''|www|main)
              echo "Skipping cleanup for reserved/empty slug '$slug' (from branch '$raw')."
              echo "value=" >> "$GITHUB_OUTPUT"
              ;;
            *)
              echo "value=$slug" >> "$GITHUB_OUTPUT"
              ;;
          esac

      - name: Install Vercel CLI
        if: steps.slug.outputs.value != ''
        run: npm install --global vercel@${{ env.VERCEL_CLI_VERSION }}

      - name: Pull Vercel environment
        if: steps.slug.outputs.value != ''
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Remove alias
        if: steps.slug.outputs.value != ''
        run: |
          target="${{ steps.slug.outputs.value }}.${{ env.DOMAIN_ROOT }}"
          echo "Removing alias: $target"
          vercel alias rm "$target" --yes --token=${{ secrets.VERCEL_TOKEN }} || {
            echo "Alias removal failed or alias did not exist — treating as success."
          }
          echo "### Released" >> "$GITHUB_STEP_SUMMARY"
          echo "https://$target (now 404)" >> "$GITHUB_STEP_SUMMARY"
```

The reserved-slug guard inside the cleanup workflow is the safety net that prevents a branch literally named `www` (which can't deploy in the first place) from accidentally triggering `vercel alias rm www.labsolution-tech.com` on merge and taking production down.

#### Success Criteria:

##### Automated:
- [ ] `actionlint .github/workflows/preview-cleanup.yml` (if installed) ✓
- [ ] Merge a PR from `smoke-test-1` → cleanup workflow runs; alias removed.
- [ ] Delete the `smoke-test-1` branch directly (no merge) → cleanup workflow runs; alias removed (idempotent if already gone).

##### Manual:
- [ ] After merge, `curl -I https://smoke-test-1.labsolution-tech.com` returns 404 (or Vercel's "no project" page) within ~60s.
- [ ] Closing a PR *without* merging does **not** remove the alias (preview stays).
- [ ] Deleting a branch named `www` (if one ever existed) does not remove the production alias.

**Implementation Note:** Atomic commit, prefix `feat:`.

---

### Phase 2D — Documentation

#### 1. ADR
**File:** `docs/adr/0003-branch-preview-subdomains.md` (new)
**Changes:** Single ADR covering the whole preview architecture, including safety preconditions.

Sections:
- **Status:** Accepted, 2026-05-23.
- **Context:** Two preview systems competing; `*.vercel.app` auth-gated; safety properties needed before public previews (no email from previews, no SEO leak).
- **Decision:** Single deploy path via GitHub Actions; every non-`main` branch aliased to `<slug>.labsolution-tech.com`; wildcard DNS already in place; Vercel Authentication disabled for the project; env-aware noindex via Vite plugin; contact form short-circuits on non-production; reserved slugs `www` and `main`; auto-release on merge or branch delete.
- **Consequences:** Branches are publicly previewable; the `api/contact.js` short-circuit is a load-bearing safety property and must not be removed; slug collisions are last-write-wins; cleanup is best-effort (idempotent `vercel alias rm`).

#### 2. `CONTEXT.md`
**File:** `CONTEXT.md`
**Changes:** Add glossary entries:
- **Preview Subdomain** — `<slug>.labsolution-tech.com`, the publicly-accessible URL for a branch's latest preview deploy. Created on push; released on merge or branch delete.
- **Branch Slug** — lowercase branch name with non-alphanumeric chars collapsed to `-`, max 50 chars; the prefix of a Preview Subdomain. `www` and `main` are reserved.

#### 3. `CLAUDE.md`
**File:** `CLAUDE.md`
**Changes:** Update the "Deployment & CI" section:
- Previews fire on every push to a non-`main` branch (not just PR open/sync).
- URL pattern is `<slug>.labsolution-tech.com`.
- Reserved slugs: `www`, `main`.
- Preview deploys: `noindex` via meta tag + `Disallow: /` robots.txt; contact form is short-circuited.
- Cleanup: PR merge or branch delete releases the subdomain.

Also note that `api/contact.js` remains off-limits for Site Editors; the Owner has carved out the safety short-circuit and shouldn't be regressed.

#### 4. `README.md`
**File:** `README.md`
**Changes:** Update Site Editor onboarding preview-URL paragraph to reference `<branch>.labsolution-tech.com` instead of `*.vercel.app`. Mention that the URL releases on merge.

#### 5. `.github/CICD_PLAN.md`
**File:** `.github/CICD_PLAN.md`
**Changes:** Append: "Superseded by `docs/adr/0003-branch-preview-subdomains.md`."

#### Success Criteria:

##### Automated:
- [ ] `npm run lint` ✓ (no code, sanity).

##### Manual:
- [ ] ADR is internally consistent with the merged workflows.
- [ ] A new Site Editor reading `README.md` knows their branch will deploy to `<branch>.labsolution-tech.com` and release on merge.

**Implementation Note:** Bundle as one or two `docs:` commits per file. ADR + CONTEXT + CLAUDE + README + supersession can be a single commit since they're tightly coupled.

---

## Testing Strategy

### Pre-merge smoke (manual, after PR 2 is up, before merging)

From a checkout of PR 2's branch:

1. Push `smoke-test-1` (a throwaway branch); watch the workflow in GitHub Actions.
2. `curl -sI https://smoke-test-1.labsolution-tech.com | head -1` → `HTTP/2 200`; no auth challenge.
3. `curl -s https://smoke-test-1.labsolution-tech.com | grep noindex` → match found.
4. `curl -s https://smoke-test-1.labsolution-tech.com/robots.txt` → contains `Disallow: /`.
5. Open a PR from `smoke-test-1` → comment appears with the subdomain.
6. Submit the contact form on `smoke-test-1.labsolution-tech.com` → 200 OK; sales inbox stays empty.
7. Push a second commit to `smoke-test-1` → same URL serves the new build.
8. Merge the PR → within ~60s, the subdomain 404s; cleanup workflow shows green in Actions.
9. Push branch `www` → workflow fails red at slug validation.
10. Push `editor/foo-bar` → resolves at `editor-foo-bar.labsolution-tech.com`.

### Production deploy smoke (after PR 1 merges)

1. Watch `production.yml` on the PR-1 merge; confirm lint + build + deploy + health check succeed.
2. `curl -sI https://www.labsolution-tech.com | head -1` → `HTTP/2 200`.
3. `curl -s https://www.labsolution-tech.com | grep -q LabSolution` → match found.
4. `curl -s https://www.labsolution-tech.com/robots.txt` → `Allow: /`.
5. View-source on the production page → no `noindex` meta tag.

### Edge cases

- Empty slug (e.g., branch `---`): caught by validation in both deploy and cleanup workflows.
- Truncation produces reserved word: caught.
- Two branches that slugify identically: last write wins (documented).
- Long branch name (>50 chars): truncated; still deploys.
- Branch named `MAIN` (uppercase): slugifies to `main`, caught.
- PR closed without merging: no cleanup (preview stays).
- Branch deleted via `git push origin :branch`: cleanup fires.

## Rollback Plan

### PR 1 (safety + production hygiene)

- **`api/contact.js`:** revert the Phase 1A commit. The form sends from previews again — risky once previews are public. Coordinate with PR 2 rollback.
- **Vite plugin (Phase 1B):** revert the commit; previews lose their noindex meta tag.
- **`public/robots.txt` (Phase 1C):** revert the commit; production goes back to `Disallow: /` (not indexable).
- **`production.yml` (Phase 1D):** revert the commit; lose hygiene + health check; production deploys still work.

### PR 2 (preview switchover)

- **`vercel.json` (Phase 2A):** revert; Vercel's git auto-deploy resumes for non-`main` branches. Auto-generated `*.vercel.app` URLs return.
- **`preview.yml` (Phase 2B):** revert to the PR-triggered version. Combined with reverting Phase 2A, the old double-deploy behaviour returns.
- **`preview-cleanup.yml` (Phase 2C):** delete the file or revert the commit. Subdomains stop auto-releasing; manual `vercel alias rm` required for cleanup.
- **Documentation (Phase 2D):** revert as a batch; ADR is removed from `docs/adr/`.

### Platform setup

- **Re-enable Vercel Authentication:** dashboard → Deployment Protection → on (or `PATCH` with `{ "ssoProtection": { "deploymentType": "preview" } }`).
- **Remove the wildcard domain:** `vercel domains rm "*.labsolution-tech.com"` (after revoking from the project).
- **Re-create `beta.labsolution-tech.com` / `beta2.labsolution-tech.com`** if any external link still depends on them (unlikely; they were experimental).

### Full revert (worst case)

1. `git revert` the PR 2 merge commit.
2. `git revert` the PR 1 merge commit.
3. Re-enable Vercel Authentication.
4. Remove wildcard domain.
5. Re-add legacy aliases if needed.

~10 minutes total.
