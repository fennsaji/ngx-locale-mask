import { NgModule } from '@angular/core';
import { NgxLocaleCurrencyMaskDirective } from './ngx-locale-currency-mask.directive';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';


@NgModule({
  imports: [
  ],
  declarations: [NgxLocaleCurrencyMaskDirective],
  exports: [NgxLocaleCurrencyMaskDirective],
  providers: [NgxLocaleMaskService]
})
export class NgxLocaleMaskModule { }
