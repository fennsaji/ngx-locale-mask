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
    const { format = '', timezone = '', currency = '', currencyCode = '', digitsInfo = '' } = { ...this._ngxLocaleMaskService.maskCategoryAndOptions };

    var val = value.replace(/[^0-9.]/g, ''); // Remove anything other than numbers or dots.
    let minIntegerDigits = digitsInfo.substr(0,1); // 'i.d-l' -> i
    let maxFractionDigits = digitsInfo.substr(4); // 'i.d-l' => l

    let int = +val; // converting to number
    let dotExist = /\./.test(value); // existence of atleast one dot

    if (dotExist === true) {
      var [intInside, dec] = val.split('.'); // splitting into two at first dot
      int = intInside;
      if (/0$/.test(dec) === true && dec.length <= maxFractionDigits) { return } // if dec part ends with 0 exit this scope
      if (dec !== '' || dec.length > maxFractionDigits) { // if dec exist or maxFractionDigits > length of dec part
        if (dec.length > maxFractionDigits) { 
            decCon = dec.substr(0, maxFractionDigits); // stake the first maxFractionDigits to decCon
         } else { 
            var decCon = formatCurrency(+`0.${dec}`, this._ngxLocaleMaskService.locale, '','',`0.0-${maxFractionDigits}`);
            decCon = decCon.substr(2); //  Eg: '0.12234...' = > '12234...'
         }
      }
    }
    
    var intCon = formatCurrency(int, this._ngxLocaleMaskService.locale, currency, currencyCode, `${minIntegerDigits}.0-0`);

    if (intCon !== undefined && decCon !== undefined) { var final = `${intCon}.${decCon}`; } 
    if (!dotExist) { var final = `${intCon}`; }
    if (dotExist && dec === '') { var final = `${intCon}.` }

    switch (this.activeMask) {
      case 'date': { break; }
      case 'currency': {
        this.elementRef.value = final;
        final = final.replace(/[^0-9.]/g, '');
        this.localMaskChange.emit(+final);
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