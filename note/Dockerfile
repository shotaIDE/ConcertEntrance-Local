FROM node:alpine

WORKDIR /home/node/note

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY webpack.config.js ./
COPY .babelrc ./
COPY server.js ./
COPY src/ ./src/
COPY public/index.html ./public/index.html
RUN npm run-script build

EXPOSE 3000 9000

CMD [ "node", "server.js" ]
