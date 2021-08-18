import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from './AuthResponseData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdminAuthenticated = false;
  isUserAuthenticated = false;
  user: AuthResponseData = new AuthResponseData();
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale',
      {
        email: email,
        password: password,
      }
    );
  }
  login(email: string, password: string) {
    this.resetUser();
  }

  resetUser(): void {
    this.user.email = '';
    this.user.bearerToken = '';
    this.user.registered = false;
    this.user.expiresIn = '';
    this.user.isAdmin = false;
    this.user.isAuthenticated = false;
    // console.log('security.service, reset: ', this.securityObject);
    localStorage.removeItem('bearerToken');
  }
}
