FROM nginx:1.17.5-alpine
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./


RUN rm -r /usr/share/nginx/html/*
COPY ./assets /usr/share/nginx/html

CMD ["nginx"]