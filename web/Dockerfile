from node:lts-alpine as base
run corepack enable
workdir /app

from base as build
copy package.json pnpm-lock.yaml .
run pnpm install --frozen-lockfile
copy postcss.config.mjs tsconfig.json next.config.ts .
copy src src
arg NEXT_PUBLIC_API_URL
env NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
run pnpm build

from base
copy --from=build /app/.next/standalone .
copy --from=build /app/.next/static .next/static
copy public public
env HOSTNAME=0.0.0.0
env PORT=7777
expose $PORT
user node
cmd ["node", "server.js" ]
