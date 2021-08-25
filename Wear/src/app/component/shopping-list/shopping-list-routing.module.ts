import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ShoppingCheckoutComponent } from './shopping-checkout/shopping-checkout.component';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
