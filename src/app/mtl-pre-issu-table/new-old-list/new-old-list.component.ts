import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MtlPreIssuTableService } from '../mtl-pre-issu-table.service';
import { UntypedFormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { StrUtils } from 'src/app/utils/strUtils';

interface inputData {
	mtlNo: string;
  mtlSeq: string;
}

@Component({
  selector: 'app-new-old-list',
  templateUrl: './new-old-list.component.html',
  styleUrls: ['./new-old-list.component.scss']
})
export class NewOldListComponent implements OnInit {
  newOldList: string[] = [];
  private _mesg: string;

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private svc: MtlPreIssuTableService,
		private dialogRef: MatDialogRef<NewOldListComponent>,
		private fb: UntypedFormBuilder,
		private dialogService: DialogService    
  ) { }

  ngOnInit(): void {
    this.search();
  }

	async search() {
    let mtlSeq: string;
    if (StrUtils.isEmpty(this.data.mtlSeq)){
      mtlSeq = 'NULL';
    } else {
      mtlSeq = this.data.mtlSeq;
    }
    
		this.svc.getNewOld(this.data.mtlNo, mtlSeq)
			.subscribe(resp => {
				this.newOldList = resp.data;
        console.log(resp);
        
			})
	}

	select(newOld: string) {
		this.dialogRef.close(newOld);
	}

  cancel() {
    this.dialogRef.close(null);
  }
}
