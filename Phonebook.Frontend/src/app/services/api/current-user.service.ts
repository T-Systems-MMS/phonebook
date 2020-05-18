import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, publishReplay, catchError } from 'rxjs/operators';
import { PersonService } from 'src/app/services/api/person.service';
import { Person } from 'src/app/shared/models';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly currentUserApiUrl =
    runtimeEnvironment.employeePicturesEndpoint + '/user/whoami?version=2';

  private currentUserObjectObservable: Observable<WhoAmIResponse> | null = null;

  private currentUserObservable: Observable<Person | null> | null = null;

  constructor(private httpClient: HttpClient, private personService: PersonService) {}

  private getCurrentUserObject(): Observable<WhoAmIResponse> {
    if (runtimeEnvironment.employeePicturesEndpoint === undefined) {
      return throwError(
        'The runtime variable "EMPLOYEE_PICTURES_ENDPOINT" is not defined. (You can define the variable in the docker container)'
      );
    }
    if (this.currentUserObjectObservable != null) {
      return this.currentUserObjectObservable;
    }

    const observable = this.httpClient
      .get<WhoAmIResponse>(this.currentUserApiUrl, {
        withCredentials: true,
      })
      // this is a workaround for this github issue: https://github.com/ReactiveX/rxjs/issues/2972.
      // The good solution is to upgrade to typescript >2.8 but angular only supports < 2.8.
      .pipe(publishReplay()) as ConnectableObservable<WhoAmIResponse>;
    observable.connect();
    this.currentUserObjectObservable = observable;
    return this.currentUserObjectObservable;
  }

  public getCurrentUserId(): Observable<string> {
    // Take out before merging!
    return of('9305');
    return this.getCurrentUserObject().pipe(
      map((str) => {
        // Userstring Layout is "Domain\\user"
        // This returns just the "user"
        return str.user.toLowerCase().split('\\')[1];
      })
    );
  }

  public getCurrentUser(): Observable<Person | null> {
    if (this.currentUserObservable != null) {
      return this.currentUserObservable;
    }

    const observable = this.getCurrentUserId().pipe(
      mergeMap((userId) => {
        return this.personService.getById(userId);
      }),
      publishReplay()
    );
    (observable as ConnectableObservable<Person>).connect();
    this.currentUserObservable = observable;
    return this.currentUserObservable;
  }

  public doesUserHasImage(): Observable<boolean> {
    return this.getCurrentUserObject().pipe(
      map((whoAmIResponse) => {
        return whoAmIResponse.hasPicture;
      }),
      catchError((err) => of(false))
    );
  }
}

class WhoAmIResponse {
  public user: string;
  public hasPicture: boolean;
}
