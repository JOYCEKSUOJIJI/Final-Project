import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  PreloadingStrategy,
} from '@angular/router';
import { AdminAuthComponent } from './component/auth/admin-auth/admin-auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserAuthComponent } from './component/auth/user-auth/user-auth.component';
// import { ManagementComponent } from './management/management.component';
// import { UserDetailComponent } from './management/user-detail/user-detail.component';
// import { UserEditComponent } from './management/user-edit/user-edit.component';
// import { UserListComponent } from './management/user-list/user-list.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
// import { ProductDetailComponent } from './products/product-detail/product-detail.component';
// import { ProductEditComponent } from './products/product-edit/product-edit.component';
// import { ProductStartComponent } from './products/product-start/product-start.component';
// import { ProductsComponent } from './products/products.component';
// import { ProductsModule } from './products/products.module';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./component/products/products.module').then((m) => m.ProductsModule),
  },
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ProductStartComponent,
  //     },
  //     {
  //       path: 'new',
  //       component: ProductEditComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: ':id',
  //       component: ProductDetailComponent,
  //     },
  //     {
  //       path: ':id/edit',
  //       component: ProductEditComponent,
  //       canActivate: [AuthGuard],
  //     },
  //   ],
  // },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./component/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./component/management/management.module').then((m) => m.ManagementModule),
    canActivate: [AuthGuard],
    // component: ManagementComponent,
    // children: [
    //   // {
    //   //   path: '',
    //   //   component:UserListComponent,
    //   // },
    //   {
    //     path: 'new',
    //     component: UserEditComponent,
    //     canActivate: [AuthGuard],
    //   },
    //   {
    //     path: ':id',
    //     component: UserDetailComponent,
    //     canActivate: [AuthGuard],
    //   },
    //   {
    //     path: ':id/edit',
    //     component: UserEditComponent,
    //     canActivate: [AuthGuard],
    //   },
    // ],
  },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'admin-auth', component: AdminAuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', enableTracing: true })],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
