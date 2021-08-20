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
  subOfSearch!: Subscription;
  subOfChange!: Subscription;
  constructor(
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.users = this.userservice.getUsers();
    this.subOfSearch = this.userservice.userSearchChanged.subscribe((res) => {
      if (!res) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.users = res;
      }
    });

    this.subOfChange = this.userservice.usersChanged.subscribe(
      (products: User[]) => {
        this.users = products;
      }
    );
  }

  onNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subOfSearch.unsubscribe();
    this.subOfChange.unsubscribe();
    // this.auth.unsubscribe();
  }
}
