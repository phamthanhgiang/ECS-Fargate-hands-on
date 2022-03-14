# Global settings
ARG PHP_VERSION=7.4
ARG NGINX_VERSION=1.17

FROM php:${PHP_VERSION}-fpm-alpine AS app_php

# persistent / runtime deps
RUN apk add --no-cache \
        acl \
        file \
        gettext \
        git \
    ;

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY docker/php-fpm/php.ini /usr/local/etc/php/php.ini
COPY docker/php-fpm/php-cli.ini /usr/local/etc/php/php-cli.ini
COPY docker/php-fpm/zz-docker.conf /usr/local/etc/php-fpm.d/zzz-docker.conf

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

WORKDIR /srv/app

# build for production
ARG APP_ENV=production

# copy everything, excluding the one from .dockerignore file
COPY . ./

CMD ["php-fpm"]

# NGINX
FROM nginx:${NGINX_VERSION}-alpine AS app_nginx

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/

WORKDIR /srv/app

COPY --from=app_php /srv/app/public public/

