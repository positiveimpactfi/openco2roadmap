FROM node:alpine

WORKDIR /home/openco2roadmap/server

COPY package.json yarn.lock ./

RUN apk add --no-cache python3 make g++
RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 4000
USER node
ENV NODE_ENV production

CMD [ "node", "dist/index.js" ]