FROM nginx:1.18.0-alpine@sha256:ddcf5d8753a062e297e4448ec332e833f2688a9de667b2a723370a3bc7eb01d5
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./


RUN rm -r /usr/share/nginx/html/*
COPY ./assets /usr/share/nginx/html/assets

CMD ["nginx"]
