# base image
FROM node:13.12@sha256:7921beca7c2d5ba543c52a0baa5e6368a282c0dfaf6a8d12115026cde4dcb556 as builder

# set working directory
RUN  mkdir /usr/local/app
WORKDIR /usr/local/app

# This is only for the build and not needed if running locally
COPY ./package-lock.json /usr/local/app/package-lock.json
COPY ./package.json /usr/local/app/package.json
RUN npm ci 
# Because: https://stackoverflow.com/questions/37715224/copy-multiple-directories-with-one-command
COPY ./src/ ./src/

COPY ["angular.json", "tsconfig.json", "tsconfig.app.json", "tsconfig.spec.json", "tslint.json", "./"]
RUN npm run build



##################
### production ###
##################

FROM nginx:1.17.9@sha256:3936fb3946790d711a68c58be93628e43cbca72439079e16d154b5db216b58da
WORKDIR /etc/nginx

ARG BASE_URL
ARG RAVEN_URL
ARG EMPLOYEE_PICTURES_ENDPOINT
ARG ASSETS_ENDPOINT
ARG CONTACT_EMAIL
ARG CONTACT_URL

RUN rm -r ./*
COPY ./nginx/ ./

COPY ./substitute_variables.sh ./substitute_variables.sh
RUN chmod +x ./substitute_variables.sh

RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /usr/local/app/dist /usr/share/nginx/html
COPY ./opensearch.xml /usr/share/nginx/html/opensearch.xml

ENTRYPOINT ["./substitute_variables.sh", "/usr/share/nginx/html", "./substitute_variables.sh", "/etc/nginx"]
CMD ["nginx"]
