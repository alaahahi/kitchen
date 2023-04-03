FROM node:14-alpine
ARG BUILD_COMMAND="build-dev"

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy dependency information and install all dependencies
COPY --chown=node:node package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY --chown=node:node . ./

RUN npm run $BUILD_COMMAND
