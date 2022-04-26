FROM node:alpine

WORKDIR /home/openco2roadmap/server

COPY server/package.json server/yarn.lock server/tsconfig.json ./

RUN apk add --no-cache python3 make g++
RUN yarn install

COPY server/.env ./env
COPY server/src ./src
COPY shared /home/openco2roadmap/shared

RUN yarn add argon2
RUN yarn build

EXPOSE 4000
USER node
ENV NODE_ENV production

CMD [ "node", "dist/server/src/index.js" ]