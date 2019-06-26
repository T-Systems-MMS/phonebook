# Theme Guide

We are using Angular Material 2 as Main Theme

To use mixins from the themes use this as a reference:
https://github.com/angular/material2/blob/877de5691b8dd755af4a2f77b4cf57f2d374e107/src/lib/core/theming/_palette.scss
Use this Guide: https://medium.com/@tomastrajan/the-complete-guide-to-angular-material_themes-4d165a9d24d1

## Typography

https://material.angular.io/guide/typography

Get the Files frome here: https://google-webfonts-helper.herokuapp.com/fonts/roboto?subsets=cyrillic,greek,greek-ext,cyrillic-ext,vietnamese,latin,latin-ext

## Classes

`pb-spacer` uses all the space given to him. Use it if you want to make room in between to `<div>`.
`pb-cursor` activates the mouse cursor.

## Media Queries

Media Queries are defined in [media-queries.scss](../src/styles/media-queries.scss) as Mixins, they are also defined as classes. You can feel free to use either of them. There is no other framework for managing media queries.
