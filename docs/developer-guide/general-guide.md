# General Guide

## Project Structure

```bash
 * Phonebook (Root)
 |-- ci: Some CI specific stuff
 |-- docs: The documentation of the project
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

## Work Flow

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

1. Create a new Branch
2. Make some changes and develop a cool new feature or fix a Bug.
3. In order to commit run `npm run commit` in to run the interactive Commit utility.

[![npm run commit image](/docs/assets/images/git-cz.png)]

4. Create a Pull Request from your Branch.
5. Wait for approval from one of the maintainers.

## Style Guides

- [CSS Style Guide](/docs/developer-guide/css-guide.md)
- This document ;)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### State Management

We are using [NGXS](https://github.com/ngxs/store) for transferring states.

### How to use Feature Flags

We are using Feature Flags for faster Development Cycles and easier Code Integration. \
There are several states:

```
-1 - Disabled
0 - Disabled by default, but can be enabled by the user
1-99 - A/B Testing (% of the users enabled)
100 - Enabled
```

You can edit the feature Flags for [Development](src/assets/defaultFeatureFlagsDev.json) and [Production](src/assets/defaultFeatureFlags.json) Environment separately.

To use them InCode you can either subscribe to the [feature-flag.service](src/app/services/feature-flag.service.ts):

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

or use the [feature-flag.directive](src/app/common/feature-flag.directive.ts):

```html
<div *featureFlag="'flagname'">
  <!-- This will only be rendered if Feature Flag 'flagname' is enabled. -->
</div>
```

### Observables

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

## Refactoring Work still to do:

- Ordering Components folder structure and make them into Modules.
- Use [immer](https://github.com/mweststrate/immer) for better state management.
