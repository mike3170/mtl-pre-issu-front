import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Api } from '../core/etc/models/api.model';

@Injectable({
	providedIn: 'root'
})
export class MtlPreIssuService {
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
}
