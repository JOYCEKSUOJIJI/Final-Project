import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../product.service';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('f') searchForm!: NgForm;
  input_keyword!: string;
  searchChanged: Subject<string> = new Subject<string>();
  constructor(private productservcie: ProductService) {
    // this.searchChanged.pipe(debounceTime(300)).subscribe((res) => {
    //   this.productservcie.getresultList(res);
    // });
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const value = form.value.search;
    // console.log(typeof this.searchChanged.next(value));

    if (value.trim() === '') {
      this.productservcie.getFilterProducts('Apparel');
    } else {
      this.productservcie.getFilterProducts(value);
    }
    this.searchForm.reset();
  }
}
