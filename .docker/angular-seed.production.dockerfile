FROM node:8.6 as builder

# prepare a user which runs everything locally! - required in child images!
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
WORKDIR $HOME

ENV APP_NAME=angular-seed

# before switching to user we need to set permission properly
# copy all files, except the ignored files from .dockerignore
COPY . $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/$APP_NAME

RUN npm install
RUN npm run build.prod

FROM nginx:1.13
COPY --from=builder /home/app/angular-seed/dist/prod /var/www/dist/prod
COPY ./.docker/nginx.conf /etc/nginx/conf.d/angular-seed.template
