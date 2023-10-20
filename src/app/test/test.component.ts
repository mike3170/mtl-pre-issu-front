import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Api } from '../core/etc/models/api.model';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	constructor(private http: HttpClient) { }

	private blob: Blob

	ngOnInit(): void {
	}

	getPdf() {
		this.getService().subscribe(
			(data: Blob) => {
				var file = new Blob([data], { type: 'application/pdf' })
				var fileURL = URL.createObjectURL(file);

				// if you want to open PDF in new tab
				window.open(fileURL);
				var a = document.createElement('a');
				a.href = fileURL;
				a.target = '_blank';
				a.download = 'bill.pdf';
				document.body.appendChild(a);
				a.click();
			},
			(error) => {
				console.log('getPDF error: ', error);
			}
		);
		let url = `http://122.117.116.127:8080/reports/rwservlet?chferp_pdf&report=/home/oracle/CHF/SCH0400R&PV_SYS_DATE=2022-12-21_10:49:25&PV_PROG_NO=(SCH0400R)&PV_SESS_ID=5064864&PV_EMP_NO=MIKE&PV_BRN_ID=CHF&PARAMFORM=NO&PV_BRN_ID=CHF&PV_SESS_ID=5064864`;
		window.open(url);
	}

	getService(): Observable<Blob> {
		let url = `http://122.117.116.127:8080/reports/rwservlet?chferp_pdf&report=/home/oracle/CHF/SCH0400R&PV_SYS_DATE=2022-12-21_10:49:25&PV_PROG_NO=(SCH0400R)&PV_SESS_ID=5064864&PV_EMP_NO=MIKE&PV_BRN_ID=CHF&PARAMFORM=NO&PV_BRN_ID=CHF&PV_SESS_ID=5064864`;
		var authorization = 'Bearer ' + sessionStorage.getItem("access_token");
		//   return this.http.get(url, { observe : 'response',responseType : 'blob' as 'json'});
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': 'http://122.117.116.127:8080',
			"Authorization": authorization, responseType: 'blob'
		});

		return this.http.get<Blob>(url, { headers: headers, responseType: 'blob' as 'json' });
	}

}
