import { Component } from '@angular/core';
import locale from '@angular/common/locales/en-IN';
import localeIN from '@angular/common/locales/en-IN';

import { CurrencyMask } from 'ngx-locale-mask';
import { registerLocaleData, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ngx-locale-mask-app';
  locale = locale;
  maskOptions: CurrencyMask;

  _val;
  set val(val) { this._val = val; console.log(val) };
  get val() { return this._val }

  constructor() {
    registerLocaleData(locale)
    this.maskOptions = { localeName: 'en-IN', currency: 'INR', currencyCode: 'EUR', digitsInfo: '3.0-4' };
    document.write(formatCurrency(1233.545, 'en-IN', 'EUR','EUR',''))

  }
}
