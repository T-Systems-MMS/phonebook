import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PersonService } from 'src/app/services/api/person.service';
import { Person } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserDetailPageResolver implements Resolve<Person> {
  constructor(private personSearchService: PersonService, private snackBar: MatSnackBar, private i18n: I18n) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person> {
    const personId = route.paramMap.get('id');
    if (personId) {
      return this.personSearchService.getById(personId).pipe(
        map(person => {
          if (person == null) {
            throw new Error();
          } else {
            return person;
          }
        }),
        catchError(err => {
          this.snackBar.open(
            this.i18n({
              meaning: 'UserDetailPageResolver',
              description: 'First part of the message displayed when a user is not found',
              id: 'UserDetailPageResolverNotFoundFirstPart',
              value: 'User with Id'
            }) +
              ' "' +
              personId +
              '" ' +
              this.i18n({
                meaning: 'UserDetailPageResolver',
                description: 'Second part of the message displayed when a user is not found',
                id: 'UserDetailPageResolverNotFoundSecondPart',
                value: 'not found.'
              }),
            '',
            { duration: 3000 }
          );
          return throwError(err);
        })
      );
    } else {
      return throwError(`UserDetailPageResolver: "id" is ${personId}`);
    }
  }
}
