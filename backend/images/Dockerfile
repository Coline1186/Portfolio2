FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i

COPY src src
COPY tsconfig.json .

ENV UPLOAD_DIR=/data/uploads
RUN mkdir -p /data/uploads

CMD npm run start
