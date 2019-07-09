---
layout: default
title: Introduction
nav_order: 000
---

# :telephone: **Phonebook** :telephone:
by [T-Systems Multimedia Solutions GmbH](https://www.t-systems-mms.com/)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![GitHub issues](https://img.shields.io/github/issues/T-Systems-MMS/phonebook.svg?style=popout)](https://github.com/T-Systems-MMS/phonebook/issues) [![GitHub](https://img.shields.io/github/license/T-Systems-MMS/phonebook.svg)](https://github.com/T-Systems-MMS/phonebook/blob/master/LICENSE) [![GitHub](https://img.shields.io/badge/Documentation-GitHub--Pages-blueviolet.svg)](hhttps://t-systems-mms.github.io/phonebook/)
  

## **:question: What is the Phonebook?**

The Phonebook is a community project for us, from us and everybody is welcome to participate.
This Single-Page-Application is able to display People, Rooms and the organization structure. It is perfect to search for people in a company, get information where they sit in your building and how to contact them.

## **:wave: New to the Phonebook?**
We are always searching for new contributors who want to be a part of a growing community. The contribution benefits are huge. You can learn a lot about the technologies displayed below, bring new ideas into the project, connect with new people from different departments and learn how it is to be an OpenSource-Developer.

You're not interested in developing and just want to know more about how to use the software? [:beginner: Right this way](/phonebook/pages/user-docs)

## **:mag: You want to be a part of this community?**

You can contribute with any skill or use this project to evolve your techniques.

If you're **not interested in developing** but want to help you can [submit new issues](https://github.com/T-Systems-MMS/phonebook/issues/new/choose) or contact one of the {{site.contributors}}.

If you're **interested in developing** check out the following links.
  * {{site.current_issues}}
  * [Milestones](https://github.com/T-Systems-MMS/phonebook/milestones) 
  * [Development Guides](/phonebook/pages/development-guides)

<details>
  <summary><b>View some other examples to contribute</b></summary>
<ul>
    <li>Review Pull Requests</li>
    <li>Test the Application and suggest new enhancements or report new bugs</li>
    <li>Design a cool Phonebook-Logo</li>
    <li>Develop a new User-Centered Design</li>
    <li>Provide Accessibility</li>
    <li>Write a User-Guide</li>
</ul>
</details><br>

Note that you also can keep an eye on our <a class="d-inline-block v-align-text-top" style="background-color: #7057ff; color: #ffffff" title="Good for newcomers" href="https://github.com/T-Systems-MMS/phonebook/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" target="_blank">good first issue</a>-Badge. This Label shows that the issue can be perfect to dive into the project.

> If you're a part of T-Systems MMS you can also take a look at the internal get-started page.

## **:electric_plug: Technologie overview**
The project makes use of the following noteworthy frameworks:

<details>
<summary>Frontend Frameworks</summary>
<ul>
  <li><a href="https://angular.io/" target="_blank">Angular</a>: The popular JavaScript framework is the base of this application. We also use the Angular routing for navigation to different views.</li>
  <li><a href="https://github.com/angular/angular-cli/" target="_blank">Angular CLI</a>:  Makes development and the build process of the application much easier. It encapsulates the Webpack build configuration and provides some reasonable conventions to follow instead. The CLI also provides some convenient commands to generate new components, services, etc.</li>
  <li><a href="https://material.angular.io/" target="_blank">Angular Material</a>: Provides components to build an application with Google's Material design. We use it as a basis for our graphical layout.</li>
</ul>
</details>
<details>
<summary>Backend Frameworks</summary>
<ul>
  <li><a href="https://traefik.io/" target="_blank">Traefik</a></li>
  <li><a href="https://www.nginx.com/" target="_blank">Nginx</a></li>
  <li><a href="https://www.docker.com/" target="_blank">Docker</a></li>
</ul>
</details>

## **:sparkles: Need Help?**
If you still have questions feel free to contact one of the {{site.contributors}}.

## **:computer: Supported Browsers**

| Browser |  Support  | [Offline Capability](https://caniuse.com/#feat=serviceworkers)                        | Comment                                                                              |
| ------- | :-------: | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Chrome  | ✔ Working | ✔ Working                                                                             |                                                                                      |
| FireFox | ✔ Working | ✖ Not Working (activate in ESR via Feature Flag or available from Firefox 61 upwards) | There might be a Bug.                                                                |
| Safari  | ✔ Working | ✖ Not Supported yet                                                                   | Service Worker are not available yet: https://bugs.webkit.org/show_bug.cgi?id=174541 |
| Edge    | ✔ Working | ✖ Not Supported (available from Edge Version 17 upwards)                              |                                                                                      |

> We do not support Internet Explorer.

## **:page_with_curl: License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details