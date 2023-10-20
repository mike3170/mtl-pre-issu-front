import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { MtlPreIssu } from '../mtl-pre-issu-model';
import { lastValueFrom } from 'rxjs';
import { MtlPreIssuService } from '../mtl-pre-issu.service';
import { Api, ApiStatus } from 'src/app/core/etc/models/api.model';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { Constants } from 'src/app/core/etc/constants/constants';
import { StrUtils } from 'src/app/utils/strUtils';

@Component({
  selector: 'app-ag-botton',
  templateUrl: './ag-botton.component.html',
  styleUrls: ['./ag-botton.component.scss']
})
export class AgBottonComponent implements ICellRendererAngularComp {
  data: any;
  constructor(private mtlPreIssuSvc: MtlPreIssuService,
    private dialogService: DialogService) { }
  agInit(params: ICellRendererParams<any, any>): void {
    this.data = params.data;
    
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  ngOnInit(): void {
  }

  onConfirmClick() {
    if (this.data.newOld != "Y" && this.data.newOld != "N") {
      this.dialogService.error("新舊品只允許輸入Y或N");
      return;
    }
    if (StrUtils.isEmptyObject(this.data.location) ) {
      this.dialogService.error("儲位不可為空");
      return;
    }    
    const mtlPreIssu: MtlPreIssu = this.data;

    this.mtlPreIssuSvc.update(mtlPreIssu).subscribe(resp => {
      if (resp.status === ApiStatus.OK) {
        this.dialogService.snack(Constants.UPDATE_OK);
      } else {
        this.dialogService.error(resp.error.desc);
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


}
