import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { AppComponent } from './components/app/app.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencyDetailComponent,
    NavbarComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
