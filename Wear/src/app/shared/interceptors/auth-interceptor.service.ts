import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// add token everytime send http request

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way...');
    const token = localStorage.getItem('bearerToken');
    if (token) {
      console.log('from interceptor: ', token);
      const modifiedReq = req.clone({
        headers: req.headers.set('authorizationToken', token),
      });
      console.log('from interceptor: ', modifiedReq);
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}
