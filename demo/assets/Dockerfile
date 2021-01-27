FROM nginx:1.18.0-alpine@sha256:7ae8e5c3080f6012f8dc719e2308e60e015fcfa281c3b12bf95614bd8b6911d6
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./


RUN rm -r /usr/share/nginx/html/*
COPY ./assets /usr/share/nginx/html/assets

CMD ["nginx"]
