# syntax=docker/dockerfile:1.7

FROM ghcr.io/astral-sh/uv:python3.12-bookworm AS base
WORKDIR /app

FROM base AS deps
COPY apps/worker/pyproject.toml /app/pyproject.toml
COPY apps/worker/uv.lock /app/uv.lock
RUN uv sync --no-install-project --frozen

FROM deps AS runtime
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY apps/worker/src /app/src
COPY --from=deps /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
CMD ["uv", "run", "python", "-m", "src.interfaces.cli.main"]

