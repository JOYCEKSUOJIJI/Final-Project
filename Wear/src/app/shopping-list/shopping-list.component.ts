import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  products = [
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
  ];
  constructor() {}

  ngOnInit(): void {}
}
