FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm i; fi

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

RUN npm i express

COPY --from=build /app/dist ./dist

COPY docker/server.cjs ./server.cjs

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.cjs"]
