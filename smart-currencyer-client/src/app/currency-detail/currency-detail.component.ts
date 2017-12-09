import { Currency } from './../classes/currency';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CurrencyService }  from './../services/currency.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit {

  currency: Currency;

  constructor(
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.currencyService.getCurrency(id)
      .subscribe(currency => this.currency = currency);
  }

  save(): void {
     this.currencyService.updateCurrency(this.currency)
       .subscribe(() => this.goBack());
   }

  goBack = () => this.location.back()

}
