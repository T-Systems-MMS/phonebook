import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  public ngOnInit() {}
}
