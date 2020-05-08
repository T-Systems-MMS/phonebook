import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpRedirectToLogin implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((d) => {
        if (d instanceof HttpResponse && d.status == 401 && d.headers.has('Location')) {
          const location = d.headers.get('Location') as string;
          window.location.replace(location);
          return d;
        } else {
          return d;
        }
      }),
      catchError((err, d) => {
        if (err instanceof HttpErrorResponse && err.status == 401 && err.headers.has('Location')) {
          const location = err.headers.get('Location') as string;
          window.location.replace(location);
        }
        return throwError(err);
      })
    );
  }
}
