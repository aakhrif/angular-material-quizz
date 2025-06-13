# Stage 1: Build Angular App
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build Client und Server (SSR)
RUN npm run build:ssr

# hier schauen ob dist folder existiert
RUN echo "🔍 Prüfe ob ./dist existiert..." && \
    if [ -d "./dist" ]; then \
        echo "✅ dist existiert."; \
        ls -l ./dist; \
    else \
        echo "❌ dist existiert NICHT!"; \
        exit 1; \
    fi

# Stage 2: Production Image
FROM node:20-alpine

WORKDIR /app
# Nur das Nötigste kopieren
COPY --from=build /app/dist ./dist

# Überprüfen, ob dist erfolgreich kopiert wurde
RUN echo "📦 Prüfe ob ./dist erfolgreich kopiert wurde..." && \
    if [ -d "./dist" ]; then \
        echo "✅ dist wurde erfolgreich kopiert."; \
        ls -l ./dist; \
    else \
        echo "❌ dist konnte nicht kopiert werden!"; \
        exit 1; \
    fi

# Debug-Ausgabe:
RUN echo "Inhalt von /app/dist:" && ls -R ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 4000

# SSR Server starten
CMD ["node", "dist/angular-libs/server/server.mjs"]
