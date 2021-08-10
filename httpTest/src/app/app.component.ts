import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { UserService } from './shared/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedPosts: any[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private userservice: UserService) {}

  ngOnInit() {
    this.onFetchPosts();
    // of(1, 2, 3, 4, 5).pipe(
    //   tap(console.log),
    //   map(n => n > 2.5 ? 'big' : 'small')
    // ).subscribe(console.log);
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http
      .post('https://ng-complete-guide/post.json', postData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.userservice.fetchData().subscribe((posts) => {
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}

/**
 * 可以再http 的各种方法前面限定传输的数据类型
 */
