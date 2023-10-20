import { Component, OnInit } from '@angular/core';
import { CellEditingStoppedEvent, ColDef, ColumnApi, GridApi, GridReadyEvent, RowClassRules, RowStyle } from 'ag-grid-community';
import { MtlPreIssu } from './mtl-pre-issu-model';
import { MtlPreIssuService } from './mtl-pre-issu.service';
import { AgBottonComponent } from './ag-botton/ag-botton.component';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';
import { ApiStatus } from '../core/etc/models/api.model';
import { Constants } from 'src/app/core/etc/constants/constants';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-mtl-pre-issu',
  templateUrl: './mtl-pre-issu.component.html',
  styleUrls: ['./mtl-pre-issu.component.scss']
})
export class MtlPreIssuComponent implements OnInit {
  data: MtlPreIssu;
  gridApi!: GridApi<MtlPreIssu>;
  gridColumnApi!: ColumnApi;
  rowData: any;
  rowIndex = -1;
  columnDefs: ColDef[] = [
    
    { headerClass: 'ag-center-header', headerName: '備料單號', field: 'sheetNo', width: 120, resizable: true,},
    { headerClass: 'ag-center-header', headerName: '備料項次', field: 'itemNo', width: 90, resizable: true, sortable: true},
    { headerName: '流水號', field: 'seqNo', width: 90, resizable: true, sortable: true, type: 'numericColumn' },
    { headerName: '物枓代號', field: 'mtlNo', resizable: true, filter: 'agTextColumnFilter', sortable: true,flex: 2},
    { headerName: '物枓名稱', field: 'mtlName', resizable: true, flex: 2},
    { headerName: '規格', field: 'mtlSpec', resizable: true, flex: 1 },
    { headerName: '物料序號', field: 'mtlSeq', width: 100, editable: true, resizable: true, type: 'numericColumn', sortable: true },
    { headerName: '新品否', field: 'newOld', width: 100, editable: true, resizable: true },
    { headerName: '儲區', field: 'location', width: 100, editable: true, resizable: true, sortable: true },
    { headerName: '庫存量', field: 'stkQty', width: 100, resizable: true, sortable: true },
    { headerName: '需求量', field: 'prepQty', width: 100, resizable: true },
    { headerName: '領用量', field: 'issuQty', width: 100, editable: true, resizable: true, sortable: true },
    { headerName: '物料確認',
      cellRenderer: AgBottonComponent,
      minWidth: 150
    },
  ];
  constructor(
    private authService: AuthService,
    private mtlPreIssuSvc: MtlPreIssuService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.onQuery();
  }

  onInsert(){
    const insertData = {key:'insertEmp', value:this.authService.authModel?.user};
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
        this.data = resp.data;
        this.rowIndex = 0;
      })
  }

  rowClassRules: RowClassRules = {  
    // row style function
    'crea-time-safe': (params) => {      
      return params.data.recordColor == 'G';
    },
    // row style function
    'crea-time-warning': (params) => {
      return params.data.recordColor == 'Y';
    },
    // row style function
    'crea-time-danger': (params) => {
      return params.data.recordColor == 'R';
    }
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
