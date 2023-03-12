import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'fa-input input, fa-input select'
})
export class InputRefDirective {

  focus = false;

  constructor() {}

   @HostListener('focus')
   onFocus() {
    this.focus = true;
   }

   @HostListener('blur')
   onBlur() {
    this.focus = false;
   }
}
