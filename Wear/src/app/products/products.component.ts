import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  showFiller = false;
  searchForm!: FormGroup;
  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    console.log('search sideBar area: ');
    this.initForm();
  }
  private initForm() {
    let Gender = '';
    let Category = '';
    let ProductType = '';
    let Usage = '';
    let Colour = '';
    let ProductTitle = '';

    this.searchForm = new FormGroup({
      ProductTitle: new FormControl(ProductTitle),
      Gender: new FormControl(Gender),
      Category: new FormControl(Category),
      ProductType: new FormControl(ProductType),
      Usage: new FormControl(Usage),
      Colour: new FormControl(Colour, Validators.pattern('/^[a-zA-Z0-9]*$/')),
    });
  }

  onSubmit() {
    const urlArray = [];
    const value = this.searchForm.value;
    console.log(value);
    if (value.Gender) {
      urlArray.push(`key=Gender&value=${value.Gender}`);
    }
    if (value.Category) {
      urlArray.push(`key=Category&value=${value.Category}`);
    }
    if (value.ProductType) {
      urlArray.push(`key=ProductType&value=${value.ProductType}`);
    }
    if (value.Usage) {
      urlArray.push(`key=Usage&value=${value.Usage}`);
    }
    if (value.Colour) {
      urlArray.push(`key=Colour&value=${value.Colour}`);
    }
    if (value.ProductTitle) {
      urlArray.push(`key=ProductTitle&value=${value.ProductTitle}`);
    }

    if (urlArray.length === 0) {
      this.productservice.getFilterProducts('');
    } else {
      let Url = urlArray.join('&');
      let searchUrl = ['?', Url].join('');
      console.log(searchUrl);
      this.productservice.getFilterProducts(searchUrl);
    }

    //?key=Category&value=Foot&key=ProductTitle&value=ADIDAS&key=Gender&value=Men
  }
}
