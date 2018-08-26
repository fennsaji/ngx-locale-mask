import { Injectable } from '@angular/core';
import { DateMask, CurrencyMask, PercentMask, NumberMask } from './ngx-locale-mask.modal';

@Injectable()
export class NgxLocaleMaskService {

  constructor() { }

  locale: {};
  maskCategoryAndOptions: DateMask | CurrencyMask | NumberMask | PercentMask;
}
