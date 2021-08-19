import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponseData } from './AuthResponseData';
import jwt_decode from 'jwt-decode';
import { AppUser } from './AppUser';
import { Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdminAuthenticated = false;
  isUserAuthenticated = false;
  user = new BehaviorSubject<AppUser>(new AppUser('', '', '', false, false));
  // user: AuthResponseData = new AuthResponseData();
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post(
      'https://1ab94lkku3.execute-api.us-east-1.amazonaws.com/default/usersginup',
      {
        UserId: email,
        Password: password,
      }
    );
  }

  adminLogin(email: string, password: string) {
    // this.resetUser();
    return this.http
      .post<string>(
        'https://1ab94lkku3.execute-api.us-east-1.amazonaws.com/default/adminLogin',
        {
          UserId: email,
          Password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        map((token) => {
          const res: any = jwt_decode(token);
          // Object.assign(this.user, res);
          this.handleAuthentication(
            res.UserId,
            res.iat,
            token,
            res.IsAdmin,
            true
          );
          console.log('get data from back end: ', token);
          console.log(res);
          console.log(typeof res.IsAdmin);
          return {
            UserId: res.UserId,
            iat: res.iat,
            token: token,
            IsAdmin: res.IsAdmin,
            IsLogin: true,
          };
          // localStorage.setItem('bearerToken', token);
          // console.log('isAdmin: ', token);
        })
      );
  }

  userLogin(email: string, password: string) {
    return this.http
      .post<string>(
        'https://d75asl7buh.execute-api.us-east-1.amazonaws.com/default/userLogin',
        {
          UserId: email,
          Password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        map((token) => {
          const res: any = jwt_decode(token);
          // Object.assign(this.user, res);
          this.handleAuthentication(
            res.UserId,
            res.iat,
            token,
            res.IsAdmin,
            true
          );
          console.log('get data from back end: ', token);
          console.log(res);
          return {
            UserId: res.UserId,
            iat: res.iat,
            token: token,
            IsAdmin: res.IsAdmin,
            IsLogin: true,
          };
          // localStorage.setItem('bearerToken', token);
          // console.log('isAdmin: ', token);
        })
      );
  }

  logout() {
    this.user.next(new AppUser('', '', '', false, false));
    this.router.navigate(['/user-auth']);
    localStorage.removeItem('bearerToken');
    // if (this.tokenExpirationTimer) {
    //   clearTimeout(this.tokenExpirationTimer);
    // }
    // this.tokenExpirationTimer = null;
  }

  // autoLogOut(expirationDuration: number) {
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);
  // }

  resetUser(): void {
    // this.user.UserId = '';
    // this.user.IsAdmin = false;
    // this.user.iat = '';
    // console.log('security.service, reset: ', this.securityObject);
    localStorage.removeItem('bearerToken');
  }

  private handleAuthentication(
    UserId: string,
    iat: string,
    token: string,
    IsAdmin: boolean,
    IsLogin: boolean
  ) {
    // const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new AppUser(UserId, iat, token, IsAdmin, IsLogin);
    this.user.next(user);
    // this.autoLogOut(+expiresIn * 1000);
    localStorage.setItem('bearerToken', token);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Account does not exist':
        errorMessage = 'This email is incorrect!';
        break;
      case 'Password is invalid':
        errorMessage = 'This password is not correct!';
        break;
      default:
        errorMessage = 'Unknown error occurred!';
    }
    return throwError(errorMessage);
    // errorMessage = 'an error occurred!';
  }
}
