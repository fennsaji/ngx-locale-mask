import { Directive, Input, forwardRef, HostListener, HostBinding, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgxLocaleMaskService } from '../ngx-locale-mask.service';
import { CurrencyOptions, NumberMask, PercentMask } from '../ngx-locale-mask.modal';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { registerLocaleData, formatCurrency } from '@angular/common';

@Directive({
  selector: 'input[type=text][localeCurrencyMask]'
  })
export class NgxLocaleCurrencyMaskDirective implements AfterViewInit {

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

  @Output('localCurrencyMaskChange')
  localCurrencyMaskChange: EventEmitter<number> = new EventEmitter<number>(true);

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
  public set currencyOptions(value: CurrencyOptions) {
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
            [, decCon] = decCon.split(this.decSep); //  Eg: '0.12234...' = > '12234...'
            decCon = decCon.trim();
         }
      }
    }
    
    var intCon = formatCurrency(int, localeName, currency, currencyCode, `${minIntegerDigits}.0-0`);
    var currencyReq = intCon.replace(new RegExp(`[0-9${this.digSep}]`, 'g'), '')
    intCon = intCon.replace(new RegExp(`[^0-9${this.digSep}]`, 'g'), '')

    var final = '';
    if(this.leftPos) { final+=currencyReq; }

    if (intCon !== undefined && decCon !== undefined) { 
      final += `${intCon}${this.decSep}${decCon}`; 
    } 

    if (!dotExist) { final += `${intCon}`; }

    if (dotExist && dec === '') { final += `${intCon}${this.decSep}` }

    var finalLength;
    if(!this.leftPos) {
      final+=currencyReq;
      finalLength = final.length;
    }
    // ¤

    switch (this.activeMask) {
      case 'date': { break; }
      case 'currency': {
        this.elementRef.value = final;
        if (finalLength !== undefined) { setTimeout(() => { 
          this.elementRef.setSelectionRange(finalLength-currencyReq.length, finalLength-currencyReq.length); 
        }, 0) }
        this.localCurrencyMaskChange.emit(+final);
        break;
      }
      case 'number': { break; }
      case 'percent': { break; }
    }
  }
}
// Next - remove alpha after 0
// Next - left and right pos currency code
// ∞