import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthTokenService} from "../_services/auth-token.service";
import {AuthService} from "../_services/auth.service";
import {LoginResponse} from "../_dtos/login-response.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = true;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authTokenService: AuthTokenService,
              private authService: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const authToken = this.authTokenService.getToken();

    if(authToken != null)
      authReq = request.clone({headers: request.headers.set(
        'Authorization', 'Bearer ' + authToken
        )})

    return next.handle(authReq).pipe(catchError((error) => {
      if((error instanceof HttpErrorResponse) && (!authReq.url.includes('/login')) && (error.status == 401))
        return this.handle401Error(authReq, next);

      return throwError(error)
    }));

  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler)
  {
    const refreshToken = this.authTokenService.getRefreshToken();

    console.log("Trying...")
    if(refreshToken)
    {

      return this.authService.refreshToken(refreshToken).pipe(
        switchMap((data: LoginResponse) => {
          this.authTokenService.saveUserData(data);

          return next.handle(this.addAuthHeader(request, data.jwtToken));

        }),
        catchError((err) => {
          console.log(err)
          this.authTokenService.logout();
          this.router.navigate(['/login'])

          return throwError(err);

        })
      )
    }

    return next.handle(request);

  }

  private addAuthHeader(request: HttpRequest<unknown>, authToken: string): HttpRequest<unknown>
  {

    return request.clone({headers: request.headers.set(
        'Authorization', 'Bearer ' + authToken
      )})

  }

}


