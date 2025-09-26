from node:lts-alpine as main
run corepack enable
workdir /app

from main as build
copy package.json pnpm-lock.yaml .
run pnpm install --frozen-lockfile
copy next.config.ts .
copy src src
run pnpm build

from main
copy --from=build /app/dist/standalone .
env PORT=80
expose $PORT
user node
cmd ["node", "server.js" ]
