import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PersonService } from 'src/app/services/api/person.service';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material';
import { IncrementCommonPerson, AddToLastPersons } from 'src/app/shared/states';
import { Person } from 'src/app/shared/models';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit, OnDestroy {
  public person: Person = Person.empty();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personSearchService: PersonService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.route.paramMap.pipe(untilComponentDestroyed(this)).subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id != null) {
        this.personSearchService.getById(id).subscribe(user => {
          if (user == null) {
            this.router.navigate(['/']);
            this.snackBar.open('User with Id "' + id + '" not found.', '', { duration: 3000 });
          } else {
            this.person = user;
            this.store.dispatch(new IncrementCommonPerson(this.person));
            this.store.dispatch(new AddToLastPersons(this.person));
          }
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy() {}
}
