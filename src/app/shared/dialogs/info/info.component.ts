import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {;
  msg: string

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { 
    this.msg = data ? data : "NA";

  }

  ngOnInit() {
  }

}
