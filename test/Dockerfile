from mcr.microsoft.com/playwright:v1.48.2
workdir /app
copy package.json pnpm-lock.yaml .
run npm install --global pnpm
run pnpm install --frozen-lockfile
copy playwright.config.ts .
run pnpm run install-playwright
copy src src
cmd ["pnpm", "test"]
