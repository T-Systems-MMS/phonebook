import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { BookmarksState } from 'src/app/shared/states';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasBookmarksGuard implements CanActivate {
  constructor(private store: Store, private currentUserService: CurrentUserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.currentUserService.getCurrentUser().pipe(
      map((user) => {
        if (user != null && !this.store.selectSnapshot(BookmarksState.hasBookmarks)) {
          return this.router.parseUrl('/dashboard/team');
        }
        return true;
      }),
      catchError((error) => {
        return of(true);
      })
    );
  }
}
