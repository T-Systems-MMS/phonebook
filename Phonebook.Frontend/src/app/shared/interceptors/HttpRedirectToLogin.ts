import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { LoginHelper } from 'src/app/shared/login/login.helper';

@Injectable({ providedIn: 'root' })
export class HttpRedirectToLogin implements HttpInterceptor {
  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    LoginHelper.EnsureRedirectToLogin();
    return next.handle(req);
  }
}
