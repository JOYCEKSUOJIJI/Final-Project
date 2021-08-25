import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
} from '@angular/router';
import { AdminAuthComponent } from './component/auth/admin-auth/admin-auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserAuthComponent } from './component/auth/user-auth/user-auth.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./component/products/products.module').then((m) => m.ProductsModule),
  },
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
  },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'admin-auth', component: AdminAuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
