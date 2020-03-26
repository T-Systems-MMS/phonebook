import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/shared/models';

@Component({
  selector: 'app-user-list-card',
  templateUrl: './user-list-card.component.html',
  styleUrls: ['./user-list-card.component.scss']
})
export class UserListCardComponent {
  @Input() public person: Person;
  @Input() public actionButtonIcon: string;
  @Input() public actionButtonClasses: string;
  @Output() public actionButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  public buttonClicked() {
    this.actionButtonClicked.emit();
  }
}