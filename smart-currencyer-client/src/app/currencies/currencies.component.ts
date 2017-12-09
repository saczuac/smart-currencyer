import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../services/currency.service';
import { Currency } from './../classes/currency';


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

  add(name: string, symbol: string): void {
    name = name.trim();
    symbol = symbol.trim();
    if (!name) { return; }
    if (!symbol) { return; }
    this.currencyService.addCurrency({ name, symbol } as Currency)
      .subscribe(currency => {
        this.currencies.push(currency);
      });
  }

  delete(currency: Currency): void {
    this.currencies = this.currencies.filter(c => c !== currency);
    this.currencyService.deleteCurrency(currency).subscribe();
  }

  
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.getCurrencies();
  }

}