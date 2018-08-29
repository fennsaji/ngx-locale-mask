import { Component } from '@angular/core';
import locale from '@angular/common/locales/en-DE';
import { CurrencyMask } from 'ngx-locale-mask';

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
    this.maskOptions = { currency: 'EUR', currencyCode: 'EUR', digitsInfo: '3.0-4' };
  }
}
