import { Component } from '@angular/core';
import localeEU from '@angular/common/locales/en-DE';
import localeIN from '@angular/common/locales/en-IN';
import localeAU from '@angular/common/locales/en-AU';

import { CurrencyOptions } from 'ngx-locale-mask';
import { registerLocaleData, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ngx-locale-mask-app';
  locale = localeIN;
  maskOptions: CurrencyOptions;
  localeArr = ['en-IN', 'en-DE', 'en-AU'];

  _val;
  set val(val) { this._val = val; console.log(val) };
  get val() { return this._val }

  constructor() {
    this.maskOptions = { localeName: 'en-IN', currency: '₹', currencyCode: '$', digitsInfo: '2.1-4' };
    registerLocaleData(this.locale) 
  }

  changeLocale(data) {
    if(data == 'en-DE') {
      this.maskOptions = { localeName: 'en-DE', currency: 'EUR', currencyCode: '$', digitsInfo: '3.0-4' };
      this.locale = localeEU;
    } else if(data == 'en-IN') {
      this.maskOptions = { localeName: 'en-IN', currency: '₹', currencyCode: '$', digitsInfo: '2.1-4' };
      this.locale = localeIN;
    } else {
      this.maskOptions = { localeName: 'en-AU', currency: '$', currencyCode: '$', digitsInfo: '1.0-4' };
      this.locale = localeAU;
    }
    registerLocaleData(this.locale) 
  }
}
