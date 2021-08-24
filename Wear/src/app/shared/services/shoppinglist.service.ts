import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Product } from '../../shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistService {
  productsChanged = new Subject<Product[]>();
  userToken!: string;
  UserId!: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  user = this.authservice.user.subscribe((res) => {
    this.UserId = res.UserId;
  });

  constructor(private http: HttpClient, private authservice: AuthService) {}
  private products: Product[] = [];
  getProducts() {
    this.http
      .get<any[]>(
        `https://74hgrn4g8a.execute-api.us-east-1.amazonaws.com/default/showShopCart?key=${this.UserId}`
      )
      .subscribe((data) => {
        this.products = data;
        console.log(this.products);
        return this.productsChanged.next(this.products.slice());
      });
    return this.products.slice();
  }

  //add new product and refresh the shopping list 
  addProduct() {
    this.getProducts();
  }
  //delete product from shopping list and add it back to product list
  addProductbackToProductList(product: Product) {
    console.log(product);
    const options = {
      headers: this.httpOptions.headers,
      body: {
        ProductId: product.ProductId,
      },
    };
    this.http
      .delete(
        'https://n88x8dr2cj.execute-api.us-east-1.amazonaws.com/default/cancelFromCart',
        options
      )
      .subscribe((res) => {
        console.log(res);
        this.getProducts();
        this.productsChanged.next(this.products.slice());
      });
  }

  //check out delete all products in shopping list
  clearAllProduct() {
    this.products = [];
    const options = {
      headers: this.httpOptions.headers,
      body: {
        UserId: this.UserId,
      },
    };

    this.http
      .delete(
        'https://74hgrn4g8a.execute-api.us-east-1.amazonaws.com/default/showShopCart',
        options
      )
      .subscribe((res) => {
        console.log(res);
        this.getProducts();
        this.productsChanged.next(this.products.slice());
      });
  }
}
