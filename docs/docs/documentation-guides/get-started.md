---
layout: default
title: Documentation Guide
nav_order: 5
permalink: /docs/documentation-guides/get-started
---

# :book: Documentation Guide

This guide should give all information you need to maintain the documentation of the project.


If you only want to change some text files you just need to follow the steps from [here](/docs/development-guides/contribution), change the files you like and make a pull request.

If you want to setup the project locally, to view the changes and do other stuff you need to follow the Getting Started Guide below.


## **Getting Started**
{{site.coming_soon}}

## **Variables**
Jekyll gives us the chance to save variables in the `_config.yml` file and use them on different parts of the page.

### **How to use?**
- Define a Variable in your `_config.yml`
e.g.:
```
coming_soon: "> :gear: Coming soon.."
```

- You can call her like `{ {site.coming_soon} }` WITHOUT the blanks.

- The Output will be {{site.coming_soon}}