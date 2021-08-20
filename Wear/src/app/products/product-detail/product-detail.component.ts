import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: number;
  isAuth!: string;
  // isUserAuthenticated = this.authservice.isUserAuthenticated;
  // isAdminAuthenticated = false;
  // adminAuth = this.authservice.user.subscribe(
  //   (res) => (this.isAdminAuthenticated = res.IsAdmin)
  // );
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productservice.getProduct(this.id);
    });
    this.productservice.searchChanged.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  jumpToLogin() {
    this.router.navigate(['/user-auth'], { relativeTo: this.route });
  }
  addToShoppingList() {
    this.productservice.addProductToShoppingList(this.product, this.id);
  }
  onAddProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteProduct() {
    this.productservice.deleteProduct(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    alert('Delete Successfully!');
  }
}
