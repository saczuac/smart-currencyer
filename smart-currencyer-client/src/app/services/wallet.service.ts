import { Injectable } from '@angular/core';
import { Currency } from '../classes/currency';
import { Wallet } from '../classes/wallet';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WalletService {

  private walletUrl = 'http://localhost:8000/wallets';  // URL to web api

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

  getWallets (): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl + '/')
      .pipe(
        tap(currencies => console.log(`fetched wallets`)),
        catchError(this.handleError('getWallets', []))
      );
  }

  getWallet(id: number): Observable<Wallet> {
    const url = `${this.walletUrl}/${id}/`;
    return this.http.get<Wallet>(url).pipe(
      tap(_ => console.log(`fetched wallet id=${id}`)),
      catchError(this.handleError<Wallet>(`getWallet id=${id}`))
    );
  }

  addWallet(wallet: Wallet): Observable<Wallet> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Wallet>(this.walletUrl + '/', wallet, httpOptions).pipe(
      tap((wallet: Wallet) => console.log(`added wallet w/ id=${wallet.id}`)),
      catchError(this.handleError<Wallet>('addWallet'))
    );
  }

  deleteWallet (wallet: Wallet | number): Observable<Wallet> {
    const id = typeof wallet === 'number' ? wallet : wallet.id;
    const url = `${this.walletUrl}/${id}/`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Wallet>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted wallet id=${id}`)),
      catchError(this.handleError<Wallet>('walletCurrency'))
    );
  }

}
