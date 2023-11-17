import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { map, pipe } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authserv: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (this.router.url === '/') {
      this.router.navigateByUrl('/nglogin');
      return false;
    }
    
    if (!this.authserv.authModel?.isAuth){
      return false;
    }

    return true;

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivateChild called');
    return this.canActivate(route, state);
  }

}
