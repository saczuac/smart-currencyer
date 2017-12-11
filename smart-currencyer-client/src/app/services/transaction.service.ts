import { Injectable } from '@angular/core';
import { Transaction } from '../classes/transaction';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TransactionService {

  private transactionUrl = 'http://localhost:8000/transactions';  // URL to web api

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

  getTransactions (): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl + '/')
      .pipe(
        tap(users => console.log(`fetched transactions`)),
        catchError(this.handleError('getTransactions', []))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(transaction, 'acaa')

    return this.http.post<Transaction>(this.transactionUrl + '/', transaction, httpOptions).pipe(
      tap((transaction: Transaction) => console.log(`added transaction w/ id=${transaction.id}`)),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }
}