import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductStartComponent,
      },
      {
        path: 'new',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'admin-auth', component: AdminAuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
