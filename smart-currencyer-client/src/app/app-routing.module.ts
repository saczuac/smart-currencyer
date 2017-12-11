import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { WalletsComponent } from './components/wallets/wallets.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { LoginComponent } from './components/login/login.component';
import { CurrencyDetailComponent }  from './components/currency-detail/currency-detail.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'currencies', component: CurrenciesComponent, canActivate: [AuthGuard] },
  { path: 'wallets', component: WalletsComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: CurrencyDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
