import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, mergeMap, publishReplay } from 'rxjs/operators';
import { PersonService } from 'src/app/services/api/person.service';
import { Person } from 'src/app/shared/models';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly currentUserApiUrl = runtimeEnvironment.employeePicturesEndpoint + '/user/whoami';

  private currentUserNameObservable: Observable<string> | null = null;
  private currentUserObservable: Observable<Person | null> | null = null;

  constructor(private httpClient: HttpClient, private personService: PersonService) {}

  public getCurrentUserId(): Observable<string> {
    if (this.currentUserNameObservable != null) {
      return this.currentUserNameObservable;
    }

    const observable = this.httpClient
      .get<string>(this.currentUserApiUrl, {
        withCredentials: true
      })
      .pipe(
        map(str => {
          // Userstring Layout is "Domain\\user"
          // This returns just the "user"
          return str.toLowerCase().split('\\')[1];
        }),
        publishReplay()
      ) as ConnectableObservable<string>; // this is a workaround for this github issue: https://github.com/ReactiveX/rxjs/issues/2972. The good solution is to upgrade to typescript >2.8 but angular only supports < 2.8.
    observable.connect();
    this.currentUserNameObservable = observable;
    return this.currentUserNameObservable;
  }
  public getCurrentUser(): Observable<Person | null> {
    if (this.currentUserObservable != null) {
      return this.currentUserObservable;
    }

    const observable = this.getCurrentUserId().pipe(
      mergeMap(userId => {
        return this.personService.getById(userId);
      }),
      publishReplay()
    );
    (observable as ConnectableObservable<Person>).connect();
    this.currentUserObservable = observable;
    return this.currentUserObservable;
  }
}
