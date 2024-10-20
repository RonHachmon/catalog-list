FROM node:18-slim

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app


COPY --chown=node:node ./package*.json ./


RUN npm install --verbose


COPY --chown=node:node . .


EXPOSE 3000

CMD ["npm", "run", "start:dev"]
