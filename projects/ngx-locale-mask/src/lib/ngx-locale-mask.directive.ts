import { Directive, Input, forwardRef, HostListener, HostBinding, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgxLocaleMaskService } from './ngx-locale-mask.service';
import { DateMask, CurrencyMask, NumberMask, PercentMask } from './ngx-locale-mask.modal';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { registerLocaleData, formatCurrency } from '@angular/common';

@Directive({
  selector: 'input[type=text][localeMask]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxLocaleMaskDirective), multi: true } ]
})
export class NgxLocaleMaskDirective implements ControlValueAccessor, AfterViewInit {

  ngAfterViewInit(): void {
    this.elementRef = this.el.nativeElement as HTMLInputElement;
  }

  constructor(private _ngxLocaleMaskService: NgxLocaleMaskService,
              private el: ElementRef) { 
  }

  activeMask: string;
  elementRef: HTMLInputElement;
  test;

  @Output('localMaskChange')
  localMaskChange: EventEmitter<number> = new EventEmitter<number>(true);

  @Input()
  public set locale(value: Object) {
    this._ngxLocaleMaskService.locale = value.toString();
    registerLocaleData(this._ngxLocaleMaskService.locale);
  }

  @Input()
  public set dateMask(value: DateMask) {
    this._ngxLocaleMaskService.maskCategoryAndOptions = value;
    this.activeMask = 'date';
  }
  @Input()
  public set currencyMask(value: CurrencyMask) {
    this._ngxLocaleMaskService.maskCategoryAndOptions = value;
    this.activeMask = 'currency';
  }
  @Input()
  public set numberMask(value: NumberMask) {
    this._ngxLocaleMaskService.maskCategoryAndOptions = value;
    this.activeMask = 'number';
  }
  @Input()
  public set percentMask(value: PercentMask) {
    this._ngxLocaleMaskService.maskCategoryAndOptions = value;
    this.activeMask = 'percent';
  }


  @HostListener('input', ['$event'])
  onTyping(e) {
    let value = e.target.value;
    const { format = '', timezone = '', currency = '', currencyCode = '' } = { ...this._ngxLocaleMaskService.maskCategoryAndOptions };
    let digitsInfo = this._ngxLocaleMaskService.maskCategoryAndOptions.digitsInfo;

    digitsInfo = digitsInfo.substr(0, 2) + '0' + digitsInfo.substr(3);

    const regex = new RegExp(`${currency}` ,"g");
    value = value.replace(regex, '');
    value = value.replace(/,/g, '');
    const endsWithDot =  /^[0-9]*(\.)+$/.test(value);
    const zerosAfterDot =  /^[0-9]*\.[0-9]*[0]+$/.test(value);
    var val = +value.replace(/[^0-9.]/g, '');

    if (/\./.test(value) === true) { 
      var decInt = value.split('.'); 
      if (decInt.length > 2) { 
        var val = +`${decInt[0]}.${decInt[1]}`;
      }
    }

    if(/\./.test(value) === true && decInt[1].length <= +digitsInfo.substr(4) || /\./.test(value) === false) {
      this.localMaskChange.emit(val);
    }
    var condition = formatCurrency(val, this._ngxLocaleMaskService.locale, currency, currencyCode, digitsInfo);

    switch (this.activeMask) {
      case 'date': { break; }
      case 'currency': {
        if (!zerosAfterDot  && !endsWithDot && condition !== undefined) { 
          this.elementRef.value = condition; 
        }
        if (zerosAfterDot) {
           this.elementRef.value = condition + '0';
        }
        break;
      }
      case 'number': { break; }
      case 'percent': { break; }
    }
  }




  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}

// ∞