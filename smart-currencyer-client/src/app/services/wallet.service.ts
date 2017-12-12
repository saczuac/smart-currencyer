import { Injectable } from '@angular/core';
import { Currency } from '../classes/currency';
import { User } from '../classes/user';
import { Wallet } from '../classes/wallet';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import swal from 'sweetalert2';

@Injectable()
export class WalletService {

  private walletUrl = 'http://localhost:8000/wallets';  // URL to web api

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
         errorMsg = error.error[key][0]
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

  getWallets (): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.walletUrl + '/')
      .pipe(
        // tap(currencies => console.log(`fetched wallets`)), // Do something
        catchError(this.handleError('fetch wallets', []))
      );
  }

  getWallet(id: number): Observable<Wallet> {
    const url = `${this.walletUrl}/${id}/`;
    return this.http.get<Wallet>(url).pipe(
      // tap(_ => console.log(`fetched wallet id=${id}`)), // Do something
      catchError(this.handleError<Wallet>('get wallet'))
    );
  }

  getWalletOfUser(user: User, currency: Currency): Observable<Wallet> {
    const url = `${this.walletUrl}/${user.id}/get_wallet_of_user/`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Wallet>(url, currency, httpOptions).pipe(
      // tap(_ => console.log(`fetched wallet of user =${user.username}`)), // Do something
      catchError(this.handleError<Wallet>(`getting ${user.username} wallet of ${currency.name}`))
    );

  }

  addWallet(wallet: Wallet): Observable<Wallet> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Wallet>(this.walletUrl + '/', wallet, httpOptions).pipe(
      // tap((wallet: Wallet) => console.log(`added wallet w/ id=${wallet.id}`)), // Do something
      catchError(this.handleError<Wallet>('add wallet'))
    );
  }

  deleteWallet (wallet: Wallet | number): Observable<Wallet> {
    const id = typeof wallet === 'number' ? wallet : wallet.id;
    const url = `${this.walletUrl}/${id}/`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete<Wallet>(url, httpOptions).pipe(
      // tap(_ => console.log(`deleted wallet id=${id}`)), // Do something
      catchError(this.handleError<any>('delete wallet', true))
    );
  }

}
