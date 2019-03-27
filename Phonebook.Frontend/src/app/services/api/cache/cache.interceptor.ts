import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req);
        return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
    }

    public sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
        cache: CacheService): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    cache.put(req, event);
                }
            })
        );
    }
}
