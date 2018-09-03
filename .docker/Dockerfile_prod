FROM node:9.11 as builder

WORKDIR /home/node/angular-seed

# try to make good use of docker cache: don't copy our source files until after install
# because there is no need to bust the "npm install" cache layer if only the app source files have changed
COPY package.json package-lock.json gulpfile.ts tsconfig.json tslint.json ./
COPY tools ./tools/
COPY .docker/rm.optional.deps.js ./.docker/rm.optional.deps.js

# before switching to non-root user, change ownership of home
RUN chown -R node:node .
USER node

# NB: this is a workaround due to the fact that npm '--no-optional' flag doesn't work (open script below for more)
RUN node .docker/rm.optional.deps.js

RUN npm install --no-optional

COPY src ./src/
COPY .docker/rm.optional.types.js ./.docker/rm.optional.types.js

# temporarily switch back to root user to fix ownership of the newly added files
USER root
RUN chown -R node:node src .docker/rm.optional.types.js
USER node

RUN node .docker/rm.optional.types.js
RUN npm run build.prod.rollup.aot

FROM nginx:1.13
COPY --from=builder /home/node/angular-seed/dist/prod /var/www/dist/prod
COPY ./.docker/nginx.conf /etc/nginx/conf.d/angular-seed.template
