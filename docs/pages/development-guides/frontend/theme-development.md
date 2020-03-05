---
layout: default
title: Theme Development
parent: Frontend
grand_parent: Development Guides
nav_order: 500
---

# :bar_chart: **Theme development**

> This page refers to poeple who want to develope and design themes.

A good Guide about Material Theming can be found [here](https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1).

## **About Typography**

[Angular Typography](https://material.angular.io/guide/typography)

If you need the files you can get them from [here](https://google-webfonts-helper.herokuapp.com/fonts/roboto?subsets=cyrillic,greek,greek-ext,cyrillic-ext,vietnamese,latin,latin-ext).

## **About Classes**

`pb-spacer` uses all the space given to him. Use it if you want to make room in between to `<div>`.

`pb-cursor` activates the mouse cursor.

## **Media Queries**

Media Queries are defined in [media-queries.scss](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/styles/media-queries.scss) as Mixins, they are also defined as classes. You can feel free to use either of them. There is no other framework for managing media queries.

## **Get the sample themes**

The source code for the prebuild themes can be found [here](https://github.com/angular/components/tree/877de5691b8dd755af4a2f77b4cf57f2d374e107/src/lib/core/theming/prebuilt).
ou can use them to get started with your own themes. For colors, you can take a look at this [file](https://github.com/angular/components/blob/877de5691b8dd755af4a2f77b4cf57f2d374e107/src/lib/core/theming/_palette.scss)

## **Develop your themes**

You can follow the [theming guide](https://material.angular.io/guide/theming) from angular materials.

You can write your `scss` by hand or you can produce it via this [tool](https://material.io/tools/color/#!/?view.left=0&view.right=0).

Place your theme under the path `src/styles/themes/{themename}.scss`.
Now add your theme to the `src/styles/themes/themes.sccs`.

> Important: You class name in the `themes.sccs` file must end with `_theme`.

If you are done with your theme and have to test it set up the project as described in [getting started](/phonebook/pages/development-guides/frontend/getting-started) or just contact a contributer of the project. There will be someone who can test it for you.

Now you must insert your new Theme in `\src\app\shared\models\enumerables\Theme.ts` like the other ones.
You also must edit the `src/app/pages/settings/settings.component.ts`.

There you need to add your theme like the code here:
```js
      case Theme.magenta_light_theme: {
        return this.i18n({
          value: 'Magenta Light Theme',
          description: 'Color Theme Option: Magenta Light',
          id: 'SettingsComponentColorThemeMagentaLight',
          meaning: 'SettingsComponent'
        });
      }
```

Don't forget to run `npm run extract-i18n` for the internationalization. More information about you can find [here](/phonebook/pages/development-guides/frontend/translation-guide).

## **:tada: Finish with Pull Request :tada:**

If you finished and everything works you can open a pull request and wait for feedback from the maintainers.
To set up a pull request follow the described steps [here](/phonebook/pages/development-guides/).
