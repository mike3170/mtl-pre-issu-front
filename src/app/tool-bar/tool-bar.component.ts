import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  outInsert = new EventEmitter<void>();
  @Output()
  outUpdate = new EventEmitter<void>()
  @Output()
  outDelete = new EventEmitter<void>();
  @Output()
  outQuery = new EventEmitter<void>();
  @Output()
  outFindWindow = new EventEmitter<void>();
  @Output()
  outPrev = new EventEmitter<void>();
  @Output()
  outNext = new EventEmitter<void>();
  @Output()
  outClear = new EventEmitter<void>();

  @Input()
  progTitleChild: string;
  @Input()
  hasData: boolean;

  onInsert() {
    this.outInsert.emit();
  }
  onUdpate() {
    this.outUpdate.emit();
  }
  onDelete() {
    this.outDelete.emit();
  }
  onQuery() {
    this.outQuery.emit();
  }
  onFindWindow() {
    this.outFindWindow.emit();
  }  
  onPrev() {
    this.outPrev.emit();
  }
  onNext() {
    this.outNext.emit();
  }
  onClearForm() {
    this.outClear.emit();
  }
}
