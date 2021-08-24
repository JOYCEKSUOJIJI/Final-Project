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
    this.userToken = res.token;
    this.UserId = res.UserId;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'authorizationToken',
      `${this.userToken}`
    );
  });

  constructor(private http: HttpClient, private authservice: AuthService) {}
  private products: Product[] = [];
  getProducts() {
    this.http
      .get<any[]>(
        `https://74hgrn4g8a.execute-api.us-east-1.amazonaws.com/default/showShopCart?key=${this.UserId}`,
        this.httpOptions
      )
      .subscribe((data) => {
        this.products = data;
        console.log(this.products);
        return this.productsChanged.next(this.products.slice());
      });
    return this.products.slice();
  }

  addProduct() {
    this.getProducts();
    // this.products.push(product);
    // this.productsChanged.next(this.products.slice());
  }

  addProductbackToProductList(product: Product) {
    console.log(product);
    const options = {
      headers: this.httpOptions.headers,
      body: {
        ProductId: product.ProductId,
      },
    };
    console.log('this.httpOptions, delete');
    console.log(this.httpOptions);
    console.log('this.userToken, delete');
    console.log(this.userToken);

    this.http
      .delete(
        'https://n88x8dr2cj.execute-api.us-east-1.amazonaws.com/default/cancelFromCart',
        options
      )
      .subscribe((res) => {
        console.log(res);
        // this.products.splice(index, 1);
        this.getProducts();
        this.productsChanged.next(this.products.slice());
      });
    // this.products.splice(index, 1);
    // this.productsChanged.next(this.products.slice());
  }

  clearAllProduct() {

    this.products = [];
    const options = {
      headers: this.httpOptions.headers,
      body: {
        UserId: this.UserId,
      },
    };
    console.log('this.httpOptions, delete');
    console.log(this.httpOptions);
    console.log('this.userToken, delete');
    console.log(this.userToken);

    this.http
      .delete(
        'https://74hgrn4g8a.execute-api.us-east-1.amazonaws.com/default/showShopCart',
        options
      )
      .subscribe((res) => {
        console.log(res);
        // this.products = [];
        this.getProducts();
        this.productsChanged.next(this.products.slice());
      });
  }
}
