FROM nginx:1.19.2-alpine@sha256:4635b632d2aaf8c37c8a1cf76a1f96d11b899f74caa2c6946ea56d0a5af02c0c
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/real /usr/share/nginx/html

CMD ["nginx"]
