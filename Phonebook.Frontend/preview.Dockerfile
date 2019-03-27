# base image
FROM node:11.2.0 as builder

# set working directory
RUN  mkdir /usr/local/app
WORKDIR /usr/local/app

# This is only for the build and not needed if running locally
COPY ./package-lock.json /usr/local/app/package-lock.json
COPY ./package.json /usr/local/app/package.json
RUN npm ci 
COPY . /usr/local/app
ARG BUILD_ARGS
RUN npx ng build --configuration preview $BUILD_ARGS

FROM nginx:latest
COPY --from=builder /usr/local/app/dist /usr/share/nginx/html