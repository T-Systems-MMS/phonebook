FROM nginx:1.18.0-alpine@sha256:676b8117782d9e8c20af8e1b19356f64acc76c981f3a65c66e33a9874877892a
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./


RUN rm -r /usr/share/nginx/html/*
COPY ./assets /usr/share/nginx/html

CMD ["nginx"]
