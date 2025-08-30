# syntax=docker/dockerfile:1.7

FROM ghcr.io/astral-sh/uv:python3.12-bookworm AS base
WORKDIR /app

FROM base AS deps
COPY apps/api/pyproject.toml /app/pyproject.toml
COPY apps/api/uv.lock /app/uv.lock
RUN uv sync --no-install-project --frozen

FROM deps AS runtime
ENV PYTHONUNBUFFERED=1
ENV API_PORT=8000
WORKDIR /app
COPY apps/api/src /app/src
COPY --from=deps /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
