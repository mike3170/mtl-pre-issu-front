import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[width]'
})
export class WidthDirective implements OnInit{

 @Input("width")
  width: string = "";

  units = ["em", "rem", "px"];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (!this.width) {
      throw new Error("WthDirective width not set.");
    }

    // ES6
    const hasUnit = this.units.some(x =>  this.width.endsWith(x));
    //console.log("hasUnit: " + hasUnit);

    if (! hasUnit) {
      this.width = this.width + "px";
    }

    //console.log("width: " + this.width);
    //this.renderer.setStyle(this.elRef.nativeElement, "width", this.width);
		this.elRef.nativeElement.style.width = this.width;
  }

}
