from node:lts-alpine as base
workdir /app

from base as build
run corepack enable
copy package.json pnpm-lock.yaml .
run pnpm install --frozen-lockfile
copy next.config.ts tsconfig.json .
copy src src
run pnpm build

from base
copy --from=build /app/.next/standalone .
env HOSTNAME="0.0.0.0" 
env PORT=7777
expose $PORT
user node
cmd ["node", "server.js"]
