import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/etc/models/api.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SqlService {
  private readonly baseUrl = `${environment.baseUrl}/sql`;

  constructor(private http: HttpClient) {
  }

  get(sql: string): Observable<Api> {
    const url = `${this.baseUrl}/${sql}`
    return this.http.get<Api>(encodeURI(url));
  }

	//execute(table: string, matrix: string): Observable<Api> {
  //  const url = `${this.baseUrl}/${table}/${matrix}}`
  //  return this.http.get<Api>(url);

	//}

}
