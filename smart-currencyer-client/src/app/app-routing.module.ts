import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrencyDetailComponent }  from './currency-detail/currency-detail.component';

const routes: Routes = [
  { path: 'currencies', component: CurrenciesComponent },
  { path: '', redirectTo: '/currencies', pathMatch: 'full' },
  { path: 'detail/:id', component: CurrencyDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
