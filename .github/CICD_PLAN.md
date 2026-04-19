# CI/CD Plan

## Goal
- Local: `vercel` / `vercel --prod` for ad-hoc preview deploys (unchanged).
- `main` push → GitHub Actions → `vercel deploy --prebuilt --prod`.
- PRs: see step 6.

## Steps

### 1. Disable Vercel's Git auto-deploy
Add a `vercel.json` with:
```json
{ "git": { "deploymentEnabled": { "main": false } } }
```
Otherwise every push triggers both Vercel's integration and our GH Action → duplicate prod deploys.

### 2. Mint a Vercel token
Create a scoped token at https://vercel.com/account/tokens (scope: `ai-labsolution` team, project `labsolution-tech.com`). Manual — user action required.

### 3. Add GitHub secrets
Via `gh secret set` (needs the token from step 2):
- `VERCEL_TOKEN` — the new token
- `VERCEL_ORG_ID` = `team_r8BNMGg1KoeFqA3AsDQkeJJ3`
- `VERCEL_PROJECT_ID` = `prj_ROXJN9qeSgJGVCHYdq9Sn2GTYGEN`

### 4. Create `.github/workflows/production.yml`
Triggers on push to `main`. Steps:
1. Checkout
2. Setup Node 24
3. `npm ci`
4. `npm run lint` (gate)
5. `vercel pull --environment=production`
6. `vercel build --prod`
7. `vercel deploy --prebuilt --prod`
8. Output production URL to run summary.

### 5. Verify `.gitignore`
Confirm `.vercel` stays out of the repo (already correct).

### 6. Decision — PR previews
Pick one:
- **(a) No PR previews.** Simplest. Only local `vercel` gives previews. Matches stated requirement literally.
- **(b) PR preview via GitHub Actions.** Add a second workflow on `pull_request` that runs `vercel deploy --prebuilt` (no `--prod`) and comments the preview URL on the PR. **Recommended** — one system owns deploys, reviewers get a clickable preview on every PR.
- **(c) Vercel Git integration for previews only.** Disable prod in step 1 (as shown), leave preview branches enabled. Zero CI cost — but splits responsibility across two systems.

### 7. Optional polish
- Branch protection on `main`: require the lint job to pass before merge.
- Add `type-check` / `test` steps when those scripts exist (package.json has neither today).

## Blockers for execution
- Step 2 (token creation) and step 3 (adding the token secret) require the user to paste the token.
- Step 6 requires a decision (a / b / c).

## Reference values
- Team ID: `team_r8BNMGg1KoeFqA3AsDQkeJJ3` (ai-labsolution)
- Project ID: `prj_ROXJN9qeSgJGVCHYdq9Sn2GTYGEN`
- Project name: `labsolution-tech.com`
- GitHub repo: `aiLabSolution/labsolution-tech.com`
