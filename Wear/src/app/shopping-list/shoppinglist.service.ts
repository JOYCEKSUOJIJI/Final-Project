import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistService {
  productsChanged = new Subject<Product[]>();

  constructor() {}
  private products: Product[] = [];
  // getProductsList(){

  // }

  getProducts() {
    return this.products.slice();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
