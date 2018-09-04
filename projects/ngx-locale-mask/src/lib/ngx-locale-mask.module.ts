import { NgModule } from '@angular/core';
import { NgxLocaleCurrencyMaskDirective } from './ngx-locale-currency-mask/ngx-locale-currency-mask.directive';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';
import { NgxLocaleDateMaskDirective } from './ngx-locale-date-mask/date-mask.directive';


@NgModule({
  imports: [
  ],
  declarations: [NgxLocaleCurrencyMaskDirective, NgxLocaleDateMaskDirective],
  exports: [NgxLocaleCurrencyMaskDirective, NgxLocaleDateMaskDirective],
  providers: [NgxLocaleMaskService]
})
export class NgxLocaleMaskModule { }
