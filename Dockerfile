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

# Copy nur den build Output & package.json + node_modules
COPY --from=build /app/dist/angular-libs ./dist/angular-libs
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4000

# Node starten, server.mjs ist der SSR Node Server
CMD ["node", "dist/angular-libs/server/server.mjs"]
