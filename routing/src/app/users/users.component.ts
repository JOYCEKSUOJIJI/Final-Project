import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users = [
    { name: 'bob', id: 1 },
    { name: 'ana', id: 2 },
    { name: 'qoq', id: 3 },
    { name: 'ror', id: 4 },
    { name: 'tot', id: 5 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
