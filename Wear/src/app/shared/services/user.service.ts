import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl =
    'https://n0pg9e4dwa.execute-api.us-east-1.amazonaws.com/default/usermanagement';
  users: User[] = [];
  usersChanged = new Subject<User[]>();
  userToken!: string;
  UserId!: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //management init or enter '' to get all user info
  getAllUser() {
    this.http.get<any[]>(this.baseUrl).subscribe((data) => {
      this.users = data;
      console.log(this.users);
      return this.usersChanged.next(this.users.slice());
    });
  }

  //get filtered user info
  getFilterUser(searchName: string) {
    this.http
      .get<any[]>([this.baseUrl, '?key=', `${searchName}`].join(''))
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
        return this.usersChanged.next(this.users.slice());
      });
  }

  //user-list init get all users info
  getUsers() {
    this.http.get<any[]>(this.baseUrl).subscribe((res) => {
      this.users = res;
    });
    return this.http.get<any[]>(this.baseUrl);
  }

  //get specific user
  getUser(index: number) {
    return this.users.slice()[index];
  }

  //add new user in system
  addUser(newUser: User) {
    this.http
      .put(this.baseUrl, { UserId: newUser.UserId, Password: newUser.Password })

      .subscribe(
        (response) => {
          console.log(response);
          this.users.push(newUser);
          this.usersChanged.next(this.users.slice());
          alert('Add successfully!');
        },
        (err) => {
          alert('user did not add successfully!');
          console.log(err.error);
        }
      );
  }

  //update exist user's info
  updateUser(index: number, newUser: User) {
    this.http.post(this.baseUrl, { readyItem: newUser }).subscribe(
      (response) => {
        console.log(response);
        this.users[index] = newUser;
        console.log(newUser);
        this.usersChanged.next(this.users.slice());
        alert('Edit successfully!');
      },
      (err: any) => {
        if (err.error === 'User does not exist') {
          alert('Cannot change userName!');
        }
        console.log(err.error);
      }
    );
  }

  //delete user
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
      alert('Delete Successfully!');
    });
  }
}
