import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';

@Directive({ selector: '[featureFlag]' })
export class FeatureFlagDirective implements OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureFlagService: FeatureFlagService
  ) {}

  @Input() set featureFlag(flag: string) {
    this.featureFlagService
      .get(flag)
      .pipe(untilComponentDestroyed(this))
      .subscribe((val) => {
        if (val) {
          // If condition is true add template to DOM
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          // Else remove template from DOM
          this.viewContainer.clear();
        }
      });
  }

  public ngOnDestroy() {}
}
