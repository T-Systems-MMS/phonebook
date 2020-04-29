# base image
FROM node:13.13@sha256:a2f412a0a9af605d1f11bd2bda8c8b76dddc1e5bf648657a896485d3e926dd5f as builder

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

FROM nginx:1.17.10@sha256:cccef6d6bdea671c394956e24b0d0c44cd82dbe83f543a47fdc790fadea48422
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
