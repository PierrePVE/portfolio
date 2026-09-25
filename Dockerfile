# Portfolio Pierre Van Elsuve — image de production multi-stage.
# Même approche que Récurra : build Nuxt/Nitro puis runtime Node léger.

# ---- Étape 1 : build ----
FROM node:22-slim AS builder
WORKDIR /app

# Dépendances (cache : ne réinstalle que si package*.json change).
COPY package*.json ./
RUN npm ci

COPY . .
# Freebox target is served under /portfolio/ behind the reverse proxy. baseURL is
# baked at build time, so it must be set here (Vercel defaults to root "/" instead).
ENV NUXT_APP_BASE_URL=/portfolio/
RUN npm run build

# ---- Étape 2 : runtime ----
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Nitro écoute sur cet hôte/port
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# On ne reprend que la sortie autonome de Nitro (.output) : elle embarque
# tout le nécessaire, pas besoin de node_modules au runtime.
COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
