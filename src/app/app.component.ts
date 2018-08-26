import { Component } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { CurrencyMask } from 'ngx-locale-mask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ngx-locale-mask-app';
  locale = localeFr;
  maskOptions: CurrencyMask;

  constructor() {
    this.maskOptions = { currency: 'USD', currencyCode: 'USD', digitsInfo: '0.0-3' };
  }
}
