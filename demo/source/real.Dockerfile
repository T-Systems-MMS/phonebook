FROM nginx:1.18.0-alpine@sha256:ca9fac83c6c89a09424279de522214e865e322187b22a1a29b12747a4287b7bd
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/real /usr/share/nginx/html

CMD ["nginx"]
