import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/product.model';
import { ShoppinglistService } from '../../shared/services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription!: Subscription;
  constructor(private shoppinglistservice: ShoppinglistService) {}

  ngOnInit(): void {
    //init get shopping list
    this.products = this.shoppinglistservice.getProducts();

    //listen shopping list change
    this.subscription = this.shoppinglistservice.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  //delete product from shopping list and add it back to product list
  addProductbackToProductList(product: Product) {
    this.shoppinglistservice.addProductbackToProductList(product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
