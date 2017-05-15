import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NumberFormatterPipe } from '../number-formatter.pipe';
import { NumberFormatterDirective } from '../number-formatter.dirrective';
import {FractionalSizeValidatorDirective } from '../decimal-fraction-size-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    NumberFormatterPipe,
    NumberFormatterDirective,
    FractionalSizeValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports:[NumberFormatterPipe, NumberFormatterDirective],
  providers: [NumberFormatterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
