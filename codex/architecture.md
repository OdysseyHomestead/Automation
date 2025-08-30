Automation Architecture

Monorepo: pnpm workspaces for Node packages, uv-managed Python services. Feature-first structure with hexagonal layering inside each service:

- domain/: pure entities and value objects (no frameworks)
- app/: application services (orchestrate domain and ports)
- adapters/: infrastructural details (db/http/queue clients)
- interfaces/: entrypoints (HTTP routers/controllers, CLI, schedulers)

Boundaries
- No cross-app imports; depend through packages only.
- Packages expose single public entrypoints (index.ts / __init__.py).
- Domain is framework-agnostic and testable in isolation.

