import { Component, Inject, OnInit } from '@angular/core';
import { MtlPreIssuTableService } from '../mtl-pre-issu-table.service';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StrUtils } from 'src/app/utils/strUtils';
import { ApiStatus } from 'src/app/core/etc/models/api.model';
import { Constants } from 'src/app/core/etc/constants/constants';
import { MtlSeqListComponent } from '../mtl-seq-list/mtl-seq-list.component';
import { filter } from 'rxjs';
import { NewOldListComponent } from '../new-old-list/new-old-list.component';
import { LocationListComponent } from '../location-list/location-list.component';

interface ModiData {
  sheetNo: string;
  itemNo: number;
  seqNo: number;
  mtlNo: string;
  mtlName: string;
  mtlSpec: string;
  mtlSeq: string;
  newOld: string;
  location: string;
  stkQty: string;
  prepQty: string;
  issuQty: string;
  confYn: string;
  confDate: Date;
  issuYn: string;
  issuNo: string;
  issuDate: Date;
  editDate: Date;
  editEmp: string;
  recordColor: string;
}

@Component({
  selector: 'app-modi-chk',
  templateUrl: './modi-chk.component.html',
  styleUrls: ['./modi-chk.component.scss']
})
export class ModiChkComponent implements OnInit {
  formModi: UntypedFormGroup;
  modiData: ModiData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MtlPreIssuTableService: MtlPreIssuTableService,
    private dialogRef: MatDialogRef<ModiChkComponent>,
    private dialogService: DialogService,
    private fb: UntypedFormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.data.data.issuQty = null;
    this.formModi.controls['mtlNo'].setValue(this.data.data.mtlNo);
    this.formModi.controls['mtlName'].setValue(this.data.data.mtlName);
    this.formModi.controls['mtlSpec'].setValue(this.data.data.mtlSpec);

    this.formModi.controls['sheetNo']?.setValue(this.data.data.sheetNo);
    this.formModi.controls['itemNo']?.setValue(this.data.data.itemNo);
    this.formModi.controls['seqNo']?.setValue(this.data.data.seqNo);
    this.formModi.controls['mtlSeq']?.setValue(this.data.data.mtlSeq);
    this.formModi.controls['newOld']?.setValue(this.data.data.newOld);
    this.formModi.controls['location']?.setValue(this.data.data.location);
    this.formModi.controls['stkQty']?.setValue(this.data.data.stkQty);
    this.formModi.controls['prepQty']?.setValue(this.data.data.prepQty);
    this.formModi.controls['issuQty']?.setValue(this.data.data.issuQty);
    this.formModi.controls['confYn']?.setValue(this.data.data.confYn);
    this.formModi.controls['confDate']?.setValue(this.data.data.confDate);
  }

  buildForm() {
    this.formModi = this.fb.group({
      "sheetNo": [""],
      "itemNo": [""],
      "seqNo": [""],
      "mtlNo": [""],
      "mtlName": [""],
      "mtlSpec": [""],
      "mtlSeq": [""],
      "newOld": ["", [Validators.pattern('[YN]')]],
      "location": [""],
      "stkQty": [""],
      "prepQty": [""],
      "issuQty": [""]
    }, { updateOn: "blur" });

    this.newOldCtrl.valueChanges.subscribe(x => {
      console.log(x);
    })
  }

  async onConfirmClick() {
    console.log(this.formModi.controls['newOld'].value);
    console.log(this.formModi.value);

    if (this.newOldCtrl.value != "Y" && this.newOldCtrl.value != "N") {
      this.dialogService.error("新舊品只允許輸入Y或N");
      return;
    }
    if (StrUtils.isEmptyObject(this.locationCtrl.value)) {
      this.dialogService.error("儲位不可為空");
      return;
    }

    if (StrUtils.isEmptyObject(this.issuQtyCtrl.value)) {
      this.dialogService.error("領用數量不可為空");
      return;
    }


    await this.MtlPreIssuTableService.update(this.formModi.value).subscribe(resp => {
      if (resp.status === ApiStatus.OK) {
        this.dialogService.snack(Constants.UPDATE_OK);
        this.dialogRef.close(true);
      } else {
        this.dialogService.error(resp.error.desc);
        this.dialogRef.close(false);
        return;
      }
    }
    );

    
    // this.mtlPreIssuSvc.update({key:'mike', value:'123'}).subscribe(resp => {
    //   if (resp.status === ApiStatus.OK) {
    //     this.dialogService.snack(Constants.UPDATE_OK);
    //   } else {
    //     this.dialogService.error(resp.error.desc);
    //     return;
    //   }
    // }
    // );

    // this.mtlPreIssuSvc.test({key:'mike', value:'123'}).subscribe(resp => {
    //   alert(resp.data);  

    //     });


  };


  cancel() {
    this.dialogRef.close(null);
  }

	searchMtlSeq() {
		if (StrUtils.isEmpty(this.mtlNoCtrl.value)) {
			this.dialogService.error('物料代號為空\n' +
				                       '不可點選此案紐');
			return;
		}
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: {
				mtlNo: this.mtlNoCtrl.value
			}
		};

		const dialogRef = this.dialogService.open(MtlSeqListComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(resp => resp ? true : false))
			.subscribe(resp => {
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.formModi.get('mtlSeq')?.setValue(resp.mtlSeq);

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}

	searchNewOld() {
     
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: {
				mtlNo: this.mtlNoCtrl.value,
        mtlSeq: this.mtlSeqCtrl.value
			}
		};

		const dialogRef = this.dialogService.open(NewOldListComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(resp => resp ? true : false))
			.subscribe(resp => {
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.formModi.get('newOld')?.setValue(resp.newOld);

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}  

	searchLocation() {
     
		const conf: MatDialogConfig = {
			minHeight: "390px",
			data: {
				mtlNo: this.mtlNoCtrl.value,
        mtlSeq: this.mtlSeqCtrl.value,
        newOld: this.newOldCtrl.value
			}
		};

		const dialogRef = this.dialogService.open(LocationListComponent, conf);
		dialogRef.afterClosed()
			.pipe(filter(resp => resp ? true : false))
			.subscribe(resp => {
				// this.form1.patchValue(codMast, { emitEvent: false });
				this.formModi.get('location')?.setValue(resp.location);

				// this.form1.controls[field].setValue(codMast.codeNo);
				// this.form1.controls[field].markAsDirty();



			});
	}  

  get mtlNoCtrl() {
    return this.formModi.controls['mtlNo'];
  }

  get mtlSeqCtrl() {
    return this.formModi.controls['mtlSeq'];
  }

  get newOldCtrl() {
    return this.formModi.controls['newOld'];
  }
  get locationCtrl() {
    return this.formModi.controls['location'];
  }

  get issuQtyCtrl(){
    return this.formModi.controls['issuQty'];
  }
}
