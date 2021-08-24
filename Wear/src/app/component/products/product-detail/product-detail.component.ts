import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: number;
  isAuth!: string;

  //Identity detection
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
    //find the target product to show product details
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productservice.getProduct(this.id);
      if (this.product === undefined) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });

    //route back to products page when change product list
    this.productservice.searchChanged.subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  //visit jump to login page
  jumpToLogin() {
    this.router.navigate(['/user-auth'], { relativeTo: this.route });
  }

  //user add products into shopping list
  addToShoppingList() {
    this.productservice.addProductToShoppingList(this.product, this.id);
    this.router.navigate(['/products'], { relativeTo: this.route });
  }

  //admin add new product in product list
  onAddProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  //admin delete product from product list
  onDeleteProduct() {
    this.productservice.deleteProduct(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
