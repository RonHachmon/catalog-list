FROM node:20-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./package*.json ./


RUN npm i --verbose

COPY --chown=node:node . .

EXPOSE 5173

CMD [ "npm","run","dev"]