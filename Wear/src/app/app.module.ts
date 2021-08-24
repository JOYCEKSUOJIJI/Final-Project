import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProductService } from '../app/shared/services/product.service';
import { ShoppinglistService } from '../app/shared/services/shoppinglist.service';
import { UserAuthComponent } from './component/auth/user-auth/user-auth.component';
import { AdminAuthComponent } from './component/auth/admin-auth/admin-auth.component';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { UserNamePipe } from './shared/pipes/user-name.pipe';
import { WelcomeComponent } from './component/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    UserAuthComponent,
    AdminAuthComponent,
    UserNamePipe,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ProductService,
    ShoppinglistService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
