import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManagementComponent } from './management.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';
import { ManagementRoutingModule } from './management-routing.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    ManagementComponent,
    UserListComponent,
    UserDetailComponent,
    UserComponent,
    UserEditComponent,
  ],
  imports: [
    ManagementRoutingModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,


    HttpClientModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class ManagementModule {}
