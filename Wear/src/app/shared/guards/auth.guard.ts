import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
//all can visit product list and search product

//visitors can only user login and admin login page

/**
 * users can
 * visit shopping cart,
 * add/delete products in shopping cart.
 * add product from product list to shopping cart
 */

/**
 * admin can
 * visit user management,
 * add/delete/update/search users,
 * add/delete/update products.
 */

export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authservice.user.pipe(
      map(() => {
        console.log('authguard: ', this.authservice.user.value.IsLogin);
        const isAuth = this.authservice.user.value.IsLogin;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/user-auth']);
      })
    );
  }
}
