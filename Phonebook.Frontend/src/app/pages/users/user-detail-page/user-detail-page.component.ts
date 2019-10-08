import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Person } from 'src/app/shared/models';
import { AddToLastPersons, IncrementCommonPerson } from 'src/app/shared/states';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  public person: Person = Person.empty();

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  public ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.person = data.user;
      this.store.dispatch(new IncrementCommonPerson(this.person));
      this.store.dispatch(new AddToLastPersons(this.person));
    });
  }

  public ngOnDestroy() { }
}
