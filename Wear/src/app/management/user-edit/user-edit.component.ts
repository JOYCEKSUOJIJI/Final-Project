import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id!: number;
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

  private initForm() {
    let UserId = '';
    let Password = '';
    if (this.editMode) {
      const user = this.userservice.getUser(this.id);
      UserId = user.UserId;
      Password = user.Password;
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
      alert('Edit succssfully!');
    } else {
      this.userservice.addUser(this.userForm.value);
      alert('Add succssfully!');
    }
    console.log(this.userForm);
    this.onCancel();
  }
}
