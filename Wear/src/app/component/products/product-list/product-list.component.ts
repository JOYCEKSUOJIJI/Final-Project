import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products!: Product[];
  subOfSearch!: Subscription;
  test!: Product[];
  isEmpty = false;
  isAuth!: string;
  isLoading = false;
  //verfiy identity
  auth = this.authservice.user.subscribe((res) => {
    console.log(res.IsAdmin);
    if (res.IsAdmin === false && res.IsLogin === false) {
      this.isAuth = 'visitor';
    } else if (res.IsAdmin === true && res.IsLogin === true) {
      this.isAuth = 'admin';
    } else if (res.IsAdmin === false && res.IsLogin === true) {
      this.isAuth = 'user';
    }
  });

  constructor(
    private authservice: AuthService,
    private productservice: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get init product list
    this.isLoading = true;
    this.productservice.getInitProducts().subscribe((res) => {
      this.products = res;
      this.isLoading = false;
    });
    //listen to product list change
    this.subOfSearch = this.productservice.searchChanged.subscribe(
      (products: Product[]) => {
        this.isLoading = true;
        if (!products.length) {
          this.isEmpty = true;
          this.isLoading = false;
        } else {
          this.isEmpty = false;
          this.products = products;
          this.isLoading = false;
        }
      }
    );
  }
  //add new product
  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subOfSearch.unsubscribe();
  }
}
