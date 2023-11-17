import { Component, Inject, OnInit } from '@angular/core';
import { MtlPreIssuTableService } from '../mtl-pre-issu-table.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { StrUtils } from 'src/app/utils/strUtils';

interface inputData {
	mtlNo: string;
  mtlSeq: string;
  newOld: string;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  locationList: string[] = [];
  private _mesg: string;

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: inputData,
		private svc: MtlPreIssuTableService,
		private dialogRef: MatDialogRef<LocationListComponent>,
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

    let newOld: string;
    if (StrUtils.isEmpty(this.data.newOld)){
      newOld = 'NULL';
    } else {
      newOld = this.data.newOld;
    }

		this.svc.getLocation(this.data.mtlNo, mtlSeq, newOld)
			.subscribe(resp => {
        console.log(resp.data);
        
				this.locationList = resp.data;
			})
	}

  cancel() {
    this.dialogRef.close(null);
  }
  
	select(location: string) {
		this.dialogRef.close(location);
	}  

}
