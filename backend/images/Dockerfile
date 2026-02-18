FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY src src
RUN mkdir -p uploads
COPY tsconfig.json .


CMD ["npm", "run", "start"]