import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // users!: User[];
  users: User[] = [];
  isEmpty = false;
  isLoading = false;
  subOfSearch!: Subscription;
  subOfChange!: Subscription;
  constructor(
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.userservice.getUsers().subscribe(res => {
      this.users = res;
      this.isLoading = false;
    });
    this.subOfSearch = this.userservice.usersChanged.subscribe((res) => {
      if (res.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.users = res;
      }
    });
  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subOfSearch.unsubscribe();
    // this.subOfChange.unsubscribe();
    // this.auth.unsubscribe();
  }
}
