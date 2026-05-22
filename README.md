# LabSolution Site — Quick Start for Site Editors

You're here because you'll be updating the LabSolution Technologies website (https://labsolution-tech.com) as a **Site Editor**. You don't need to write any code. You'll describe what you want changed in plain English to an AI agent, the agent prepares the change, and the Owner (Marloe) reviews and publishes it.

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

## What a Site Editor can ask for

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

The technical documentation (commands, architecture, conventions, harness rules a runtime follows on behalf of a Site Editor) lives in [CLAUDE.md](./CLAUDE.md). The glossary of terms used in this initiative lives in [CONTEXT.md](./CONTEXT.md). The decision records live in [docs/adr/](./docs/adr/).
