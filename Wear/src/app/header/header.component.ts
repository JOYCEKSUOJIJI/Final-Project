import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // isUserAuthenticated = false;
  // isAdminAuthenticated = false;
  isAuth!: string;
  userName!:string;

  // adminAuth = this.authservice.user.subscribe(
  //   (res) => (this.isAdminAuthenticated = res.IsAdmin)
  // );
  auth = this.authservice.user.subscribe((res) => {
    // console.log(res.IsAdmin);
    if (res.IsAdmin === false && res.IsLogin === false) {
      this.isAuth = 'visitor';
    } else if (res.IsAdmin === true && res.IsLogin === true) {
      this.isAuth = 'admin';
    } else if(res.IsAdmin === false && res.IsLogin === true){
      this.isAuth = 'user';
    }
    this.userName = res.UserId;
  });
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
    // this.auth.unsubscribe();
  }
}
