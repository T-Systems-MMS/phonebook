FROM nginx:1.17.0-alpine@sha256:881169baf03885268b54eb07c673bc27f394b263cb728dfd86ff2b65b3450932
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/real /usr/share/nginx/html

CMD ["nginx"]
