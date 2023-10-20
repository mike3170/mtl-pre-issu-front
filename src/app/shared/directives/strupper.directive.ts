import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


@Directive({
  selector: '[upper-case]'
})
export class UppercaseDirective {
  //lastValue: string;


  constructor(private ref: ElementRef) {
  }


  @HostListener('input', ['$event'])
  onInput(evt: any) {
    if (!(evt instanceof InputEvent)) {
      return;
    }


    const input = evt.target as HTMLInputElement;


    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.toUpperCase();


    input.setSelectionRange(start, end);


    //this.lastValue = this.ref.nativeElement.value = input.value;
    const e = document.createEvent('HTMLEvents');
    e.initEvent('input', false, true);
    input.dispatchEvent(e);


  }



}

// import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

// @Directive({
// selector: '[upper-case]'
// })
// export class UppercaseDirective {

// constructor(private elmRef: ElementRef, private renderer: Renderer2) { }

// @HostListener('input', ['$event'])
// onInput(event: any) {
// const text_upper = event.target.value.toUpperCase();
// this.renderer.setProperty(this.elmRef.nativeElement, 'value', text_upper);

// const htmlEvent = new Event('input', { "bubbles": true, "cancelable": true });
// event.target.dispatchEvent(htmlEvent);
// };

// }