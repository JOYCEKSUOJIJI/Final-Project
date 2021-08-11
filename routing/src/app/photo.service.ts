import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable()
export class PhotoService {
  fetchData() {
    return from(
      fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
        response.json()
      )
    );
  }

  fetchHH() {
    return from(fetch('https://jsonplaceholder.typicode.com/photos/110')
      .then((response) => response.json()))
  }
}
