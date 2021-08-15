import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from '../shared/product.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    // new Product(
    //   40143,
    //   'Girls',
    //   'Apparel',
    //   'Topwear',
    //   'Tops',
    //   'Blue',
    //   'Casual',
    //   'Gini and Jony Girls Pretty Blossom Blue Top',
    //   'http://assets.myntassets.com/v1/images/style/properties/fc3c1b46906d5c148c45f532d0b3ffb5_images.jpg',
    //   44
    // ),
  ];
  productsChanged = new Subject<Product[]>();
  searchChanged = new Subject<Product[]>();

  constructor(
    private http: HttpClient,
    private shoppinglistservice: ShoppinglistService
  ) {}

  // getFilterProducts(keyword: string) {
  //   this.http.get<Product[]>(
  //     `https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale${keyword}`
  //   );

  //   this.searchChanged.subscribe((data) => {
  //     this.products = data;
  //     console.log('zailimian: ', this.products);
  //   });

  //   return this.searchChanged;
  // }

  getFilterProducts(keyword: string) {
    this.http
      .get<any[]>(
        `https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale${keyword}`
      )
      .subscribe((data) => {
        this.products = data;
        // console.log('zailimian: ', this.products);
        return this.searchChanged.next(this.products.slice());
      });
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
    this.products.push(newProduct);
    this.productsChanged.next(this.products.slice());
  }

  updateRecipe(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    console.log(newProduct);
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
