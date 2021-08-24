import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isEmpty = false;
  isLoading = false;
  subOfSearch!: Subscription;
  subOfAll!: Subscription;

  constructor(
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //get all users information when init management user page
  ngOnInit(): void {
    this.isLoading = true;
    this.subOfAll = this.userservice.getUsers().subscribe(res => {
      this.users = res;
      this.isLoading = false;
    });

    //listen change on users list from userservice
    this.subOfSearch = this.userservice.usersChanged.subscribe((res) => {
      if (res.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.users = res;
      }
    });
  }

  //add new users
  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subOfAll.unsubscribe();
    this.subOfSearch.unsubscribe();
  }
}
