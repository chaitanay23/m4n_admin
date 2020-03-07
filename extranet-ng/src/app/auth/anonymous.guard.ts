import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auhtService:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean{

      if(localStorage.getItem('isloggedIn')){
        this.router.navigate(['/dashboard'])
      }

      return true;
    
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
