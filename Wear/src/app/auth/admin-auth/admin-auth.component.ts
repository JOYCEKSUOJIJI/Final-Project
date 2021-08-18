import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../AuthResponseData';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
})
export class AdminAuthComponent implements OnInit {
  hide = true;
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
