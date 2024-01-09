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
import { isEmpty, lastValueFrom } from 'rxjs';
import { StrUtils } from '../utils/strUtils';

export class InsertModel {
  insertEmp: string | null;
  sheetNo: string;
  itemNo: number;
}

@Component({
  selector: 'app-mtl-pre-issu-table',
  templateUrl: './mtl-pre-issu-table.component.html',
  styleUrls: ['./mtl-pre-issu-table.component.scss']
})
export class MtlPreIssuTableComponent implements OnInit {
  dataList: MtlPreIssuTable[];
  rowData: any;
  rowIndex = -1;
  mySelection: boolean[] = [];
  delList: MtlPreIssuTable[] = [];
  insertModel: InsertModel;
  insertList: InsertModel[] = [];
  isChkActive: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private mtlPreIssuSvc: MtlPreIssuTableService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.onQuery();
    if (this.isChkActive == true) {    
      setInterval((): void => {  
        this.chkNewSheet();
      }, 600000);
    }
  }
  async onInsert() {
    this.insertList = [];

    for (const i in this.mySelection) {
      this.insertModel = new InsertModel();
      if (this.mySelection[i]) {
        if (this.dataList[i].confYn == "N") {
          this.dialogService.error("此筆資料尚未確認，不可拋轉\n" +
            "備料單號:" + this.dataList[i].sheetNo + "\n" +
            "備料項次:" + this.dataList[i].itemNo);
          return;
        }

        if (this.dataList[i].newOld != "Y" && this.dataList[i].newOld != "N") {
          this.dialogService.error("新舊品只允許輸入Y或N");
          return;
        }
        if (StrUtils.isEmpty(this.dataList[i].location)) {
          this.dialogService.error("庫位不可為空");
          return;
        }

        if (StrUtils.isEmpty(this.dataList[i].issuQty)) {
          this.dialogService.error("領用數量不可為空");
          return;
        }

        if (Number(this.dataList[i].issuQty) <= 0) {
          this.dialogService.error("領用數量必須大於0");
          return;
        }

        this.insertModel.insertEmp = this.authService.authModel?.user;
        this.insertModel.sheetNo = this.dataList[i].sheetNo;
        this.insertModel.itemNo = this.dataList[i].itemNo;

        this.insertList.push(this.insertModel);
      }
    }

    const resp = lastValueFrom(this.mtlPreIssuSvc.insert(this.insertList));

    this.dialogService.info((await resp).data);

    this.onQuery();
  }

  onInsertBak() {
    const insertData = { key: 'insertEmp', value: this.authService.authModel?.user };

    this.insertList = [];
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

  async onDelete() {
    // console.log(this.mySelection);
    this.delList = [];
    for (const i in this.mySelection) {
      // console.log(i, this.mySelection[i]);

      if (this.mySelection[i]) {
        this.delList.push(this.dataList[i]);
      }
    }

    const resp = lastValueFrom(this.mtlPreIssuSvc.delete(this.delList));

    this.dialogService.info((await resp).data);

    this.onQuery();

  }

  onQuery() {
    this.dataList = [];
    this.mtlPreIssuSvc.findAll()
      .subscribe(resp => {
        this.dataList = resp.data;

        // const date = new Date(this.dataList[1].creaDate);
        // console.log(date);

        this.rowIndex = 0;
        this.mySelection = [];
        this.mySelection = new Array(this.dataList.length).fill(false);
        this.isChkActive = true;
      })
  }

  chkNewSheet() {
    if (this.isChkActive) {
      var maxCreaDate: Date = new Date('2000-01-01T00:00:00');
      const audioElement = new Audio("assets/alert_sound.mp3");

      this.dataList.forEach(data => {
        if (
          Number(data.creaDate.replace(/-/gm, '').replace(/T/gm, '').replace(/:/gm, '')) >
          Number(this.dateFormate4Tran(maxCreaDate).replace(/-/gm, '').replace(/T/gm, '').replace(/:/gm, ''))
        ) {
          maxCreaDate = new Date(data.creaDate);
        }

      });

      this.mtlPreIssuSvc.chkNewSheet(this.dateFormate4Tran(maxCreaDate)).subscribe(resp => {
        if (resp.data) {

          let playCount: number = 0;
          const iv = setInterval(function () {
            playCount++;
            
            audioElement.play();

            if (playCount >= 10) {
              clearInterval(iv);
            }
          }, 4000);

          this.isChkActive = false;

          this.dialogService.info("請注意，有新單!!")
          .afterClosed()
          .subscribe(x =>{
            this.isChkActive = true;
          });

        }

      })
    }
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

  dateFormate4Tran(date: Date) {
    let yy = date.getFullYear();
    let _mm = date.getMonth() + 1;
    let mm = _mm < 10 ? '0' + _mm : _mm;
    let _dd = date.getDate();
    let dd = _dd < 10 ? '0' + _dd : _dd;
    let _hh = date.getHours();
    let hh = _hh < 10 ? '0' + _hh : _hh;
    let _mi = date.getMinutes();
    let mi = _mi < 10 ? '0' + _mi : _mi;
    let _si = date.getSeconds();
    let si = _si < 10 ? '0' + _si : _si;

    return yy + '-' + mm + '-' + dd + 'T' + hh + ':' + mi + ':' + si;
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
