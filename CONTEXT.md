# LabSolution Site — Agentic Harness Context

The agentic harness is the scaffolding (instructions, tooling, guardrails) that lets a non-engineer at LabSolution drive code changes to this marketing site through an AI agent, without needing a terminal, git, or knowledge of JSX.

## Language

**Site Editor**:
A non-engineer at LabSolution (marketing, content, or operations) who drives changes to the site through the agentic harness. Fluent in English, comfortable with web apps, but does not read JSX and has never used git, npm, or a terminal.
_Avoid_: "less technical personnel", "non-tech user", "content person"

**Agentic Harness**:
The scaffolding — curated instruction files (`CLAUDE.md`, `AGENTS.md`, shared prompts/skills), restricted tool surface, preview workflow, and review gate — that lets a Site Editor safely produce code changes to this repo. Lives *in the repo*; runtime-agnostic.
_Avoid_: "the agent", "the bot", "the AI", "the prompt"

**Runtime**:
A concrete AI coding agent that reads the harness and executes work — currently Codex (web app, Mac app, or CLI) and Claude Code (Mac app or CLI). The harness is designed so any of these can drive it.
_Avoid_: "the agent" (use Runtime when you mean the platform; use Agentic Harness when you mean the repo scaffolding)

**Owner**:
The maintainer of this repo and the harness itself (Marloe). Reviews and merges every change a Site Editor produces, and runs heavier CLI Runtimes for harness maintenance and rescue.
_Avoid_: "admin", "developer"

## Relationships

- A **Site Editor** drives a **Runtime** that reads the **Agentic Harness** and produces a proposed change.
- Every proposed change is reviewed by the **Owner** before reaching production.

**Proposed Change**:
A single PR opened by a Runtime on behalf of a Site Editor, targeting `main` from a feature branch. Carries the Vercel preview URL in the PR comments and is the only path by which Site Editor work reaches production.
_Avoid_: "the change", "the edit", "the request"

## Relationships (extended)

- A **Site Editor** drives a **Runtime** (running locally on their Mac with a clone of this repo).
- The **Runtime** reads the **Agentic Harness**, makes file changes, commits to a feature branch, pushes, and opens a **Proposed Change** (PR) via `gh`.
- The `preview.yml` workflow lints, builds, and deploys to Vercel, then upserts a comment with the preview URL on the **Proposed Change**.
- The **Owner** reviews the **Proposed Change** on github.com and merges it.
- The `production.yml` workflow runs on push to `main` and deploys to production.

## Flagged ambiguities

- (none open)
