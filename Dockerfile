FROM node:20-alpine

WORKDIR /app

ARG APP_VERSION=1.0.0
ENV APP_VERSION=$APP_VERSION

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
