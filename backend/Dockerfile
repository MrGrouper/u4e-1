FROM node:20

WORKDIR /usr/src/app


COPY . .


RUN npm ci


CMD DEBUG=playground:* npm start