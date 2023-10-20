import { Component, OnInit } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  private operationSubject: Subject<any> = new Subject();

  constructor(private overlayRef: OverlayRef) { 
  }

  ngOnInit() {
  }

  afterClose(): Observable<any> {
    return this.operationSubject.asObservable();
  }

  action(operation: string) {
    this.overlayRef.detach();
    this.overlayRef.dispose();

    this.operationSubject.next(operation);
    this.operationSubject.complete();
  }

}
