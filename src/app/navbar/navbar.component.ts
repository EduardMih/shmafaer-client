import { Component, OnInit } from '@angular/core';
import {AuthTokenService} from "../_services/auth-token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor(public tokenAuthService: AuthTokenService,
              private router: Router)
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
    //window.location.reload();
    this.router.navigate(['/login'])

  }

  getDisplayName(): string
  {

    return this.tokenAuthService.getUserData()!.firstname.concat(" ",
      this.tokenAuthService.getUserData()!.lastname
    )

  }

}
