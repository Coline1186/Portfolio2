FROM node:lts

RUN mkdir /app
WORKDIR /app

COPY package.json ./

RUN npm i

COPY src src
COPY public public
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY tailwind.config.js tailwind.config.js
COPY postcss.config.js postcss.config.js
COPY vite.config.ts vite.config.ts
COPY index.html index.html

CMD ["npm", "run", "dev"]
