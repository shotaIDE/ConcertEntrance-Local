FROM node:alpine

WORKDIR /home/node/web

COPY package.json ./
RUN npm install

COPY concert_entrance_server.js ./
COPY public/ ./public/

EXPOSE 3001 9229

CMD [ "node", "concert_entrance_server.js" ]
