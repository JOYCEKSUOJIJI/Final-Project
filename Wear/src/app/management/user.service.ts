import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl =
    'https://n0pg9e4dwa.execute-api.us-east-1.amazonaws.com/default/usermanagement';
  users: User[] = [
    new User('123@ufl.edu', '1234'),
    new User('1234@ufl.edu', '12345'),
  ];
  // userSearchChanged = new Subject<User[]>();
  usersChanged = new Subject<User[]>();
  errorChanged = new Subject<string>();
  userToken!: string;
  UserId!: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  adminuser = this.authservice.user.subscribe((res) => {
    this.userToken = res.token;
    this.UserId = res.UserId;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'authorizationToken',
      `${this.userToken}`
    );
    console.log(this.httpOptions);
  });
  constructor(private http: HttpClient, private authservice: AuthService) {}

  getAllUser() {
    this.http.get<any[]>(this.baseUrl, this.httpOptions).subscribe((data) => {
      this.users = data;
      console.log(this.users);
      return this.usersChanged.next(this.users.slice());
    });
  }
  getFilterUser(searchName: string) {
    this.http
      .get<any[]>(
        [this.baseUrl, '?key=', `${searchName}`].join(''),
        this.httpOptions
      )
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
        return this.usersChanged.next(this.users.slice());
      });
  }

  getUsers() {
    this.http.get<any[]>(this.baseUrl, this.httpOptions).subscribe((res) => {
      this.users = res;
    });
    return this.http.get<any[]>(this.baseUrl, this.httpOptions);
  }
  getUser(index: number) {
    return this.users.slice()[index];
  }
  addUser(newUser: User) {
    this.http
      .put(
        this.baseUrl,
        { UserId: newUser.UserId, Password: newUser.Password },
        this.httpOptions
      )

      .subscribe(
        (response) => {
          console.log(response);
          this.users.push(newUser);
          this.usersChanged.next(this.users.slice());
        },
        (err) => {
          console.log(err.error);
          this.errorChanged.next(err.error);
        }
      );
  }

  updateUser(index: number, newUser: User) {
    this.http
      .post(this.baseUrl, { readyItem: newUser }, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.users[index] = newUser;
        console.log(newUser);
        this.usersChanged.next(this.users.slice());
      });
  }

  deleteUser(index: number) {
    let targetUserId = this.users[index].UserId;
    console.log(targetUserId);
    console.log(typeof targetUserId);
    const options = {
      headers: this.httpOptions.headers,
      body: {
        UserId: targetUserId,
      },
    };
    this.http.delete(this.baseUrl, options).subscribe((res) => {
      console.log(res);
      this.users.splice(index, 1);
      this.usersChanged.next(this.users.slice());
    });
  }
}
