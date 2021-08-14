import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglistService {
  productsChanged = new Subject<Product[]>();
  // ingredientsFromRecipe = new Subject<Recipe>();
  // startedEditing = new Subject<number>();
  constructor() {}
  private products: Product[] = [
    new Product(
      40143,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'Blue',
      'Casual',
      'Gini and Jony Girls Pretty Blossom Blue Top',
      'http://assets.myntassets.com/v1/images/style/properties/fc3c1b46906d5c148c45f532d0b3ffb5_images.jpg',
      44
    ),
    new Product(
      31118,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'Red',
      'Casual',
      'Gini and Jony Girls Pretty Blossom Blue Top',
      'http://assets.myntassets.com/v1/images/style/properties/1e3b40d501f5fbbceeab3879db474932_images.jpg',
      20
    ),
    new Product(
      40143,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'Blue',
      'Casual',
      'Gini and Jony Girls Pretty Blossom Blue Top',
      'http://assets.myntassets.com/v1/images/style/properties/fc3c1b46906d5c148c45f532d0b3ffb5_images.jpg',
      18
    ),
  ];

  getProducts() {
    return this.products.slice();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  removeProduct(index: number){
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
