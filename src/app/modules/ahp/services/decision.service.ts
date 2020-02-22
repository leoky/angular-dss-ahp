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

  decision: Decision = {};
  decisions: Decision[];
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
  }

  save(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/decision`, this.decision)
    .pipe(
      tap(result => {
        this.snakeBar.open('Save to server success');

        // criteria
        this.saveToServer('criteria', result.id, {
          data: this.criteriaService.criterias$.value.map(x => {
            x.decisionId = result.id;
            return x;
          })
        }).subscribe();

        // alternative
        this.saveToServer('alternative', result.id, {
          data: this.alternativeService.alternatives$.value.map(x => {
            x.decisionId = result.id;
            return x;
          })
        }).subscribe();

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
          this.decision.name = result.name;
          this.criteriaService.criterias$.next(result.criteria.map(x => {
            // convert to array of number from string
            // "[1,2,3]" => [1,2,3]
            x.value = x.value.toString().substring(1, x.value.length - 1).split(',').map(Number);
            return x;
          }));
          this.alternativeService.alternatives$.next(result.alternatives);
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
