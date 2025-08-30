Engineering Standards

SOLID
- Single Responsibility: one reason to change per module.
- Open/Closed: add behavior via composition, not modification.
- Liskov: respect contracts; use narrow interfaces.
- Interface Segregation: small, focused ports.
- Dependency Inversion: domain depends on abstractions.

DRY
- Share code intentionally in packages with small public APIs.
- Avoid copy/paste between services; extract reusable pieces.

Testing
- Unit-test domain first.
- Keep fast tests; integration behind thin seams (adapters).

Naming
- Features > layers: `src/features/<feature>/...` in web.
- Python: `snake_case` files, `PascalCase` classes, `lower_snake` functions.

