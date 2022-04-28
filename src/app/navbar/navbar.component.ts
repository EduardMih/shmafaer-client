import { Component, OnInit } from '@angular/core';
import {AuthTokenService} from "../_services/auth-token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor(public tokenAuthService: AuthTokenService)
  {
  }

  ngOnInit(): void {
  }

  checkRole(roles: string[]): boolean
  {

    for(let role of roles)
    {

      if(this.tokenAuthService.hasRole(role))

        return true;

    }

    return false;

  }

  checkIsAuthenticated(): boolean
  {

    return this.tokenAuthService.isAuthenticated();

  }

  logout(): void
  {
    this.tokenAuthService.logout();
    window.location.reload()

  }

}
