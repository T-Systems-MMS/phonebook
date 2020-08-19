FROM nginx:1.18.0-alpine@sha256:8853c7e938c2aa5d9d7439e698f0e700f058df8414a83134a09fcbb68bb0707a
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/synthetic /usr/share/nginx/html

CMD ["nginx"]
