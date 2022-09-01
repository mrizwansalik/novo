# Check out https://hub.docker.com/_/node to select a new base image
FROM node:12-alpine

# Install node compile native
# RUN apk add g++ make python

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

# Bundle app source code
COPY . .

RUN yarn build

RUN yarn global add serve

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0

# expose default port of serve command
EXPOSE 5000

CMD [ "serve", "-s", "build" ]
