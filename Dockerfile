FROM n8nio/n8n:latest

USER root

COPY . /custom-node

WORKDIR /custom-node

RUN npm install --include=dev

RUN npm run build

ENV N8N_CUSTOM_EXTENSIONS=/custom-node/dist

USER node