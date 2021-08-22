import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ManagementComponent } from './management.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'new',
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
