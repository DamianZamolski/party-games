from node:lts-alpine as main
workdir /app
run corepack enable
copy package.json .

from main as build
copy pnpm-lock.yaml .
run pnpm install --frozen-lockfile
copy tsconfig.json tsconfig.build.json prisma.config.ts .
copy src src
copy prisma prisma
run pnpm exec prisma generate
run pnpm build
run pnpm prune --prod

from main
copy --from=build /app/node_modules node_modules
copy --from=build /app/dist dist
copy --from=build /app/prisma prisma
copy --from=build /app/prisma.config.ts .
env PORT=8888
expose $PORT
user node
cmd pnpm exec prisma migrate deploy && node dist/main.js
