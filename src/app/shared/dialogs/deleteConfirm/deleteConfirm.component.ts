import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './deleteConfirm.component.html',
  styleUrls: ['./deleteConfirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  msg: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

    this.msg = data ? data : "NA";
  }
  
  ngOnInit() {
  }

}