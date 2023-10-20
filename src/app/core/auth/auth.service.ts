import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../etc/models/api.model';
import { AuthModel } from './AuthModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authModel: AuthModel|null = null;
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, passWord: string) {
        
    const body = new HttpParams()
      .set('username', userName)
      .set('password', passWord);

    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<AuthModel>("http://192.168.1.56:9090/mtl-pre-issu/login", body, header);
    // return this.http.post<AuthModel>(`${this.baseUrl}/login`, body, header);
    // return this.http.post<AuthModel>("http://localhost:8080/login", body, header);
  }

  logout() {
    this.authModel = null;
    this.router.navigateByUrl('/login');    
 }

 validateUser(): Observable<Api> {
  const url = `${this.baseUrl}/user`;
  return this.http.get<Api>(url);
} 

}
