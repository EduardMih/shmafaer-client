import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthTokenService} from "../_services/auth-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authTokenService: AuthTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const authToken = this.authTokenService.getToken();

    if(authToken != null)
      authReq = request.clone({headers: request.headers.set(
        'Authorization', 'Bearer ' + authToken
        )})

    return next.handle(authReq);

  }
}


