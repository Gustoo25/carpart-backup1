# Project Instructions

## Git workflow: push to `Adrian-Branch`, not `main`

All commits and pushes go to the `Adrian-Branch` branch by default. Never push directly to `main` or `Gus-Branch` (that's Adrian's collaborator's branch).

- If the local branch isn't `Adrian-Branch`, switch to it before committing.
- If `Adrian-Branch` doesn't exist locally, create a tracking branch from `origin/Adrian-Branch`.
- `main` is reserved for reviewed/merged work — only push to `main` if explicitly asked.
- Never touch `Gus-Branch` — that belongs to the collaborator.

Standard safety habits still apply: show the diff before committing, never force-push without confirmation, never commit without an explicit user ask.
