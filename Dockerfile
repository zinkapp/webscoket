FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm i --production

COPY . .

RUN npm run build

ENV PORT=8080

CMD [ "npm","start:prod" ]