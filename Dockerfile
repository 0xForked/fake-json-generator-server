from node:14.18.3-alpine    

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./app

CMD ["node", "index.mjs"]

EXPOSE 3000
