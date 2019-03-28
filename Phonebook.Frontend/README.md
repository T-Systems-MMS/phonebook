[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# The Phonebook

This is a community project for us, from us. Everybody is welcome to participate. For a quick start guide [click here](docs/welcome.md)

It displays People, Rooms and the organization structure.

This is project is leveraging [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/) for fronted. The backend is realized with [Traefik](https://traefik.io/), [Nginx](https://www.nginx.com/) and [Docker](https://www.docker.com/).

## Supported Browsers

| Browser |  Support  | [Offline Capability](https://caniuse.com/#feat=serviceworkers)                        | Comment                                                                              |
| ------- | :-------: | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Chrome  | ✔ Working | ✔ Working                                                                             |                                                                                      |
| FireFox | ✔ Working | ✖ Not Working (activate in ESR via Feature Flag or available from Firefox 61 upwards) | There might be a Bug.                                                                |
| Safari  | ✔ Working | ✖ Not Supported yet                                                                   | Service Worker are not available yet: https://bugs.webkit.org/show_bug.cgi?id=174541 |
| Edge    | ✔ Working | ✖ Not Supported (available from Edge Version 17 upwards)                              |                                                                                      |

> We do not support Internet Explorer!
