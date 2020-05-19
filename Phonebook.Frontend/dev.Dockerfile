FROM node:13.14@sha256:1e8d7127072cdbaae1935656444c3ec2bef8882c8c14d459e3a92ca1dd313c28

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable && rm -rf /var/lib/apt/lists/*

# set working directory
RUN  mkdir /usr/local/app
WORKDIR /usr/local/app

# Install Angular CLI
RUN npm install -g --unsafe-perm @angular/cli@6.1.4

# Build node_modules folder as this speeds up the build time 
# (npm install is only executed if package.json changes)
COPY ./package-lock.json /usr/local/app/Phonebook.Frontend/package-lock.json
COPY package.json /usr/local/app/Phonebook.Frontend/package.json
RUN cd ./Phonebook.Frontend/ && npm install

# This is only for the build and not needed if running locally
COPY . /usr/local/app
