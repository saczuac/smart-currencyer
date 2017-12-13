import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.token != null) {
            const authReq = req.clone({headers: req.headers.set('Authorization', ' JWT ' + localStorage.token)});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
}