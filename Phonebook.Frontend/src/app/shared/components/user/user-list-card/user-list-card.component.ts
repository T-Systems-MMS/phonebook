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
  public displayListCard(): string {
    const maxWidth = 25;
    // Everything is not longer than the cards width, so display everything
    let displayString = `${this.person.Title} ${this.person.Firstname} ${this.person.Surname} (${this.person.Id})`;
    if (displayString.length < maxWidth) {
      return displayString;
    }
    // Without the title
    displayString = `${this.person.Firstname} ${this.person.Surname} (${this.person.Id})`;
    if (displayString.length < maxWidth) {
      return displayString;
    }
    // Without title and surname
    displayString = `${this.person.Firstname} (${this.person.Id})`;
    if (displayString.length < maxWidth) {
      return displayString;
    }
    // Just the id
    return this.person.Id;
  }
}
