FROM node:16.19.0

WORKDIR /api

COPY --chown=node:node package*.json .

RUN npm install
COPY --chown=node:node . .

EXPOSE ${PORT}
CMD [ "npm", "run",  "start" ]