---
layout: default
title: Documentation Guide
nav_order: 5
permalink: /pages/documentation-guides/get-started
---

# :book: Documentation Guide

This guide should give all the information needed to maintain the documentation of the project.


If you only want to change some text files you just need to follow the steps from [here](/pages/development-guides/contribution), change the files you like and make a pull request.

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

- You can call the variable like this `{% raw %}{{site.coming_soon}}{% endraw %}`.

- The Output will be {{site.coming_soon}}