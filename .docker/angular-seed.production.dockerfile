FROM node:8.6 as builder

WORKDIR /home/node/angular-seed

# copy all files not listed in .dockerignore
COPY . .

# before switching to non-root user, change ownership of home
RUN chown -R node:node .
USER node

RUN npm install
RUN npm run build.prod

FROM nginx:1.13
COPY --from=builder /home/node/angular-seed/dist/prod /var/www/dist/prod
COPY ./.docker/nginx.conf /etc/nginx/conf.d/angular-seed.template
