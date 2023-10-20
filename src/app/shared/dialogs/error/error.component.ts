import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  msg: string;
  msgArr: String[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.msg = data ? data : "no messages";

    if (data.includes("\n")) {
      this.msgArr = data.split("\n");
    } else {
      this.msgArr = [data];
    }

  }

  ngOnInit() {
  }

}
