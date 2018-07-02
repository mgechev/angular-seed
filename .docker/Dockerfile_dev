FROM node:9.11

WORKDIR /home/node/angular-seed

# NB: Only copy files that are required by 'npm install'
# The 'src' directory will be mounted as a shared volume by docker-compose (allowing for live-reload)
COPY package.json .
COPY package-lock.json .
COPY gulpfile.ts .
COPY tsconfig.json .
COPY tslint.json .
COPY tools ./tools/
COPY .docker/rm.optional.deps.js ./.docker/rm.optional.deps.js

# before switching to non-root user, change ownership of home
RUN chown -R node:node .
USER node

# NB: this is a workaround due to the fact that npm '--no-optional' flag doesn't work (open script below for more)
RUN node .docker/rm.optional.deps.js

RUN npm install --no-optional
