---
layout: default
title: Good to know
nav_order: 5
has_children: true
nav_exclude: true
---

# :small_red_triangle: Good to know :small_red_triangle:

## Current Bugs and Workarounds in this Projects

### Starting the app

### undefined is not a function

This has to do with angular Lazy Loading Modules: https://github.com/angular/angular-cli/issues/9825
If there is an Error on the first time Building the bundle the error: `undefined is not a Function` will be thrown with no link to any files.

#### Workaround

Fix the error and restart the build
