import { Currency } from './../../classes/currency';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CurrencyService }  from './../../services/currency.service';
import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';

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

  showError(error:string): void {
    swal({
           title: error,
           type: 'error',
     });
  }

  save(): void {

    if (!this.currency.name) return this.showError('Must enter a name');
    if (!this.currency.symbol) return this.showError('Must enter a symbol');
    if (this.currency.symbol.length > 5) return this.showError('Ensure symbol has no more than 5 characters');

     this.currencyService.updateCurrency(this.currency)
       .subscribe((c) => {
         if (c) {
           swal({
             title: 'Currency updated',
             type: 'success',
           }).then(_ => this.goBack())
         }
       });
   }

  goBack = () => this.location.back()

}
