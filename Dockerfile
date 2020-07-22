FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

ENV PORT=8080

CMD [ "npm","start:prod" ]