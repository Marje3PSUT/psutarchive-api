# This is the *development* docker image

FROM node:16-alpine as build

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# TODO: make a docker image for production
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY ./ .
RUN chown -R node:node /opt/app
USER node

RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "develop"]