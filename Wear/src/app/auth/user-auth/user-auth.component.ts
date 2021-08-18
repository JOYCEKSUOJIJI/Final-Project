import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Component({
  selector: 'app-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObse: Observable<AuthResponseData>;
    // if (this.isLoginMode) {
    //   authObse = this.authservice.login(email, password);
    // } else {
    //   authObse = this.authservice.signup(email, password);
    // }
  }
}
