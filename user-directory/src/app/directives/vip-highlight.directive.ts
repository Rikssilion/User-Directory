import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVipHighlight]',
  standalone: true
})
export class VipHighlightDirective implements OnChanges {
  @Input('appVipHighlight') isVip = false;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnChanges() {
    if (this.isVip) {
      this.r.setStyle(this.el.nativeElement, 'background-color', '#fff3cd'); // мягло-жёлтый
      this.r.setStyle(this.el.nativeElement, 'font-weight', '600');
    } else {
      this.r.removeStyle(this.el.nativeElement, 'background-color');
      this.r.removeStyle(this.el.nativeElement, 'font-weight');
    }
  }
}
