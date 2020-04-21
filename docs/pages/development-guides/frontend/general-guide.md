---
layout: default
title: General Guide
has_parent: true
parent: Frontend
grand_parent: Development Guides
nav_order: 200
---

# :small_red_triangle: **General Frontend Guide**

## :open_file_folder: **Project Structure**

Here you can find the structure of `Phonebook.Frontend`.

```bash
 * Phonebook.Frontend (Root)
 |-- e2e: End to End Tests
 |-- nginx: Configurations for the Nginx Docker Container
 |-- node_modules: Contains libraries downloaded from npm; is created automatically based on package.json
 |-- src: The complete Angular app
 |   |-- app: The Angular sources
 |   |   |-- pages: Main Views of the Application
 |   |   |-- modules: Modular features which can be used on different pages
 |   |   |-- shared: Contains Code that will be used across the app, as well states
 |   |   |-- services: Directory for all services
 |   |-- assets: Assets of the app
 |   |-- environments: The Environments the app can be build for
 |   |-- styles: Some global Styles for the app, as well as scss partials
 |   |-- fonts: Different font stlyes for the app
 |   |-- i18n: Internationalized messages
 |   |-- migration: Frontend Migration-Scripts
```

## **:triangular_ruler: Code scaffolding**

To generate a new component run:

```bash
ng generate module component-name
ng generate component component-name
```

> This will generate a new module and a new component. Be sure that you're in the directory where you want to generate

You can also use:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## :floppy_disk: **State Management**

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

[Here you can edit](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/assets/defaultFeatureFlags.json) the Feature Flags of the Phonebook.

To use them InCode you can either subscribe to the [feature-flag.service](https://github.com/T-Systems-MMS/phonebook/blob/master/Phonebook.Frontend/src/app/modules/feature-flag/feature-flag.service.ts):

```typescript
// We are using first() in order to automatically cancel the subscription after receiving the first value.
featureFlagService
  .get('flagname')
  .pipe(first())
  .subscribe((isFlagActivated) => {
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
  styleUrls: ['./example.component.scss'],
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
