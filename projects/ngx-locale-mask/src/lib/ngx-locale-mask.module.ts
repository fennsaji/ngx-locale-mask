import { NgModule } from '@angular/core';
import { NgxLocaleMaskDirective } from './ngx-locale-mask.directive';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';


@NgModule({
  imports: [
  ],
  declarations: [NgxLocaleMaskDirective],
  exports: [NgxLocaleMaskDirective],
  providers: [NgxLocaleMaskService]
})
export class NgxLocaleMaskModule { }
