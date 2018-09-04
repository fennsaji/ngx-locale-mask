import { NgModule } from '@angular/core';
import { NgxLocaleCurrencyMaskDirective } from './ngx-locale-currency-mask.directive';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';
import { NgxLocalePercentageMaskDirective } from './ngx-locale-percentage-mask/ngx-locale-percentage-mask.directive';


@NgModule({
  imports: [
  ],
  declarations: [NgxLocaleCurrencyMaskDirective, NgxLocalePercentageMaskDirective],
  exports: [NgxLocaleCurrencyMaskDirective, NgxLocalePercentageMaskDirective],
  providers: [NgxLocaleMaskService]
})
export class NgxLocaleMaskModule { }
