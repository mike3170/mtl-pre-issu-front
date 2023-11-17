import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Api } from '../core/etc/models/api.model';

@Injectable({
	providedIn: 'root'
})
export class MtlPreIssuTableService {
	private readonly baseUrl = environment.baseUrl;
	constructor(private http: HttpClient) { }

	insert(data: any): Observable<Api> {
		const url = `${this.baseUrl}/mtlpreppad/insert`;
		console.log(data);
		
		return this.http.put<Api>(url, data);
	}

	update(data: any): Observable<Api> {
		const url = `${this.baseUrl}/mtlpreppad/update`;
		return this.http.put<Api>(url, data);
	}	

	findAll(): Observable<Api> {
		const url = `${this.baseUrl}/mtlpreppad/all`;
		return this.http.get<Api>(url);
	}

	getMtlSeq(mtlNo: string): Observable<Api>{
		const url = `${this.baseUrl}/mtlpreppad/getmtlseq/${mtlNo}`;
		return this.http.get<Api>(url);		
	}

	getNewOld(mtlNo: string, mtlSeq:string): Observable<Api>{
		const url = `${this.baseUrl}/mtlpreppad/getnewold/${mtlNo}/${mtlSeq}`;
		return this.http.get<Api>(url);		
	}	

	getLocation(mtlNo: string, mtlSeq:string, newOld:string): Observable<Api>{
		const url = `${this.baseUrl}/mtlpreppad/getlocation/${mtlNo}/${mtlSeq}/${newOld}`;
		return this.http.get<Api>(url);		
	}		
}
