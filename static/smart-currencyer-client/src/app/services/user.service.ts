import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private userUrl = `${environment.url}/users`;  // URL to web api

  constructor(private http: HttpClient, private loginService: LoginService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
       let errorMsg: string;

       const hasDetail = error.error.detail ? true : false

       if (hasDetail) {
         errorMsg = error.error.detail
       } else {
         let key = Object.keys(error.error)[0]
         errorMsg = `${key}: ${error.error[key][0]}`
       }

       errorMsg = typeof errorMsg === 'string' ? errorMsg : 'server error, can not load response'

       swal({
         title: `Error ${operation}: ${errorMsg}`,
         type: 'error',
       })

       if (error.status === 401) this.loginService.logout();

       return of(result as T);
     };
   }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/')
      .pipe(
        // tap(users => console.log(`fetched users`)), // Do something
        catchError(this.handleError('getUsers', []))
      );
  }
}