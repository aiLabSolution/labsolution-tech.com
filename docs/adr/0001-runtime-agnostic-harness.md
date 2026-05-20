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
