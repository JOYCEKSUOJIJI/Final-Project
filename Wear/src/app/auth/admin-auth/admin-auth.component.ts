import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../AuthResponseData';
import jwt_decode from 'jwt-decode';
import { AppUser } from '../AppUser';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
})
export class AdminAuthComponent implements OnInit {
  isLoading = false;
  error: string = '';
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let adminAuthObse: Observable<AppUser>;
    adminAuthObse = this.authservice.adminLogin(email, password);
    adminAuthObse.subscribe(
      (response) => {
        console.log('here is in admin-auth');
        console.log(response);
        this.isLoading = false;
        this.authservice.isAdminAuthenticated = true;
        this.router.navigate(['/products']);
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
