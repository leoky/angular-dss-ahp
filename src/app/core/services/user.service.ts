import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  redirectUrl = '/';
  // api url
  baseUrl = `${environment.api}`;

  constructor(private http: HttpClient,
              private snakeBar: MatSnackBar) {}

  register(data: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/register`, data)
    .pipe(
      tap(result => {
       if (result) {
        this.snakeBar.open(`Register success!`, '', { duration: 2000});
       }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logIn(data: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/login`, data)
    .pipe(
      tap(result => {
       if (result) {
        this.user$.next(result);
        this.snakeBar.open(`Welcome, ${result.name}`, '', { duration: 2000});
       }
      }),
      catchError(this.handleError.bind(this))
    );
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`)
    .pipe(
      tap(result => {
        if (result) {
          this.user$.next(result);
        }
      }),
      catchError((error) => {
        this.user$.next(null);
        return this.handleError(error);
      })
    );
  }
  update(data: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user`, data)
    .pipe(
      tap(result => {
       if (result) {
        this.getUser().subscribe();
        this.snakeBar.open(`Update success!`, '', { duration: 2000});
       }
      }),
      catchError(this.handleError.bind(this))
    );
  }
  logOut(): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}/user/logout`)
    .pipe(
      tap(result => {
       if (result) {
        this.user$.next(null);
        this.snakeBar.open(`Log out success!`, '', { duration: 2000});
       }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
      if (error.error.message) {
        this.snakeBar.open(`${error.error.message}`);
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
