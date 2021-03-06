import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { AppUser } from '../../shared/AppUser';
import { Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<AppUser>(new AppUser('', '', '', false, false));
  constructor(private http: HttpClient, private router: Router) {}

  //user signup
  signup(email: string, password: string) {
    return this.http
      .put(
        'https://awsf17k2j1.execute-api.us-east-1.amazonaws.com/default/userSignup',
        {
          UserId: email,
          Password: password,
        }
      )
      .pipe(
        catchError(this.signUpHandleError),
        tap((resData) => {
          console.log(resData);
        })
      );
  }

  //admin login
  adminLogin(email: string, password: string) {
    this.resetUser();
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
          const res: any = jwt_decode(token); //decode token
          this.handleAuthentication(
            //generate new BehaviorSubject
            res.UserId,
            res.iat,
            token,
            res.IsAdmin,
            true
          );
          console.log('get data from back end: ', token);
          return {
            UserId: res.UserId,
            iat: res.iat,
            token: token,
            IsAdmin: res.IsAdmin,
            IsLogin: true,
          };
        })
      );
  }

  //userlogin
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
        })
      );
  }

  //logout reset user and remove token from localstorage
  logout() {
    this.user.next(new AppUser('', '', '', false, false));
    this.router.navigate(['/user-auth']);
    localStorage.removeItem('bearerToken');
  }

  resetUser(): void {
    localStorage.removeItem('bearerToken');
  }

  private handleAuthentication(
    UserId: string,
    iat: string,
    token: string,
    IsAdmin: boolean,
    IsLogin: boolean
  ) {
    const user = new AppUser(UserId, iat, token, IsAdmin, IsLogin);
    this.user.next(user);
    localStorage.setItem('bearerToken', token);
  }

  //authrization error handler for both admin and user
  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
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
  }

  //signup error handler
  private signUpHandleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'UserId already exist':
        errorMessage = 'UserId already exist, Please Login!';
        break;
      default:
        errorMessage = 'Unknown error occurred!';
    }
    return throwError(errorMessage);
  }
}
