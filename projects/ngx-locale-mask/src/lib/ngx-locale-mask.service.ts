import { Injectable } from '@angular/core';
import { DateMask, CurrencyOptions, PercentMask, NumberMask } from './ngx-locale-mask.modal';

@Injectable()
export class NgxLocaleMaskService {

  constructor() { }

  locale: string;
  maskCategoryAndOptions: DateMask | CurrencyOptions | NumberMask | PercentMask | any;
}
