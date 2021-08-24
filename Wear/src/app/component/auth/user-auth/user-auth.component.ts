import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  authObse!: Subscription;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObse: Observable<any>;
    if (this.isLoginMode) { //check login mode or signup mode
      authObse = this.authservice.userLogin(email, password);
    } else {
      authObse = this.authservice.signup(email, password);
    }
    authObse.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        if (response === 'Successfully signup!') {
          alert('Successfully SignUp!');
          this.router.navigate(['/user-auth']);
        } else {
          this.router.navigate(['/products']);
        }
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
