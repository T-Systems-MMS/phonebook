FROM nginx:1.17.10-alpine@sha256:62a9ebe5ddcb7e60ebb3318db58b327035796086536aa770b0f196ac22873767
WORKDIR /etc/nginx

RUN rm -r ./*
COPY ./nginx/ ./

RUN rm -r /usr/share/nginx/html/*
COPY ./mocks/synthetic /usr/share/nginx/html

CMD ["nginx"]
