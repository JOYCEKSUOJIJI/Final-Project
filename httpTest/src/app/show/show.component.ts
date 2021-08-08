import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../post.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  loadedPosts:any[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.onfetchData();
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
    this.onfetchData();
  }

  onClearPosts() {
    // Send Http request
  }

  onfetchData() {
    this.isLoading = true;
    this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide/post.json')
      .pipe(
        map((resData) => {
          const resArray: any[] = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              resArray.push({ ...resData[key], id: key });
            }
          }
          return resArray;
        })
      )
      .subscribe((posts) => {
        this.isLoading = false;
        this.loadedPosts = posts;
        console.log(posts);
      });
  }

}
