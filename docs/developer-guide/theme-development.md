# Theme development

> This documentation is for theme developers.

## Get the sample themes

The source code for the prebuild themes you can find [here](https://github.com/angular/material2/tree/master/src/lib/core/theming).
This can you use to get started with your own themes. For colors you can take a look at the [file](https://github.com/angular/material2/blob/master/src/lib/core/theming/_palette.scss)

## Develop your themes

You can follow the [theming guid](https://material.angular.io/guide/theming) from angular materials.

You can write your `scss`by hand or you can produce it via this [tool](https://material.io/tools/color/#!/?view.left=0&view.right=0)

Place here theme under the path `src/styles/themes/{themename}.scss`.
Now add your theme to the `src/styles/themes/themes.sccs`.

> Important: You class name in the `themes.sccs` file must end with `-theme`.

If you are done with your theme and you have test it like it is describted in the [development guide](todo).

Now you must edit the `src/app/pages/settings/settings.component.html`. Look at the other color themes what you must do 😊✌

## Finish with PR

Now open a Pull Request back to master and wait for feedback from the maintainers.
