import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../models/roles';
import { LocalStorageConst } from '../models/userCheck';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserFormGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    console.log('Url: ' + url);
    let val: string = localStorage.getItem(LocalStorageConst.IsUserLoggedIn);

    if (val != null && val == Roles.Admin) {
      if (url == '/login') this.router.parseUrl('/user-form');
      else return true;
      {
        return this.router.parseUrl('/login');
      }
    } else if (val != null && val == Roles.Operator) {
      if(url == '/login') this.router.parseUrl('/home');
      else return true;
      {
        return this.router.parseUrl('/login');
      }
    }
}

}
