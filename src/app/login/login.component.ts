import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { DialogService } from '../shared/dialogs/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private dialogService: DialogService) {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  buildForm() {
    this.loginForm = this.fb.group({
      "userName": [""],
      "passWord": [""]
      // "userName": ["MIKE"],
      // "passWord": ["123"]
    }, { updateOn: "blur" })
  }

  get userNameCtrl() {
    return this.loginForm.controls["userName"];
  }

  get passWordCtrl() {
    return this.loginForm.controls["passWord"];
  }

  doLogin() {
    this.authService.login(this.userNameCtrl.value, this.passWordCtrl.value)
      .subscribe(resp => {            
        if (resp.isAuth === 'valid') {
          this.authService.authModel = {
            user: resp.user,
            isAuth: resp.isAuth
          };
          
          this.router.navigateByUrl('/mtlpreissutable');
        } else {
          this.loginForm.reset();
          this.authService.authModel = null;
          this.router.navigateByUrl('/nglogin');
          this.dialogService.error('使用者帳號/密碼組合有誤\n'+'請重新輸入');
        }
      });
  }

}
