import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Decision } from '../models/decision';

@Injectable()
export class DecisionService {

  decisions: Decision[];
  // api url
  baseUrl = `${environment.api}`;

  constructor(private http: HttpClient,
              private snakeBar: MatSnackBar) { }

  getDecision(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/decision`)
    .pipe(
      tap(result => {
        if (result) {
          this.decisions = result;
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
      this.snakeBar.open(`error: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
