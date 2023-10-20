import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dirty-confirm',
  templateUrl: './dirtyConfirm.component.html',
  styleUrls: ['./dirtyConfirm.component.scss']
})
export class DirtyConfirmComponent implements OnInit {
  msg: string;

  constructor(
    public dialogRef: MatDialogRef<DirtyConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    this.msg = data ? data : "資料已被異動，是否要離開此筆資料?";
	}
  
  ngOnInit() {
  }

	// leave: true, stay: false
	close(stayOrLeave : "stay" | "leave") {
		this.dialogRef.close(stayOrLeave === "leave" ? true : false);
	}

}