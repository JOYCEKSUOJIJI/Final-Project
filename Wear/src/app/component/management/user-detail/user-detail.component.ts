import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  id!: number;
  isAuth!: boolean;
  constructor(
    private authservice: AuthService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.user = this.userservice.getUser(this.id);
      if (!this.user) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
    this.userservice.usersChanged.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  onEditUser() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteUser() {
    this.userservice.deleteUser(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    alert('Delete Successfully!');
  }
}
