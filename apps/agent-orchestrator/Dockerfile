# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
RUN corepack enable pnpm
WORKDIR /app


FROM base AS deps
# Use monorepo context to install all dependencies (including devDependencies)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY tools ./tools
COPY packages ./packages
COPY apps/agent-orchestrator/package.json ./apps/agent-orchestrator/package.json
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
COPY apps/agent-orchestrator ./apps/agent-orchestrator
WORKDIR /app/apps/agent-orchestrator
# Ensure local node_modules are linked for devDependencies like typescript
RUN pnpm install --ignore-scripts --no-frozen-lockfile
RUN pnpm build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/apps/agent-orchestrator/dist /app/apps/agent-orchestrator/dist
COPY --from=deps /app/apps/agent-orchestrator/package.json /app/apps/agent-orchestrator/package.json
WORKDIR /app/apps/agent-orchestrator
EXPOSE 8085
CMD ["node", "dist/interfaces/http/server.js"]

