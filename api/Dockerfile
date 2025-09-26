from node:lts as main
run corepack enable
workdir /app

from main as build
copy package.json pnpm-lock.yaml .
run pnpm install --frozen-lockfile
copy src src
copy prisma prisma
run pnpm run prisma generate
copy tsconfig.json tsconfig.build.json .
run pnpm build
run pnpm prune --prod

from main
copy --from=build /app/node_modules node_modules
copy --from=build /app/dist dist
env PORT=80
expose $PORT
cmd ["node", "dist/main.js" ]
