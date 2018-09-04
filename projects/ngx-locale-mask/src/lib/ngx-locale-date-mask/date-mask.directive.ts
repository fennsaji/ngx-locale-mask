import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'input[type=text][localeDateMask]'
})
export class NgxLocaleDateMaskDirective {

  constructor(private el: ElementRef) { }

  elementRef: HTMLInputElement;

  ngAfterViewInit(): void {
    this.elementRef = this.el.nativeElement as HTMLInputElement;
  }

  @Output('localCurrencyMaskChange')
  localCurrencyMaskChange: EventEmitter<number> = new EventEmitter<number>(true);

}
