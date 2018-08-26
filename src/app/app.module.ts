import { NgxLocaleMaskModule } from 'ngx-locale-mask';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxLocaleMaskModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
