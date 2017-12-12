import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../services/currency.service';
import { Currency } from './../../classes/currency';

import swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  currencies: Currency[];
  selectedCurrency: Currency;

  onSelect(currency: Currency): void {
    this.selectedCurrency = currency;
  }

  getCurrencies(): void {
    this.currencyService.getCurrencies()
        .subscribe(currencies => this.currencies = currencies);
  }

  showError(error:string): void {
    swal({
           title: error,
           type: 'error',
     });
  }

  add(name: string, symbol: string): void {
    name = name.trim();
    symbol = symbol.trim();

    if (!name) return this.showError('Must enter a name');
    if (!symbol) return this.showError('Must enter a symbol');
    if (symbol.length > 5) return this.showError('Ensure symbol has no more than 5 characters');

    this.currencyService.addCurrency({ name, symbol } as Currency)
      .subscribe(currency => {
        if (currency) {
          $('#currencyModal').modal('hide');

          swal({
            title: 'Currency created',
            type: 'success',
          })

          this.currencies.push(currency);
        }
      });
  }

  delete(currency: Currency): void {
    swal({
      title: 'Are you sure?',
      text: `All wallets with ${currency.name} currency will be destroy`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.currencyService.deleteCurrency(currency).subscribe(error => {
          if (error) return;
          
          this.currencies = this.currencies.filter(c => c !== currency);

          swal(
            'Deleted!',
            `The currency ${currency.name} was deleted`,
            'success'
          )
        });
      }
    })
  }

  
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies();
  }

}