import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { Product } from '../shared/product.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  productsChanged = new Subject<Product[]>();
  searchChanged = new Subject<Product[]>();
  errorChanged = new Subject<string>();

  constructor(
    private http: HttpClient,
    private shoppinglistservice: ShoppinglistService
  ) {}

  getFilterProducts(keyword: string) {
    this.http
      .get<any[]>(
        `https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale${keyword}`
      )
      .subscribe((data) => {
        this.products = data;
        console.log(this.products);
        return this.searchChanged.next(this.products.slice());
      });
  }

  getInitProducts() {
    return this.http.get<Product[]>(
      'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale'
    );
  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products.slice()[index];
  }

  addProductToShoppingList(product: Product) {
    this.shoppinglistservice.addProduct(product);
  }
  addRecipe(newProduct: Product) {
    this.http
      .put(
        'https://a613eoyte1.execute-api.us-east-1.amazonaws.com/default/forsaleproducts',
        { readyItem: newProduct }
      )
      // .pipe(catchError((err) => of(err.error)))
      // .subscribe((response) => {
      //   if (response === 'Resourse already exist') {
      //     console.log('this is a response', response);
      //     return;
      //   } else {
      //     this.products.push(newProduct);
      //     // console.log('tthis is s fsfsdhkfs', response);
      //     this.productsChanged.next(this.products.slice());
      //     // console.log('tthis is s rwrqwtqwrt', response);
      //   }
      // });
      .subscribe(
        (response) => {
          console.log(response);
          this.products.push(newProduct);
          // console.log('tthis is s fsfsdhkfs', response);
          this.productsChanged.next(this.products.slice());
          // console.log('tthis is s rwrqwtqwrt', response);
        },
        (err) => {
          console.log(err.error);
          this.errorChanged.next(err.error);
        }
      );
  }

  updateRecipe(index: number, newProduct: Product) {
    this.http
      .post(
        'https://a613eoyte1.execute-api.us-east-1.amazonaws.com/default/forsaleproducts',
        { readyItem: newProduct }
      )
      // .pipe(catchError((err) => of(err.error)))
      .subscribe((response) => {
        console.log(response);
        this.products[index] = newProduct;
        console.log(newProduct);
        this.productsChanged.next(this.products.slice());
      });
  }

  deleteProduct(index: number) {
    let targetProductId = this.products[index].ProductId;
    console.log(targetProductId);
    console.log(typeof targetProductId);
    const options = {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      // }),
      body: {
        ProductId: targetProductId,
      },
    };
    this.http
      .delete(
        'https://a613eoyte1.execute-api.us-east-1.amazonaws.com/default/forsaleproducts',
        options
      )
      .subscribe((res) => {
        console.log(res);
        this.products.splice(index, 1);
        this.productsChanged.next(this.products.slice());
      });
  }
}
