import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products!: Product[];
  subOfSearch!: Subscription;
  subOfChange!: Subscription;
  test!: Product[];
  isEmpty = false;
  constructor(
    private productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products = this.productservice.getProducts();
    this.subOfSearch = this.productservice.searchChanged.subscribe((res) => {
      console.log('search array length : ', res.length);
      if (res.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.products = res;
      }

      console.log('in product list: ', this.products);
    });

    this.subOfChange = this.productservice.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subOfSearch.unsubscribe();
    this.subOfChange.unsubscribe();
  }
}
