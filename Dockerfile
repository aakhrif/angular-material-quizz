# Stage 1: Build Angular App
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Client und Server (SSR)
RUN npm run build:ssr

# Stage 2: Production Image
FROM node:20-alpine

WORKDIR /app

# Nur das Nötigste kopieren
COPY --from=build /app/.angular ./.angular
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4000

# SSR Server starten
CMD ["node", ".angular/server/server.mjs"]
