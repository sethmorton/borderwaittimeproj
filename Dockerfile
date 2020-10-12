
FROM node:14
COPY . .
ENTRYPOINT "run.sh && run.sh run"

