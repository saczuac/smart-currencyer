import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  private userUrl = 'http://localhost:8000/users';  // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/')
      .pipe(
        tap(users => console.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }
}