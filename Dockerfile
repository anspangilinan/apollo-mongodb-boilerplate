FROM node:16.20.1

WORKDIR /api

COPY --chown=node:node package*.json .

RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p /root/.cache/mongodb-binaries
RUN chown -R node:node node_modules
RUN chown -R node:node /root/.cache
RUN chmod -R 777 /root/.cache
COPY --chown=node:node . .

EXPOSE ${PORT}
CMD [ "npm", "run",  "start" ]