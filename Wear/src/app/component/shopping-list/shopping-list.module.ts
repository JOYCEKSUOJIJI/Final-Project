import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingCheckoutComponent } from './shopping-checkout/shopping-checkout.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingCheckoutComponent],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
})
export class ShoppingListModule {}
