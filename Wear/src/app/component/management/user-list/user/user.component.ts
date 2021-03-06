import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  //data input from user-list
  @Input() user!: User;
  @Input() index!: number;
  constructor() {}

  ngOnInit(): void {}
}
