import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ShoppingCheckoutComponent } from './shopping-list/shopping-checkout/shopping-checkout.component';
import { ProductService } from './products/product.service';
import { ShoppinglistService } from './shopping-list/shoppinglist.service';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ManagementComponent } from './management/management.component';
import { UserListComponent } from './management/user-list/user-list.component';
import { UserComponent } from './management/user-list/user/user.component';
import { UserDetailComponent } from './management/user-detail/user-detail.component';
import { UserEditComponent } from './management/user-edit/user-edit.component';
import { UserNamePipe } from './shared/user-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ShoppingListComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductStartComponent,
    ShoppingCheckoutComponent,
    UserAuthComponent,
    SpinnerComponent,
    AdminAuthComponent,
    ManagementComponent,
    UserListComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    UserNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatBadgeModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatChipsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ProductService,
    ShoppinglistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
