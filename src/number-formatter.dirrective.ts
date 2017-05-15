/**
 * Created by aharutyunyan on 5/11/2017.
 */
import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { NumberFormatterPipe } from "./number-formatter.pipe";

@Directive({ selector: "[myNumbersFormatter]" })
export class NumberFormatterDirective implements OnInit {

  @Input('myNumbersFormatter') fractionSize: number;
  private el: HTMLInputElement;
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/g);
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(
    private elementRef: ElementRef,
    private numberFormPipe: NumberFormatterPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.numberFormPipe.transform(parseFloat(this.el.value));
  }

  @HostListener('focus', ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.numberFormPipe.parse(value, this.fractionSize);
  }

  @HostListener('blur', ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.numberFormPipe.transform(value, this.fractionSize);
  }

  @HostListener('paste',['$event']) paste(event) {
    let current: string = event.clipboardData.getData('Text');
    if (!String(current).match(this.regex)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  @HostListener('keydown', [ '$event' ]) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
