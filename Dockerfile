FROM node:current-alpine

WORKDIR /app

COPY package.json .

RUN npm i --production

COPY . .

ENV PORT=8080
ENV NODE_ENV=production

RUN npm i -g typescript
RUN npm run prebuild
RUN npm run build

CMD [ "npm","start:prod" ]
