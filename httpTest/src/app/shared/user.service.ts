import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  fetchData(){
    return this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide/post.json')
      .pipe(
        map((resData: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
          const resArray: any[] = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              resArray.push({ ...resData[key], id: key });
            }
          }
          return resArray;
        })
      )
  }

}
