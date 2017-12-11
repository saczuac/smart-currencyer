import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../services/currency.service';
import { WalletService } from './../../services/wallet.service';
import { LoginService } from './../../services/login.service';
import { Currency } from './../../classes/currency';
import { Wallet } from './../../classes/wallet';
import { User } from './../../classes/user';

import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  selectedCurrency: Currency;
  wallets: Wallet[];
  selectedWallet: Wallet;
  currencies: Currency[];

  constructor(
    private currencyService: CurrencyService,
    private walletService: WalletService,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.getCurrencies();
    this.getWallets();
  }

  onSelect(wallet: Wallet): void {
    this.selectedWallet = wallet;
  }

  getCurrencies(): void {
    this.currencyService.getHaventCurrencies()
        .subscribe(currencies => this.currencies = currencies);
  }

  getWallets(): void {
    this.walletService.getWallets()
        .subscribe(wallets => this.wallets = wallets);
  }

  add(): void {
    if (!this.selectedCurrency) { return; }
    const balance = 0
    const currency = this.selectedCurrency

    this.walletService.addWallet({ balance, currency } as Wallet)
      .subscribe(wallet => {

        if (wallet) {
          $('#walletModal').modal('hide');

          swal({
            title: 'Wallet created',
            type: 'success',
          })

          this.wallets.push(wallet);
        } else {
          swal({
            title: 'Error creating wallet',
            type: 'error',
          })
        }

      });
  }

  delete(wallet: Wallet): void {
    swal({
      title: 'Are you sure?',
      text: `The wallet of ${wallet.currency.name} currency will be destroy`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          `The wallet of ${wallet.currency.name} was deleted`,
          'success'
        )
        this.wallets = this.wallets.filter(w => w !== wallet);
        this.walletService.deleteWallet(wallet).subscribe();
      }
    })
  }

}
