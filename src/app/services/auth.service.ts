import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {delay, tap } from 'rxjs/operators';
import { Roles } from '../models/roles';
import { LocalStorageConst } from '../models/userCheck';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;
  

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    // this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    // localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    if(userName == 'operator' && password == 'admin') {
      localStorage.setItem(LocalStorageConst.IsUserLoggedIn, Roles.Operator);
      this.isUserLoggedIn = true;
      }

    if(userName == 'admin' && password == 'admin') {
      localStorage.setItem(LocalStorageConst.IsUserLoggedIn, Roles.Operator);
      this.isUserLoggedIn = true;
      }

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem(LocalStorageConst.IsUserLoggedIn);
  }

  constructor() { }
}
