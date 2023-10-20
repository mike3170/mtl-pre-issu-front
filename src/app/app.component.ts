import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { LoadingService } from './core/services/loading.service';
import { StrUtils } from './utils/strUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mtl-pre-issu';
  isLoading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService) {
    this.isLoading$ = loadingService.httpLoading$;
  }

  doLogout(){
    this.authService.logout();    
  }

  get authUserName(){
    return this.authService.authModel?.user;
  }

  chkAuth(){
    if (StrUtils.isEmpty(this.authService.authModel?.isAuth)){
      return false;
    } else {
      return true;
    }
  }
}
