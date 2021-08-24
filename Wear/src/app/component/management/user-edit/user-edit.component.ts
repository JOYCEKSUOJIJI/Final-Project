import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../../shared/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id!: number;
  user!:User;
  editMode = false;
  // errorListener!: Subscription;
  userForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    let UserId = '';
    let Password = '';
    if (this.editMode) {
      this.user = this.userservice.getUser(this.id);
      UserId = this.user.UserId;
      Password = this.user.Password;
    }

    this.userForm = new FormGroup({
      UserId: new FormControl(UserId, [Validators.required]),
      Password: new FormControl(Password, Validators.required),
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      this.userservice.updateUser(this.id, this.userForm.value);
    } else {
      this.userservice.addUser(this.userForm.value);
      alert('Add succssfully!');
    }
    console.log(this.userForm);
    this.onCancel();
  }
}
