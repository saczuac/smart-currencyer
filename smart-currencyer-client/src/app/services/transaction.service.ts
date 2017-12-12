import { Injectable } from '@angular/core';
import { Transaction } from '../classes/transaction';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable()
export class TransactionService {

  private transactionUrl = 'http://localhost:8000/transactions';  // URL to web api

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

  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl + '/')
      .pipe(
        // tap(users => console.log(`fetched transactions`)), // Do something
        catchError(this.handleError('fetching transactions', []))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Transaction>(this.transactionUrl + '/', transaction, httpOptions).pipe(
      // tap((transaction: Transaction) => console.log(`added transaction w/ id=${transaction.id}`)), // Do something
      catchError(this.handleError<Transaction>('creating transaction'))
    );
  }
}