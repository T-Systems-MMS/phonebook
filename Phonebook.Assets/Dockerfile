FROM nginx:1.15.8
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./


RUN rm -r /usr/share/nginx/html/*
COPY ./assets /usr/share/nginx/html

CMD ["nginx"]