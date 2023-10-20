import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy, ConnectionPositionPair, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@Injectable()
export class ContextMenuService {

  constructor(
    private overlay: Overlay, 
    private injector: Injector) {
  }

  // context is the component to show
  open(e: MouseEvent): ContextMenuComponent {
    const overlayRef = this.overlay.create(this.getOverlayConfig(e.x + 1, e.y + 1));

		overlayRef.keydownEvents()
			.subscribe(e => {
				if (e.key === "Escape") {
					overlayRef.detach();
					overlayRef.dispose();
					return;
				}
			});

    overlayRef.backdropClick()
      .subscribe(x => {
        overlayRef.detach();
        overlayRef.dispose();
        return;
      });

    //const popoverRef = new PopoverRef<T>(overlayRef, content, data);

    // make overlayRef can be constructor inject
    const injector = this.createInjector(overlayRef, this.injector);

    const compRef: ComponentRef<any> = overlayRef.attach(new ComponentPortal(ContextMenuComponent, null, injector));
    return compRef.instance;
  }


  private getOverlayConfig(x: number, y: number): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'contextmenu-backdrop',
      positionStrategy: this.getOverlayPosition(x, y),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(x: number, y: number): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions(this.getPositions())
      .withPush(false);
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
      }
    
    ];

  }

  private createInjector(overlayRef: OverlayRef, injector: Injector) {
    const tokens = new WeakMap();
    tokens.set(OverlayRef, overlayRef);
    return new PortalInjector(injector, tokens);
  }

}
