import { Injectable } from '@angular/core';
import { DateMask, CurrencyMask, PercentMask, NumberMask } from './ngx-locale-mask.modal';

@Injectable()
export class NgxLocaleMaskService {

  constructor() { }

  locale: string;
  maskCategoryAndOptions: DateMask | CurrencyMask | NumberMask | PercentMask | any;
}
