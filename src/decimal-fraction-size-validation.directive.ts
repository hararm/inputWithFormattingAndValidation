import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: "[myFractionalSizeValidator]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => FractionalSizeValidatorDirective), multi: true }
  ]
})

export class FractionalSizeValidatorDirective implements Validator {

  @Input('myFractionalSizeValidator') fractionSize: number;
  private DECIMAL_SEPARATOR: string;

  constructor() {
    this.DECIMAL_SEPARATOR = ".";
  }

  validate(c: AbstractControl): { [key: string]: any } {
    let [ integer, fraction = "" ] = (c.value || "").toString()
      .split(".");
    if(integer > 0 && parseInt(fraction, 10) > 0) {
      // value not equal
      if (fraction.length !== this.fractionSize) return {
        validateEqual: false
      }
    }
    return null;
  }
}
