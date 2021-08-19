import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  isAuth!: string;
  // isUserAuthenticated = false;
  // isAdminAuthenticated = false;
  // adminAuth = this.authservice.user.subscribe(
  //   (res) => (this.isAdminAuthenticated = res.IsAdmin)
  // );
  // userAuth = this.authservice.user.subscribe(
  //   (res) => (this.isUserAuthenticated = !res.IsAdmin)
  // );
  // auth = this.authservice.user.subscribe((res) => {
  //   if (res.IsAdmin) {
  //     this.isUserAuthenticated = res.IsAdmin;
  //   } else {
  //     this.isUserAuthenticated = !res.IsAdmin;
  //   }
  // });
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
    // this.products = this.productservice.getInitProducts();
    this.products = this.productservice.getProducts();
    // console.log('search array length : ', this.products.length);
    // if (this.products.length === 0) {
    //   this.productservice.getInitProducts().subscribe((data) => {
    //     this.products = data;
    //     // console.log('zailimian: ', this.products);
    //   });
    // }
    this.subOfSearch = this.productservice.searchChanged.subscribe((res) => {
      // console.log('search array length : ', res.length);
      if (res.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.products = res;
      }
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
    // this.auth.unsubscribe();
  }
}
