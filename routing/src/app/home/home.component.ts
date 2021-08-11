import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photolist!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private photo: PhotoService
  ) {}

  ngOnInit(): void {
    // this.photo.fetchData().subscribe((res) => {
    //   this.photolist = res;
    // });
    // console.log(this.photolist);
    this.photo.fetchHH().subscribe((res) => {
      this.photolist = res;
    });
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onLoadUsers(id: number) {
    this.router.navigate(['/users', id, 'sus'], {
      queryParams: { allowEdit: 'fuck you' },
      fragment: 'loading',
    });
  }

  reload() {
    console.log(this.router.navigate(['/home']));
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

  getData() {
    this.photo.fetchData().subscribe((res) => {
      this.photolist = res;
    });
    console.log(this.photolist);
  }
}
