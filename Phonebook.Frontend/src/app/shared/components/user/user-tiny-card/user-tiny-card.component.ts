import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/shared/models';

@Component({
  selector: 'app-user-tiny-card',
  templateUrl: './user-tiny-card.component.html',
  styleUrls: ['./user-tiny-card.component.scss']
})
export class UserTinyCardComponent {
  @Input()
  public person: Person;
  @Input()
  public actionButtonIcon: string;
  @Input()
  public actionButtonClasses: string;
  @Output()
  public actionButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  public buttonClicked() {
    this.actionButtonClicked.emit();
  }
}
