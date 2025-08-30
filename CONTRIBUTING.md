Contributing Guide

Thank you for contributing to Automation! This monorepo uses feature-first structure and hexagonal architecture. Please keep domain code pure and independent from frameworks.

Basics
- Use Conventional Commits: feat, fix, chore, docs, refactor, test, ci, build.
- Run lint and tests locally before opening a PR: `pnpm -w lint && pnpm -w test` and `pytest`.
- Keep changes scoped per PR. Update docs if behavior changes.

Coding Standards
- TypeScript: follow ESLint + Prettier rules from `tools/eslint-config`.
- Python: ruff, black, mypy. Keep `domain/` pure; do not import adapters from domain.
- Organize by feature at top-level, then by layer inside each service: domain, app, adapters, interfaces.

PR Checklist
- [ ] Code follows SOLID principles and boundaries.
- [ ] Unit tests added or updated when needed.
- [ ] Docs updated (README, codex/* if relevant).
- [ ] CI passes (lint, test, build images).

Local Dev
- Docker: `make dev` to run with dev overrides.
- Outside Docker: each service has dev scripts (`pnpm dev` or `uv run` equivalents).

