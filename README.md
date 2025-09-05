# Automation Monorepo

A professional monorepo hosting multiple deployable services plus shared packages. Organized feature-first with hexagonal layering (domain/app/adapters/interfaces). Optimized for SOLID, DRY, clean architecture, and developer ergonomics.

- apps/web: Next.js dashboard
- apps/api: FastAPI backend
- apps/worker: APScheduler + Redis background worker
- apps/agent-orchestrator: Minimal TS HTTP server exposing /agent/plan
- packages/ui, packages/core-domain, packages/sdk: shared UI, types/schemas, and API client
- infra: docker compose, placeholders for k8s/terraform

## Quickstart

1. Copy env

```
cp infra/docker/.env.example infra/docker/.env
```

2. Run stack (dev overrides enabled)

```
docker compose -f infra/docker/compose.yml -f infra/docker/compose.dev.override.yml up --build
```

3. Visit services (if Traefik uses 8083, append :8083)

- http://web.localhost:8083 → dashboard shows API health status
- http://api.localhost:8083/health → {"status":"ok","service":"api"}
- http://api.localhost:8083/v1/version → {"version":"0.1.0"}
- http://agent.localhost:8083/agent/plan (POST) → placeholder plan

Note: if you kept Traefik on port 80, omit :8083.

cURL example (8083):

```
curl -s http://api.localhost:8083/health
curl -s http://api.localhost:8083/v1/version
curl -s -X POST http://agent.localhost:8083/agent/plan -H "content-type: application/json" -d '{"goal":"demo"}'
```

## Architecture

- Feature-first directories at the top of each app (e.g., `src/features/*`).
- Hexagonal layering inside each service:
  - domain/: entities, value objects (pure, no frameworks)
  - app/: use-cases orchestrating domain
  - adapters/: db/http/queue clients (tech details)
  - interfaces/: HTTP routers/controllers, CLI, schedulers
- Shared packages expose public APIs only (no deep imports).

## Dev Commands

- make up: compose up -d
- make down: stop and remove
- make logs: follow logs
- make dev: dev overrides with live reload
- make lint: lint all (TS + Python)
- make test: run all tests

## CI

GitHub Actions runs lint, tests, and builds Docker images for all services on PRs. Only affected paths trigger the jobs.

## Contribution

- Use Conventional Commits
- Keep domain pure; do not import adapters from domain
- Update docs and tests with your changes
- See CONTRIBUTING.md and codex/\* for standards, checklists, and tasks

## Smoke Test

1. `cp infra/docker/.env.example infra/docker/.env`
2. `docker compose -f infra/docker/compose.yml -f infra/docker/compose.dev.override.yml up --build`
3. Visit (with :8083 if using port 8083):
   - http://web.localhost:8083 → shows API health status
   - http://api.localhost:8083/health → `{status:"ok"}`
   - http://agent.localhost:8083/agent/plan → returns a placeholder plan
4. `docker compose logs worker` → see heartbeat every minute
5. `pnpm -w lint && pnpm -w test` and `pytest` pass with sample tests.

## License

MIT © 2025 Zachary Hayes
