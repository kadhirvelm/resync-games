FROM node:23.11.0-slim AS builder

WORKDIR /app

COPY . .
RUN --mount=type=cache,target=/app/.yarn.cache npx turbo prune @resync-games/backend --docker && cp -R .yarn .yarnrc.yml .pnp.cjs tsconfig.json out/ && mv out/full/* out/ && rm -rf out/json && rm -rf out/full
RUN cp -r packages/games out/packages/games && cp -r packages/api out/packages/api && cp .env out/packages/backend/

WORKDIR /app/out

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable
RUN yarn

ENV NODE_ENV=production
RUN yarn run turbo run build --filter=@resync-games/backend && yarn workspaces focus --all --production

FROM node:23.11.0-slim AS runner

COPY --from=builder /app/out /app/out

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app/out/packages/backend

RUN corepack enable
RUN yarn

ENV NODE_ENV=production

EXPOSE 8080

CMD ["/bin/bash", "-c", "yarn serve"]