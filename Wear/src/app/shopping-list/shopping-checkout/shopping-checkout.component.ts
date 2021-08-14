import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/product.model';
import { ShoppinglistService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-checkout',
  templateUrl: './shopping-checkout.component.html',
  styleUrls: ['./shopping-checkout.component.css'],
})
export class ShoppingCheckoutComponent implements OnInit, OnDestroy {
  products!: Product[];
  subscription!: Subscription;
  subtotal = 0;
  shipping = 0;
  tax = 0;
  total = 0;

  constructor(private shoppinglistservice: ShoppinglistService) {}

  ngOnInit(): void {
    console.log('initial price');
    this.subscription = this.shoppinglistservice.productsChanged.subscribe(
      (products: Product[]) => {
        console.log('Simple test');
        this.products = products;
        this.subtotal = 0;
        this.total = 0;
        this.tax = 0;
        this.shipping = 0;
console.log(this.products);
        this.getSubtotal();
        this.getShipping();
        this.getTax();
        this.gettTotal();
      }
    );

  }

  getSubtotal(): number {
    console.log('get subtotal');
    for (let pro of this.products) {
      this.subtotal += pro.price;
    }
    return this.subtotal;
  }

  getTax(): number {
    this.tax = (this.subtotal + this.shipping) * 0.08;
    return this.tax;
  }

  gettTotal(): number {
    this.total = Number((this.tax + this.subtotal + this.shipping).toFixed(2));
    return this.total;
  }
  getShipping() {
    if (this.subtotal > 99.99 || this.subtotal === 0) {
      this.shipping = 0;
    } else {
      this.shipping = 9.99;
    }

    return this.shipping;
  }

  checkout() {
    alert(`Totally : $ ${this.total}. Show me the money!`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
