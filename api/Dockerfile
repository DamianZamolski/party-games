from node:lts as base

run npm install -g pnpm
workdir /app
copy . .

from base as prod-dependencies
run pnpm install --frozen-lockfile --prod

from base as build
run pnpm install --frozen-lockfile
run pnpm build

from base
copy --from=prod-dependencies /app/node_modules /app/node_modules
copy --from=build /app/dist /app/dist
env PORT=80
expose $PORT
healthcheck cmd curl --fail http://localhost:$PORT/health || exit 1
cmd [ "pnpm", "run", "start" ]
