FROM node:alpine

WORKDIR /home/openco2roadmap/server

COPY server/package.json server/yarn.lock ./

RUN apk add --no-cache python3 make g++
RUN yarn install

COPY ./server ./
COPY ./shared /home/openco2roadmap/shared

RUN yarn build

EXPOSE 4000
USER node
ENV NODE_ENV production

CMD [ "node", "dist/server/src/index.js" ]