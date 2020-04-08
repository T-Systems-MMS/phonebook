import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  public defaultPath: string = '/';

  constructor(private store: Store, private currentUserService: CurrentUserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.currentUserService.getCurrentUser().pipe(
      map((user) => {
        if (user === null) {
          return this.router.parseUrl(next.data.guard.redirectTo || this.defaultPath);
        }
        return true;
      }),
      catchError((error) => {
        return of(this.router.parseUrl(next.data.guard.redirectTo || this.defaultPath));
      })
    );
  }
}
