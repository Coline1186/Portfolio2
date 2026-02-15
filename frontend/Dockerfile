FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json

RUN npm i
RUN apk --update --no-cache add curl


COPY src src
COPY public public

# COPY .env .
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY tailwind.config.js tailwind.config.js
COPY vite.config.ts vite.config.ts
COPY index.html index.html

CMD ["npm", "run", "dev"]