import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth!: string;
  userName!: string;
  auth!: Subscription;
  ngOnInit(): void {
    this.auth = this.authservice.user.subscribe((res) => {
      console.log(res.IsAdmin);
      if (res.IsAdmin === false && res.IsLogin === false) {
        this.isAuth = 'visitor';
      } else if (res.IsAdmin === true && res.IsLogin === true) {
        this.isAuth = 'admin';
      } else if (res.IsAdmin === false && res.IsLogin === true) {
        this.isAuth = 'user';
      }
      this.userName = res.UserId;
    });
  }

  constructor(private authservice: AuthService) {}

  onLogout() {
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.auth.unsubscribe();
  }
}
