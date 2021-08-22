import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Product } from '../shared/product.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  putpostdeletebase =
    'https://a613eoyte1.execute-api.us-east-1.amazonaws.com/default/forsaleproducts';
  getbase =
    'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale';
  initsearch =
    '?key=Gender&value=Men&key=Category&value=Footwear&key=ProductTitle&value=ADIDAS&key=Colour&value=White';
  products: Product[] = [];
  // productsChanged = new Subject<Product[]>();
  searchChanged = new Subject<Product[]>();
  errorChanged = new Subject<string>();
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

  constructor(
    private http: HttpClient,
    private shoppinglistservice: ShoppinglistService,
    private authservice: AuthService
  ) {}

  getFilterProducts(keyword: string) {
    this.http.get<any[]>([this.getbase, keyword].join('')).subscribe((data) => {
      this.products = data;
      console.log('getFilterProducts');
      console.log(this.products);
      return this.searchChanged.next(this.products.slice());
    });
  }

  getInitProducts() {
    this.http
      .get<Product[]>([this.getbase, this.initsearch].join(''))
      .subscribe((res) => {
        this.products = res;
        console.log('getInitProducts');
        console.log(this.products);
      });
    return this.http.get<Product[]>([this.getbase, this.initsearch].join(''));
  }

  getProducts() {
    console.log('getProducts无参');
    console.log(this.products);
    return this.products.slice();
  }

  getProduct(index: number) {
    console.log('getProducts有参');
    console.log(this.products);
    console.log(this.products[index]);
    return this.products.slice()[index];
  }

  addProductToShoppingList(product: Product, index: number) {
    const options = {
      headers: this.httpOptions.headers,
      body: {
        ProductId: product.ProductId,
        UserId: this.UserId,
      },
    };
    this.http
      .delete(
        'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale',
        options
      )
      .subscribe((res) => {
        console.log(res);
        this.products.splice(index, 1);
        this.searchChanged.next(this.products.slice());
      });
    this.shoppinglistservice.addProduct();
  }

  addProduct(newProduct: Product) {
    this.http
      .put(this.putpostdeletebase, { readyItem: newProduct }, this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
          this.products.push(newProduct);
          this.searchChanged.next(this.products.slice());
        },
        (err) => {
          console.log(err.error);
          this.errorChanged.next(err.error);
        }
      );
  }

  updateProduct(index: number, newProduct: Product) {
    console.log('this.httpOptions, update');
    console.log(this.httpOptions);
    console.log('this.userToken, update');
    console.log(this.userToken);
    this.http
      .post(this.putpostdeletebase, { readyItem: newProduct }, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.products[index] = newProduct;
        console.log(newProduct);
        this.searchChanged.next(this.products.slice());
      });
  }

  deleteProduct(index: number) {
    let targetProductId = this.products[index].ProductId;
    console.log(targetProductId);
    console.log(typeof targetProductId);
    const options = {
      headers: this.httpOptions.headers,
      body: {
        ProductId: targetProductId,
      },
    };
    console.log('this.httpOptions, delete');
    console.log(this.httpOptions);
    console.log('this.userToken, delete');
    console.log(this.userToken);

    this.http.delete(this.putpostdeletebase, options).subscribe((res) => {
      console.log(res);
      this.products.splice(index, 1);
      this.searchChanged.next(this.products.slice());
    });
  }
}
