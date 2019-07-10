import { Component, Input, OnInit } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-interactive-attribute-field',
  templateUrl: './interactive-attribute-field.component.html',
  styleUrls: ['./interactive-attribute-field.component.scss']
})
export class InteractiveAttributeFieldComponent implements OnInit {
  @Input()
  public value: string = '';

  @Input()
  public tel: boolean = false;

  @Input()
  public mailto: boolean = false;

  constructor(private i18n: I18n) {}

  public ngOnInit() {}
}
