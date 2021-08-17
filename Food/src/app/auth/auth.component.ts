import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObse: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObse = this.authservice.login(email, password);
    } else {
      authObse = this.authservice.signup(email, password);
    }
    authObse.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false; //put above error type check in the auth service by using pipe catcherror
      }
    );
    form.reset();
  }
}
