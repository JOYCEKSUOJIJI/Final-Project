import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsChanged = new Subject<Product[]>();
  constructor(private http: HttpClient) {}
  public getData() {
    this.http
      .get<any[]>(
        'https://nqy3e5t4i3.execute-api.us-east-1.amazonaws.com/default/showProductInForSale'
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  products: Product[] = [
    new Product(
      42419,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'White',
      'Casual',
      'Gini and Jony Girls Knit White Top',
      'http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg',
      18
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
      42419,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'White',
      'Casual',
      'Gini and Jony Girls Knit White Top',
      'http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg',
      22
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
      81
    ),
    new Product(
      42419,
      'Girls',
      'Apparel',
      'Topwear',
      'Tops',
      'White',
      'Casual',
      'Gini and Jony Girls Knit White Top',
      'http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg',
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
      22
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
      16
    ),
  ];

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products.slice()[index];
  }
}
