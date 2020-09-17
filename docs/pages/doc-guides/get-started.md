---
layout: default
title: Documentation Guides
nav_order: 500
permalink: /pages/doc-guides/
---

# :book: **Documentation Guide**

This guide should give all the information needed to maintain the documentation of the project.

If you only want to change some text files you just need to follow the steps from [here](/phonebook/pages/development-guides/), change the files you like and make a pull request.

If you want to setup the project locally, to view the changes and do other stuff you need to follow the Getting Started Guide below.

## :small_red_triangle: **Getting Started**

Just launch `docker-compose up` in the directory `docs` and visit [http://localhost:4000](http://localhost:4000).

> If you are behind a corporate proxy you will need to start the docker antiproxy.

## :open_file_folder: **Structure**

```bash
 * docs
 |-- pages: All documents
 |   |-- development-guides
 |   |   |-- frontend: All frontend related docs
 |   |   |-- backend: All backend related docs
 |   |   |-- media: Media files for docs in this directory
 |   |   |-- general-guide.md: General Guide for development
 |   |-- infrastructure-guides
 |   |-- doc-guides: Guides about the document the project
 |   |-- user-docs: Just user related documents
 |   |-- changelog.md: Link to the current changelog
 |   |-- 404 Page
 |-- assets/js: Data to use the search bar
 |-- _sass/custom: Custom css files
 |-- index.md: Start page for GitHub Pages
 |-- gemfile: Includes all necessary gems
 |-- _config.yml: Config file for Jekyll
```

## **Variables**

Jekyll gives us the chance to save variables in the `_config.yml` file and use them on different parts of the page.

### **How to use?**

- Define a Variable in your `_config.yml`
  e.g.:

  ```yml
  coming_soon: '> :gear: Coming soon..'
  ```

- You can call the variable like this `{% raw %}{{site.coming_soon}}{% endraw %}`.

- The Output will be {{site.coming_soon}}
