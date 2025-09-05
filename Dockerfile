FROM node:22-alpine3.21 AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat g++ python3 openjdk11
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY . .

# RUN npx prisma generate

RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner
USER runner

COPY --from=builder --chown=runner:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=runner:nodejs /app/dist ./dist
# COPY --from=builder --chown=runner:nodejs /app/prisma ./prisma
COPY --from=builder --chown=runner:nodejs /app/package.json ./package.json
COPY --from=builder --chown=runner:nodejs /app/package-lock.json ./package-lock.json
COPY --from=builder --chown=runner:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=runner:nodejs /app/tsconfig-paths-bootstrap.js ./tsconfig-paths-bootstrap.js

CMD ["npm", "run", "start"]