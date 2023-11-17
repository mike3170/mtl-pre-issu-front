import { Component, OnInit } from '@angular/core';
import { MtlPreIssuTable } from './mtl-pre-issu-table-model';
import { ApiStatus } from '../core/etc/models/api.model';
import { AuthService } from '../core/auth/auth.service';
import { MtlPreIssuTableService } from './mtl-pre-issu-table.service';
import { DialogService } from '../shared/dialogs/dialog.service';
import { Constants } from '../core/etc/constants/constants';
import { Router } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModiChkComponent } from './modi-chk/modi-chk.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-mtl-pre-issu-table',
  templateUrl: './mtl-pre-issu-table.component.html',
  styleUrls: ['./mtl-pre-issu-table.component.scss']
})
export class MtlPreIssuTableComponent implements OnInit {
  dataList: MtlPreIssuTable[];
  rowData: any;
  rowIndex = -1;

  constructor(
    private router: Router,
    private authService: AuthService,
    private mtlPreIssuSvc: MtlPreIssuTableService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.onQuery();
  }

  onInsert() {
    const insertData = { key: 'insertEmp', value: this.authService.authModel?.user };
    console.log(insertData);

    this.mtlPreIssuSvc.insert(insertData)
      .subscribe(resp => {
        if (resp.status === ApiStatus.OK) {
          // this.rowIndex = -1;
          this.dialogService.snack(Constants.INSERT_OK);
          this.onQuery();
        } else {
          this.dialogService.error(resp.error.desc);
          return;
        }
      }
      )
  }

  onQuery() {
    this.mtlPreIssuSvc.findAll()
      .subscribe(resp => {
        this.dataList = resp.data;
        // const date = new Date(this.dataList[1].creaDate);
        // console.log(date);

        this.rowIndex = 0;
      })
  }

  async modiChk(index: number) {
    const data = this.dataList[index];

    const conf: MatDialogConfig = {
      minHeight: "390px",
      data: {
        data
      }
    };

    let resp = await lastValueFrom(this.dialogService.open(ModiChkComponent, conf).afterClosed());

    if (resp) {      

      this.onQuery();
    }
    // const dialogRef = this.dialogService.open(ModiChkComponent, conf);
    // await dialogRef.afterClosed();

  }
  dateFormate(dateStr: string) {
    const d = new Date(dateStr);
    let yy = d.getFullYear();
    let _mm = d.getMonth() + 1;
    let mm = _mm < 10 ? '0' + _mm : _mm;
    let _dd = d.getDate();
    let dd = _dd < 10 ? '0' + _dd : _dd;
    let _hh = d.getHours();
    let hh = _hh < 10 ? '0' + _hh : _hh;
    let _mi = d.getMinutes();
    let mi = _mi < 10 ? '0' + _mi : _mi;
    let _si = d.getSeconds();
    let si = _si < 10 ? '0' + _si : _si;

    return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + si;
  }

  deadLineColor(dateStr: string, prepTimeB: number, prepTimeE: number) {
    const applyTime = new Date(dateStr);
    const now = new Date();

    var diff = now.getTime() - applyTime.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    // diff -= hours * 1000 * 60 * 60;
    // var minutes = Math.floor(diff / 1000 / 60);
    // diff -= minutes * 1000 * 60;
    // var seconds = Math.floor(diff / 1000);

    return {
      'color': hours > prepTimeE ? 'red'
        : hours <= prepTimeE && hours >= prepTimeB ? 'rgb(254,158,38)'
          : ''
    }

  }

  chkStatusBgColor(confYn: string) {

    return {
      'background-color': confYn == "Y" ? 'rgb(129, 199, 132)'
        : confYn == "N" ? 'white'
          : ''
    }
  }

}
