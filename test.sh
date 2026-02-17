sudo rm -rf volumes/postgres && docker compose --file compose.yaml --file compose.test.yaml up --build --attach test --exit-code-from test
