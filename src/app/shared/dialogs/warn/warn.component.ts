import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss']
})
export class WarnComponent implements OnInit {
  msg: string;
  title: string = "";
  reason: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.msg = data;
    if (this.msg.includes("\n")) {
      const arr = this.msg.split("\n");
      this.title = arr[0];
      this.reason = arr[1];
    } else {
      this.title = this.msg;
      this.reason = "";
    }

  }

  ngOnInit() {
  }


}
