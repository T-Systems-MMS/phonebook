---
layout: default
title: Getting Started
nav_order: 2
---  

# :small_red_triangle: Getting Started :small_red_triangle:

We recommmend using [VSCode](https://code.visualstudio.com/) as IDE, however you can also use your favorite IDE.

<details>
<summary>Here can you find cool VS Code Plugins which we use</summary>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek" target="_blank">CSS Peak</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode" target="_blank">Angular 8 Snippets</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=Angular.ng-template" target="_blank">Angular Language Service</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin" target="_blank">TSLint</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script" target="_blank">NPM</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank">Git Lens</a></li>
</ul>
</details>
<br>
At this time only the frontend is full Open Source. In the following steps do you learn how to setup the frontend of the Phonebook. 

> To contribute to the backend please contact one of the {{site.contributors}}.



<details>
  <summary>If you have not many experience about the named techniques you can click to find more resources.</summary>
<i>This part will be regurlarly expanded. If you have other project related resources edit this file and start a pull request.</i>
<ul>
    <li><a href="https://angular.io/tutorial" target="_blank">Angular Tutorial</a></li>
    <li><a href="https://dev.to/dhruv/essential-git-commands-every-developer-should-know-2fl" target="_blank">Essential Git Commands</a></li>
    <li><a href="https://ngxs.gitbook.io/ngxs/" target="_blank">NGXS Documentation</a></li>
</ul>
</details>


### **Quickstart with Node :green_book:**

 1. Install the current Version of 
	 - [Node LTS](https://nodejs.org/en/download/) and
	 - [GIT](https://git-scm.com/downloads)
2.  **Optional:** If you need to setup Proxies click follow the steps below. 
		*(You only need to setup proxies if you're behind a corporate proxy.)*
```bash
npm config set proxy http://proxy.example.de:8080
npm config set https-proxy http://proxy.example.de:8080
git config --global http.proxy http://proxy.example.de:8080
git config --global https.proxy http://proxy.example.de:8080
```
3. Setup the Project:

```bash
cd /the/place/you/want/to/clone/to

git clone https://github.com/T-Systems-MMS/phonebook

cd phonebook/Phonebook.Frontend

# Install Angular/cli
npm install -g @angular/cli

# Install the project dependencies
npm install

# Run the backend mock before (only possible if you're a part of MMS)
docker run -p 8080:80 tsystemsmms/build:mock-backend

# Run the project
npm run start -- --open
```
> Point the Angular Proxy in the [proxy.conf.json](../../../proxy.conf.json) to your backend Server.

:star: You're ready to develop the Phonebook Application! Start by reading the general Guide to get an overview.

[General Guide](./development-guides/general-guide.md){: .btn .btn-purple }

> In order to circumvent Bugs coming from unsecured Websites please add the certificate used on the localhost page to your 'Trusted Root Certification Authorities'. (For Windows: In Chrome just click at the top 'Not secure' then click on Certificate, Details, Copy to File, save it anywhere and add the certificate to your 'Trusted Root Certification Authorities'. )


<!--
  ### Quickstart with Docker :small_blue_diamond:
> this Quickstart can lead to bugs and is not recommend at this moment.
 
Prerequisite: [Download and install Docker](https://docs.docker.com/install/#supported-platforms)

If you are behind a corporate proxy run this command beforehand:
```bash
npx dockerproxy start --address proxy.example.com --port 8080
```
Run the Phonebook Development Environment:
```bash
npm run start-compose
```

Thats it - Happy Coding!

> If you run into any problems you might reinstall docker, before filing a bug report. (This really helps!)

Hint: In order to have Language support it is recommended to also follow the Standard installation Guide above.
-->
<!--
## General
The commands used are mostly wrapped standard angular commands.

You will find a docker command for each standard command.

Here is a quick overview:


### Debugging and Testing

#### Testing

##### Unit Tests
```
npm run test-compose:dev
```
In order to run them without docker use the companion command `npm run test:dev`.

#### End 2 End Tests

```

npm run e2e-compose

```

In order to install the webdriver behind a corporate proxy run `npx webdriver-manager update --proxy 'http://proxy.company.de:8080/' --ignore_ssl` before.

In order to run them without docker use the companion command `npm run e2e:dev`.

# Additonal Commands

```

# Build the docker containers

npm run docker-build

# Analyze
# I18N

```

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build-prod` for a production build

## Running and Writing Tests
### Running
Run `npm run test` to execute all tests.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Writing
Run `npm run test:dev` and write your Tests.

You can use [NgMocks](https://www.npmjs.com/package/ng-mocks) for better modularity. Please note that `ng2-mock-component` should not be used anymore.

If you get an `[object ErrorEvent] thrown` use `npm run test:dev-debug` as there is an error with Angular/cli ([Issue](https://github.com/angular/angular-cli/issues/7296)).

## Useful to know

Have a look at the [general guide](developer-guide/general-guide.md) in order to get to know npm packages and workflows we are using to develop the Phonebook.
-->