import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthService } from '../../shared/services/auth.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
