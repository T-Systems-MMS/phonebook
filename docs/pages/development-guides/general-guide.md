---
layout: default
title: General Guide
parent: Development Guides
nav_order: 1
---

# :small_red_triangle: General Guide :small_red_triangle:

## **:open_file_folder: Project Structure**

Here can you find the structure of the application. The different parts are described later in the documentation.
It is possible that the structure is not up to date.

```bash
 * Phonebook (Root)
 |-- ci: Some CI specific stuff
 |-- docs: The documentation directory for Jekyll
 |   |-- pages: The documentation pages for the Project
 |-- e2e: End to End Tests
 |-- src: The complete Angular app
 |   |-- app: The Angular sources
 |   |   |-- shared
 |   |   |   |-- models
 |   |   |   |   |-- classes
 |   |   |   |   |-- enumerables
 |   |   |   |-- mocks
 |   |   |   |-- components
 |   |   |   |-- dialogs
 |   |   |-- modules
 |   |   |-- pages
 |   |-- assets: Assets of the app
 |   |-- environments: The Environments the app can be build for
 |   |-- styles: Some global Styles for the app, as well as scss partials
```

## **:triangular_ruler: Code scaffolding**

To generate a new component run:
```bash
ng generate component component-name
```
You can also use:
```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## **:floppy_disk: State Management**

We are using [NGXS](https://github.com/ngxs/store) for transferring states. To get more information how NGXS works and how we use it check out [this link](https://ngxs.gitbook.io/ngxs/).

> Examples about how we use NGXS in the application are in work.

### **How to use Feature Flags**

We are using Feature Flags for faster Development Cycles and easier Code Integration.
If you don't really know what Feature Flags mean take a look at [wikipedia](https://en.wikipedia.org/wiki/Feature_toggle).

There are several states:

```
-1 - Disabled
0 - Disabled by default, but can be enabled by the user
1-99 - A/B Testing (% of the users enabled)
100 - Enabled
```

At the following link can you edit the Feature Flags for [Production](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/assets/defaultFeatureFlags.json) Environment.

To use them InCode you can either subscribe to the [feature-flag.service](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/app/modules/feature-flag/feature-flag.service.ts):

```typescript
// We are using first() in order to automatically cancel the subscription after receiving the first value.
featureFlagService
  .get('flagname')
  .pipe(first())
  .subscribe(isFlagActivated => {
    if (isFlagActivated) {
      // Code that will be executed if the Feature Flag 'flagname' is enabled.
    }
  });
```

or use the [feature-flag.directive](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/app/modules/feature-flag/feature-flag.directive.ts):

```html
<div *featureFlag="'flagname'">
  <!-- This will only be rendered if Feature Flag 'flagname' is enabled. -->
</div>
```

### **Observables**

You should unsubscribe from observables if your component gets destroyed. This can be quite some work. In order to make it easier we have used [a little helper function](https://www.npmjs.com/package/ng2-rx-componentdestroyed):

```typescript
// OnDestroy has to be implemented.
import { Component, OnDestroy, OnInit } from '@angular/core';
// Import the Function to unsubscribe if the Component gets destroyed.
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public ngOnInit() {
    Observable.interval(1000)
      .pipe(
        untilComponentDestroyed(this) // <--- magic is here!
      )
      .subscribe(console.log);
  }
  public ngOnDestroy() {
    // this function has to be in the component, although it can be empty.
  }
}
```
