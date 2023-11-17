import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MtlPreIssuTableService } from '../mtl-pre-issu-table.service';
import { UntypedFormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

interface inputData {
	mtlNo: string;
}

@Component({
  selector: 'app-mtl-seq-list',
  templateUrl: './mtl-seq-list.component.html',
  styleUrls: ['./mtl-seq-list.component.scss']
})
export class MtlSeqListComponent implements OnInit {

  mtlSeqList: string[] = [];
  private _mesg: string;

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private svc: MtlPreIssuTableService,
		private dialogRef: MatDialogRef<MtlSeqListComponent>,
		private fb: UntypedFormBuilder,
		private dialogService: DialogService    
  ) { }

  ngOnInit(): void {
    this.search();
  }

	async search() {
		this.svc.getMtlSeq(this.data.mtlNo)
			.subscribe(resp => {
				this.mtlSeqList = resp.data;
			})
	}

	select(mtlSeq: string) {
		this.dialogRef.close(mtlSeq);
	}  
	
	cancel() {
		this.dialogRef.close(null);
	  }
}
