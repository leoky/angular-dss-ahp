import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Decision } from '../models/decision';
import { CriteriaService } from './criteria.service';
import { AlternativeService } from './alternative.service';

@Injectable()
export class DecisionService {

  defaultName = 'Untitled AHP';
  decisions: Decision[];
  decision: Decision = {
    name: this.defaultName
  };
  // api url
  baseUrl = `${environment.api}`;

  constructor(private http: HttpClient,
              private criteriaService: CriteriaService,
              private alternativeService: AlternativeService,
              private snakeBar: MatSnackBar) { }

  // reset all data
  createNew() {
    this.criteriaService.criterias$.next(null);
    this.alternativeService.alternatives$.next(null);
    this.decision.name = this.defaultName;
  }

  save(): Observable<Decision> {
    this.decision.criteria = this.criteriaService.criterias$.value.map(x => {
      const a: any = x;
      a.value = a.value.toString();
      return a;
    });
    this.decision.alternative = this.alternativeService.alternatives$.value.map(x => {
      const a: any = x;
      a.value = a.value.toString();
      return a;
    });
    return this.http.post<Decision>(`${this.baseUrl}/decision`, this.decision)
    .pipe(
      tap(result => {
        this.snakeBar.open('Save to server success');
      }),
      catchError(this.handleError.bind(this))
    );
  }

  saveToServer(url: string, param: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${url}/${param}`, data)
    .pipe(
      tap(result => {
        this.snakeBar.open('Save to server success: ' + url);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getDecision(id: string): Observable<Decision> {
    return this.http.get<Decision>(`${this.baseUrl}/decision/${id}`)
    .pipe(
      tap(result => {
        if (result) {
          this.decision = result;
          this.criteriaService.criterias$.next(result.criteria.map(x => {
            if (x.value) {
              // convert to array of number from string
              x.value = x.value.toString().split(',').map(Number);
            }
            return x;
          }));
          this.alternativeService.alternatives$.next(result.alternative);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getDecisions(): Observable<Decision[]> {
    return this.http.get<Decision[]>(`${this.baseUrl}/decision`)
    .pipe(
      tap(result => {
        if (result) {
          this.decisions = result;
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/decision/${id}`)
    .pipe(
      tap(result => {
        if (result) {
         this.snakeBar.open('1 deleted');
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
