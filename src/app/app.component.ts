import { Component } from '@angular/core';
import localeIn from '@angular/common/locales/en-IN';
import { CurrencyMask } from 'ngx-locale-mask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ngx-locale-mask-app';
  locale = localeIn;
  maskOptions: CurrencyMask;

  constructor() {
    this.maskOptions = { currency: 'INR', currencyCode: 'INR', digitsInfo: '1.0-3' };
  }
}
