import { NgModule } from '@angular/core';
import { NgxLocaleMaskComponent } from './ngx-locale-mask.component';
import { NgxLocaleMaskDirective } from './ngx-locale-mask.directive';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';


@NgModule({
  imports: [
  ],
  declarations: [NgxLocaleMaskComponent, NgxLocaleMaskDirective],
  exports: [NgxLocaleMaskComponent, NgxLocaleMaskDirective],
  providers: [NgxLocaleMaskService]
})
export class NgxLocaleMaskModule { }
