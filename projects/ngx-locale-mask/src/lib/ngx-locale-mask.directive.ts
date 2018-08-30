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

  digSep;
  decSep;
  leftPos;

  @Output('localMaskChange')
  localMaskChange: EventEmitter<number> = new EventEmitter<number>(true);

  @Input()
  public set locale(value: Object) {
    console.log(value);
    this.decSep = value[13][0];
    this.digSep = value[13][1];
    this.leftPos = value[14][2][0] === '¤' ? true : false;

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
    const { format = '', timezone = '', currency = '', currencyCode = '', digitsInfo = '', localeName = '' } = { ...this._ngxLocaleMaskService.maskCategoryAndOptions };

    const decSepRegex = new RegExp(`[^0-9${this.decSep}]`, "g");
    var val = value.replace(decSepRegex, ''); // Removes anything other than decSep
    let minIntegerDigits = digitsInfo.substr(0,1); // 'i.d-l' -> i
    let maxFractionDigits = digitsInfo.substr(4); // 'i.d-l' => l
    let int = +val.replace(this.decSep,".");
    // let int = +val; // converting to number
    if (this.decSep !== '.') {
      var dotExistRegex = new RegExp(`${this.decSep}`, "g");
    } else {
      var dotExistRegex = new RegExp(`\\${this.decSep}`, "g");
    }
    let dotExist = dotExistRegex.test(value); // existence of atleast one degSep

    if (dotExist === true) {
      var [intInside, dec] = val.split(this.decSep); // splitting into two at first dot
      int = intInside;
      if (/0$/.test(dec) === true && dec.length <= maxFractionDigits) { return } // if dec part ends with 0 exit this scope
      if (dec !== '' || dec.length > maxFractionDigits) { // if dec exist or maxFractionDigits > length of dec part
        if (dec.length > maxFractionDigits) { 
            decCon = dec.substr(0, maxFractionDigits); // stake the first maxFractionDigits to decCon
         } else { 
            var decCon = formatCurrency(+`0.${dec}`, localeName, '','',`0.0-${maxFractionDigits}`);
            decCon = decCon.substr(2); //  Eg: '0.12234...' = > '12234...'
         }
      }
    }
    
    var intCon = formatCurrency(int, localeName, currency, currencyCode, `${minIntegerDigits}.0-0`);

    if (intCon !== undefined || decCon !== undefined) {
      if(this.leftPos) {
        var final = `${intCon}${this.decSep}${decCon}`; 
      } else {
        // 154EUR
        const decSepRegex = new RegExp(`[^0-9${this.digSep}]`, "g");
        var digPart = intCon.replace(decSepRegex, '');
        var curPart = intCon.replace(/[0-9]/g, '');
        var final = `${digPart}${this.decSep}${decCon}${curPart}`;
        var finalLength = final.length - curPart.length;
        console.log('final length' + finalLength)
      }
    } 
    if (!dotExist) { 
      var final = `${intCon}`;
      var finalLength = final.length;
    }
    if (dotExist && dec === '') {
      if (this.leftPos) {
        var final = `${intCon}${this.decSep}` 
      } else {
        const decSepRegex = new RegExp(`[^0-9${this.digSep}]`, "g");
        var digPart = intCon.replace(decSepRegex, '');
        var curPart = intCon.replace(/[0-9]/g, '');
        var final = `${digPart}${this.decSep}${curPart}`
      }
    }
    // ¤

    switch (this.activeMask) {
      case 'date': { break; }
      case 'currency': {
        this.elementRef.value = final;
        if (finalLength !== undefined) { setTimeout(() => { this.elementRef.setSelectionRange(finalLength-4, finalLength-4); }, 0) }
        final = final.replace(decSepRegex, '');
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