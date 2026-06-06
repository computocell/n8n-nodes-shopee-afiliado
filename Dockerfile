# syntax=docker/dockerfile:1.4

FROM n8nio/n8n:latest

USER root

COPY . /custom-node

WORKDIR /custom-node

# Instala versão estável anterior do pnpm
RUN npm install -g pnpm@9 --force
# Garante instalação de devDependencies
ENV NODE_ENV=development
# Instala dependências
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Build
RUN pnpm run build

RUN chown -R node:node /custom-node

USER node