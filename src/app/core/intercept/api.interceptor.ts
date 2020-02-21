import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  // add token to header every request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
        withCredentials: true
    });
    // handle if Unauthorized to redirect to login
    return next.handle(request).pipe(
      tap(() => {},
        (err: HttpErrorResponse) => {
        //   if (err.status !== 401) {return; }
        //   // for only redirect from /doctor and /user route
        //   if (this.router.url.match('/doctor/') || this.router.url.match('/user/')) {
        //     this.router.navigate(['/login']);
        //   } else {
        //     return ;
        //   }
        //   localStorage.removeItem('access_token');
        }
      )
    );
  }
}
