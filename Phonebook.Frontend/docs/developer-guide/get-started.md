# Get Started with developing the Phonebook

We recommmend using [VSCode](https://code.visualstudio.com/) as IDE, however you can also use your favorite IDE.

### Docker - Quickstart

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

Hint: In order to have Language support it is recommended to also follow the [Standard installation Guide](###Standard).

### Standard

1.  Install [Node LTS](https://nodejs.org/en/) and [GIT](https://git-scm.com/downloads)
2.  Optional setup Proxies:

```bash
npm config set proxy http://proxy.example.de:8080
npm config set https-proxy http://proxy.example.de:8080
git config --global http.proxy http://proxy.example.de:8080
git config --global https.proxy http://proxy.example.de:8080
```

3.  Setup Project:

```bash
cd /the/place/you/want/to/clone/to
git clone https://github.com/T-Systems-MMS/phonebook
cd phonebook

# Install Angular/cli
npm install -g @angular/cli

# Install the project dependencies
npm install

# Run the project
npm run start -- --open
```

> Point the Angular Proxy in the [proxy.conf.json](../../../proxy.conf.json) to your backend Server.

You're ready to develop the Phonebook App! Read [here](./general-guide.md) on how to develop.

> In order to circumvent Bugs coming from unsecured Websites please add the certificate used on the localhost page to your 'Trusted Root Certification Authorities'. (For Windows: In Chrome just click at the top 'Not secure' then click on Certificate, Details, Copy to File, save it anywhere and add the certificate to your 'Trusted Root Certification Authorities'. )

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

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build-prod` for a production build.

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
