SHELL := /bin/sh

COMPOSE := docker compose -f infra/docker/compose.yml
COMPOSE_DEV := $(COMPOSE) -f infra/docker/compose.dev.override.yml

.PHONY: up down logs dev lint test

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE_DEV) down -v

logs:
	$(COMPOSE_DEV) logs -f --tail=200

dev:
	$(COMPOSE_DEV) up --build

lint:
	pnpm -w lint || true
	$(COMPOSE_DEV) run --rm api bash -lc "ruff check . && black --check . && mypy"
	$(COMPOSE_DEV) run --rm worker bash -lc "ruff check . && black --check . && mypy"

test:
	pnpm -w test
	$(COMPOSE_DEV) run --rm api pytest -q
	$(COMPOSE_DEV) run --rm worker pytest -q

