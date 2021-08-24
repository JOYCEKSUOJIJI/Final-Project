import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/AppUser';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
})
export class AdminAuthComponent implements OnInit {
  isLoading = false;
  error: string = '';
  adminAuthObse!: Subscription;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
