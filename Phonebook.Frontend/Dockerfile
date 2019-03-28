# base image
FROM node:11.2.0 as builder

# set working directory
RUN  mkdir /usr/local/app
WORKDIR /usr/local/app

# This is only for the build and not needed if running locally
COPY ./package-lock.json /usr/local/app/package-lock.json
COPY ./package.json /usr/local/app/package.json
RUN npm ci 
# Because: https://stackoverflow.com/questions/37715224/copy-multiple-directories-with-one-command
COPY ./src/ ./src/

COPY ./version.js ./version.js
ARG DOCKER_TAG
ARG SOURCE_COMMIT
RUN node version.js $DOCKER_TAG $SOURCE_BRANCH $SOURCE_COMMIT

COPY ["angular.json", "tsconfig.json", "tslint.json", "./"]
RUN npm run build:de
RUN npm run build:en



##################
### production ###
##################

FROM nginx:1.15.8

RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /usr/local/app/dist /usr/share/nginx/html

WORKDIR /etc/nginx
RUN rm ./conf.d/default.conf
COPY ./nginx/nginx.conf ./nginx.conf
COPY ./nginx/conf.d ./conf.d
COPY ./substitute_variables.sh ./substitute_variables.sh
RUN chmod +x ./substitute_variables.sh

ARG BASE_URL
ARG RAVEN_URL
ARG EMPLOYEE_PICTURES_ENDPOINT
ARG OLD_EMPLOYEE_PICTURE_ENDPOINT
ARG ASSETS_ENDPOINT
ARG CONTACT_EMAIL
ARG CONTACT_URL

ENTRYPOINT ["./substitute_variables.sh", "/usr/share/nginx/html"]
CMD ["nginx"]