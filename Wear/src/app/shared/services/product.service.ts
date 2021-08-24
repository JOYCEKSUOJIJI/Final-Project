import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Product } from '../../shared/product.model';
import { ShoppinglistService } from '../../shared/services/shoppinglist.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  putpostdeletebase =
    'https://a613eoyte1.execute-api.us-east-1.amazonaws.com/default/forsaleproducts';
  getbase =
    'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale';
  initsearch =
    '?key=Gender&value=Men&key=Category&value=Footwear&key=ProductTitle&value=ADIDAS&key=Colour&value=Black';
  products: Product[] = [];
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
      console.log(this.products);
      return this.searchChanged.next(this.products.slice());
    });
  }

  getInitProducts() {
    this.http
      .get<Product[]>([this.getbase, this.initsearch].join(''))
      .subscribe((res) => {
        this.products = res;
        console.log(this.products);
      });
    return this.http.get<Product[]>([this.getbase, this.initsearch].join(''));
  }

  getProducts() {
    console.log(this.products);
    return this.products.slice();
  }

  getProduct(index: number) {
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
      .put(this.putpostdeletebase, { readyItem: newProduct })
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
    this.http
      .post(this.putpostdeletebase, { readyItem: newProduct })
      // .post(this.putpostdeletebase, { readyItem: newProduct },this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.products[index] = newProduct;
        console.log(newProduct);
        this.searchChanged.next(this.products.slice());
      });
  }

  deleteProduct(index: number) {
    let targetProductId = this.products[index].ProductId;
    const options = {
      headers: this.httpOptions.headers,
      body: {
        ProductId: targetProductId,
      },
    };

    this.http
      .delete<Product>(this.putpostdeletebase, options)
      .subscribe((res) => {
        console.log(res);
        this.products.splice(index, 1);
        this.searchChanged.next(this.products.slice());
      });
  }
}
