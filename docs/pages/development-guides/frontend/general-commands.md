---
layout: default
title: General Commands
parent: Frontend
grand_parent: Development Guides
nav_order: 300
---

# :pencil: **General Commands**

The commands used are mostly wrapped standard angular commands. You will find a docker command for each standard command.

You can find all possible commands in the [package.json](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/package.json).

Here is a quick overview:

## **Debugging and Testing**

### **Testing**

### **Unit Tests**

```bash
npm run test-compose:dev
```

In order to run them without docker use the companion command `npm run test:dev`.

### **End 2 End Tests**

```bash
npm run e2e-compose
```

In order to install the webdriver behind a corporate proxy run 

`npx webdriver-manager update --proxy 'http://proxy.company.de:8080/' --ignore_ssl` 

before.

In order to run them without docker use the companion command `npm run e2e:dev`.

## **Additional Commands**

```bash
# Build the docker containers
npm run docker-build

# Analyze
# I18N
```

### **Development server**

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### **Build**

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build-prod` for a production build.

### **Running and Writing Tests**

#### **Running**

Run `npm run test` to execute all tests.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### **Writing**

Run `npm run test:dev` and write your Tests.
You can use [NgMocks](https://www.npmjs.com/package/ng-mocks) for better modularity. Please note that `ng2-mock-component` should not be used anymore.
If you get an `[object ErrorEvent] thrown` use `npm run test:dev-debug` as there is an error with Angular/cli ([Issue](https://github.com/angular/angular-cli/issues/7296)).

