import { PercentMask } from './../ngx-locale-mask.modal';
import { registerLocaleData, formatPercent } from '@angular/common';
import { Directive, AfterViewInit, ElementRef, Output, EventEmitter, Input, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type=text][localePercentageMask]'
})
export class NgxLocalePercentageMaskDirective implements AfterViewInit {
  elementRef: HTMLInputElement
  localeFile;
  maskCategoryAndOptions;

  constructor( private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef = this.el.nativeElement as HTMLInputElement;
  }

  @Output('localPercentageMaskChange')
  localPercentageMaskChange: EventEmitter<number> = new EventEmitter<number>(true);

  @Input()
  public set locale(value: Object) {
    this.locale = value.toString();
    registerLocaleData(this.locale);
  }

  @Input()
  public set percentOptions(value: PercentMask) {
    this.maskCategoryAndOptions = value;
    // this.activeMask = 'percent';
  }

  @HostListener('input', ['$event'])
  onTyping(e) {
    let value = e.target.value;
    const {   
      digitsInfo = '', 
      localeName = '' } = 
      { 
        ...this.maskCategoryAndOptions 
      };

    let outputValue = formatPercent(value, localeName, digitsInfo);
    console.log(outputValue)
    this.elementRef.value = outputValue
  }
}
