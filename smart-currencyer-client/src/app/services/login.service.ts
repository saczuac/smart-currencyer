import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable()
export class LoginService {

  private loginUrl = 'http://localhost:8000/api-token-auth';  // URL to web api

  constructor(private http: HttpClient, private router: Router) { }

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

       if (error.status === 401) this.logout();

       return of(result as T);
     };
   }

  getToken(): string {
    return localStorage.token
  }

  isAuthenticated(): boolean {
    return localStorage.token != null
  }

  getUsername(): string {
    return localStorage.username
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.loginUrl + '/',
                          JSON.stringify({ username: username, password: password }),
                          httpOptions).pipe(
      tap((token:any) => {
        localStorage.token = token.token
        localStorage.username = username
      }),
      catchError(this.handleError<any>('login'))
    );
  }
}

