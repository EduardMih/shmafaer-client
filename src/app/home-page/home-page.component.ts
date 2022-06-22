import { Component, OnInit } from '@angular/core';
import {AuthTokenService} from "../_services/auth-token.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authTokenService: AuthTokenService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean
  {

    return this.authTokenService.isAuthenticated();

  }

}
