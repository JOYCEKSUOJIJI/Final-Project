import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from './shared/AppUser';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/user.model';
import jwt_decode from 'jwt-decode';
import { AuthResponseData } from './shared/AuthResponseData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Wear';
  showFiller = false;
  user = new BehaviorSubject<AppUser>(new AppUser('', '', '', false, false));
  constructor(private authservice: AuthService) {
    this.user = this.authservice.user;
  }
  ngOnInit(): void {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      const userInfo: AuthResponseData = jwt_decode(token);
      console.log('root component, ', userInfo);

      const newUser = new BehaviorSubject<AppUser>(
        new AppUser(
          userInfo.UserId,
          userInfo.iat,
          token,
          userInfo.IsAdmin,
          true
        )
      );
      this.authservice.user = newUser;
      this.user = newUser;
    }
  }
}
