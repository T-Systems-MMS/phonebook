FROM nginx:1.17.0-alpine
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/real /usr/share/nginx/html

CMD ["nginx"]
