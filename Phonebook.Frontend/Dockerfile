# base image
FROM node:13.14@sha256:1e8d7127072cdbaae1935656444c3ec2bef8882c8c14d459e3a92ca1dd313c28 as builder

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

FROM nginx:1.18.0@sha256:637488545a21a1ff771549ef65f5e3c1a8dbd92c98d360ac489d76b857021a55
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
