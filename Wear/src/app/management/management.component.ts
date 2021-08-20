import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  searchName!: string;
  constructor(private userservice: UserService) {}

  ngOnInit(): void {}
  getAll() {
    console.log(this.searchName);
    if (!this.searchName) {
      this.userservice.getAllUser();
    } else {
      this.userservice.getFilterUser(this.searchName);
    }
  }
}
