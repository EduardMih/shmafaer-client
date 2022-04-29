import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthTokenService} from "../../auth-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authTokenService: AuthTokenService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRoles: string[] = route.data['expectedRoles'];

    if (this.authTokenService.isAuthenticated())
      for (let role of expectedRoles)
        if (this.authTokenService.hasRole(role))

          return true;


    this.router.navigate(['notEnoughPermissions']);

    return false;

  }
}
