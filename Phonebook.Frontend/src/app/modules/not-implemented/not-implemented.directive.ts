import { Directive, HostListener } from '@angular/core';
import { NotImplementedService } from 'src/app/modules/not-implemented/not-implemented.service';

@Directive({ selector: '[notImplemented]' })
export class NotImplementedDirective {
  constructor(
    private notImplementedService: NotImplementedService
  ) { }

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    this.notImplementedService.notImplemented();
  }

}
