import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { WalletService } from './services/wallet.service';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { TransactionService } from './services/transaction.service';
import { AppComponent } from './components/app/app.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { WalletsComponent } from './components/wallets/wallets.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TransactionsComponent } from './components/transactions/transactions.component'

@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencyDetailComponent,
    NavbarComponent,
    WalletsComponent,
    LoginComponent,
    TransactionsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CurrencyService,
    WalletService,
    LoginService,
    UserService,
    TransactionService,
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
