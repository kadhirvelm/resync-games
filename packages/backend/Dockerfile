FROM imbios/bun-node:latest-23.11.0-slim AS builder

WORKDIR /app

COPY . .

RUN bunx turbo prune @resync-games/backend
RUN cp -r packages/games out/packages/games && cp -r packages/api out/packages/api && cp .env out/packages/backend/

WORKDIR /app/out

RUN bun install

ENV NODE_ENV=production
RUN bun run turbo run build --filter=@resync-games/backend && bun install --production

FROM imbios/bun-node:latest-23.11.0-slim AS runner

RUN apt-get update -y && apt-get install -y openssl && corepack enable

COPY --from=builder /app/out /app/out

WORKDIR /app/out/packages/backend

RUN bun install --production

ENV NODE_ENV=production

EXPOSE 8080

CMD ["/bin/bash", "-c", "bun serve"]