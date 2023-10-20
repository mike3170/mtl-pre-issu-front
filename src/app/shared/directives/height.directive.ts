import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[height]'
})
export class HeightDirective implements OnInit{

 @Input("height")
 height: string = "";

  units = ["em", "rem", "px"];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (!this.height) {
      throw new Error("WthDirective width not set.");
    }

    // ES6
    const hasUnit = this.units.some(x =>  this.height.endsWith(x));
    //console.log("hasUnit: " + hasUnit);

    if (! hasUnit) {
      this.height = this.height + "px";
    }

		this.elRef.nativeElement.style.height = this.height;
  }

}
