# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY tools ./tools
COPY packages ./packages
COPY apps/web/package.json ./apps/web/package.json
RUN pnpm install --frozen-lockfile=false --shamefully-hoist

FROM deps AS build
COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN [ -d node_modules ] || ln -s /app/node_modules ./node_modules
RUN pnpm add next@14.2.5
RUN pnpm build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/apps/web/.next /app/apps/web/.next
COPY --from=deps /app/apps/web/package.json /app/apps/web/package.json
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/web/node_modules /app/apps/web/node_modules
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm","start"]

