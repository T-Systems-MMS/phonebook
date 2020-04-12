---
layout: default
title: Getting Started
has_parent: true
parent: Frontend
grand_parent: Development Guides
permalink: /pages/development-guides/frontend/getting-started
nav_order: 100
---

# :small*red_triangle: \*\*Getting Started with \_frontend*\*\*

We recommmend using [VSCode](https://code.visualstudio.com/) as IDE, however you can also use your favorite IDE.

<details>
<summary>Mandatory Plugins for VSCode</summary>
This plugins are part of the <a href="https://github.com/T-Systems-MMS/phonebook/blob/master/phonebook.code-workspace" target="_blank">phonebook.code-workspace</a>-File
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier</a></li>
</ul>
</details>
<details>
<summary>Recommend Plugins for VSCode</summary>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek" target="_blank">CSS Peak</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode" target="_blank">Angular 8 Snippets</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=Angular.ng-template" target="_blank">Angular Language Service</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin" target="_blank">TSLint</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script" target="_blank">NPM</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank">Git Lens</a></li>
</ul>
</details>
<br>
At this time only the frontend is full Open Source. In the following steps do you learn how to setup the frontend of the Phonebook.

> To contribute to the backend please contact one of the {{site.contributors}}.

<details>
  <summary>If you do not have much experience about the named techniques you can find more resources here:</summary>
<i>This part will be regurlarly expanded. If you have other project related resources edit this file and start a pull request.</i>
<ul>
    <li><a href="https://angular.io/tutorial" target="_blank">Angular Tutorial</a></li>
    <li><a href="https://dev.to/dhruv/essential-git-commands-every-developer-should-know-2fl" target="_blank">Essential Git Commands</a></li>
    <li><a href="https://ngxs.gitbook.io/ngxs/" target="_blank">NGXS Documentation</a></li>
</ul>
</details>

### **Quickstart with Node :green_book:**

1.  Install the current Version of
    - [Node LTS](https://nodejs.org/en/download/) and
    - [GIT](https://git-scm.com/downloads)
2.  **Optional:** If you need to setup Proxies follow the steps below.
    _(You only need to setup proxies if you're behind a corporate proxy.)_

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

# Pull the docker image for backend mock
docker pull tsystemsmms/phonebook-build:mock-backend

# Run the project
npm run start -- --open
```

> If you are behind a corporate proxy you also need to set the proxy in your docker settings to pull the mock-backend. A tutorial can be found on the internal page.

> If you want to use a different backend server edit the Angular Proxy in the [proxy.conf.json](../../../proxy.conf.json).

:star: You're ready to develop the Phonebook-Frontend application! Start by reading the [General Guide](general-guide) to get an overview.

> In order to circumvent Bugs coming from unsecured Websites please add the certificate used on the localhost page to your 'Trusted Root Certification Authorities'. (For Windows: In Chrome just click at the top 'Not secure' then click on Certificate, Details, Copy to File, save it anywhere and add the certificate to your 'Trusted Root Certification Authorities'. )
