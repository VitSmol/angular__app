import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor (
    private auth: AuthService,
    private router: Router
  ) {}
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
      if (this.auth.isAuth() ) {
        if (typeof this.auth.token === `string`) {
          let token = this.auth.token
          req = req.clone({
            setParams: {
              auth: token
            }
          })
        }
      }
      return next.handle(req)
      .pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 400) {
            console.log(`Ошибка ${error.status} не правильный логин или пароль`);
            this.auth.logout()
            this.router.navigate(['/admin', 'login'])
          }
          return throwError(`Ошибка ${error.status} не правильный логин или пароль`)
        })
      )
  }

}
