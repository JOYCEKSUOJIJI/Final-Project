import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdminAuthenticated = this.authservice.isAdminAuthenticated;
  isUserAuthenticated = this.authservice.isUserAuthenticated;
  constructor(private authservice: AuthService) {}

  ngOnInit(): void {}

  onLogin() {}
}
