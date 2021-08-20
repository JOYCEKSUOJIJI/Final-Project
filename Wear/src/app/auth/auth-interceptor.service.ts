import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way...');
    const token = localStorage.getItem('authorizationToken');
    if (token) {
      console.log('from interceptor: ', token);
      const modifiedReq = req.clone({
        headers: req.headers.set('authorizationToken', token),
      });
      console.log('from interceptor: ', modifiedReq);
      return next.handle(modifiedReq).pipe(
        catchError((error) => {
          console.log('from interceptor: ', error.error);
          return of(null);
        })
      );

      // return next.handle(modifiedReq);
    } else {
      return next.handle(req).pipe(
        catchError((err) => {
          console.log('from interceptor: ', err.error);
          return of(err);
        })
      );
    }
    // return next.handle(req);
  }
}
