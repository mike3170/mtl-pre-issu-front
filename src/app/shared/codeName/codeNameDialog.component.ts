import { ColumnDef, CodeNameInfo } from './codeNameModel';
import { FormUtils } from 'src/app/utils/formUtils';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../dialogs/dialog.service';
import { SqlService } from '../services/sql.service';
import { ApiStatus } from 'src/app/core/etc/models/api.model';
import { StrUtils } from 'src/app/utils/strUtils';

@Component({
  selector: 'app-codeNameDialog',
  templateUrl: './codeNameDialog.component.html',
  styleUrls: ['./codeNameDialog.component.scss']
})
export class CodeNameDialogComponent implements OnInit {
  form1: UntypedFormGroup;

	title: string;
  sql: string;

  columnDefs: ColumnDef[];

  dataList: any[] = [];

  mapFn: Function;

  constructor(private fb: UntypedFormBuilder,
              private sqlService: SqlService,
              private dialogService: DialogService,
              public dialogRef: MatDialogRef<CodeNameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private codeNameInfo: CodeNameInfo) {
    // ---

    this.form1 = this.fb.group({
      code : [""],
      name: [""],
    });

    //----------------------------------
    this.sql = codeNameInfo.sql;
		this.title = codeNameInfo.title;
    this.columnDefs = codeNameInfo.columnDefs;
    this.mapFn = codeNameInfo.mapFn;
  }

  ngOnInit() {
  }

  query() {
    if (FormUtils.isEmpty(this.form1)) {
      this.dialogService.info("請輸入查詢條件!");
      return;
    }

		//const matrix = FormUtils.getMartixVariables(this.form1);
		//this.sqlService.execute("dept", matrix)
		//	.subscribe(resp =>{
		//		alert(resp);
		//	});

    // ex. deptNo -> dept_no
    const codeSnake = StrUtils.camel2Snake(this.columnDefs[0].field);
    const nameSnake = StrUtils.camel2Snake(this.columnDefs[1].field);

    // ex. {code: "10", name: "mia"} -> {dept_no: "10", dept_name: "mia"}
    // and remove empty value
    const snakeObj: { [id: string]: string } =
      Object.keys(this.form1.value)
        .reduce((acc, k) => {
          if (! StrUtils.isEmpty(this.form1.get(k)?.value)) {
            const field = (k == "code") ? codeSnake : nameSnake;
            acc[field] = (this.form1.get(k)?.value as string).trim();
          }
          return acc;
        }, {} as any);

    // "like" or "="
    const condArr =
      Object.entries(snakeObj)
        .reduce((acc, [f, v]) => {
          const op = v.includes("%") ? "like" : "=";
          acc.push(`${f} ${op} '${v}'`);
          return acc;
        }, [] as any[]);

    // contruct sql
    const whereClause = " where " + condArr.join(" and ").concat(" ");
    const index = this.sql.toLocaleLowerCase().indexOf("order");
    const sql = this.sql.substring(0, index) + whereClause + this.sql.substring(index);

    // rest api
    this.sqlService.get(sql)
      .subscribe(api => {
        if (api.status == ApiStatus.OK) {
          this.dataList = api.data;
					console.log(JSON.stringify(this.dataList));
					
        } else {
          this.dialogService.error(api.error.desc);
        }
      });

  }

  closeDialog(data: any) {
    this.dialogRef.close(this.mapFn(data));
  }

}
