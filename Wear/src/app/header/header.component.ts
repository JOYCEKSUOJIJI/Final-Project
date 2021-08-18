import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = this.authservice.isUserAuthenticated;
  isAdminAuthenticated = false;
  adminAuth = this.authservice.user.subscribe(
    (res) => (this.isAdminAuthenticated = res.IsAdmin)
  );
  // userAuth = this.authservice.user.subscribe(
  //   (res) => (this.isAdminAuthenticated = res.IsAdmin)
  // );

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}

  onLogin() {}

  onLogout() {
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.adminAuth.unsubscribe();
  }
}
