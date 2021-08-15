import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/product.model';
import { ShoppinglistService } from './shoppinglist.service';

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
    this.products = this.shoppinglistservice.getProducts();

    this.subscription = this.shoppinglistservice.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  deleteProduct(index: number) {
    this.shoppinglistservice.removeProduct(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
