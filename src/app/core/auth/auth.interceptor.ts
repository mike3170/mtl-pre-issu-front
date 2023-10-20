import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpEventType,
	HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from 'src/app/login/login.component';
import { DialogService } from 'src/app/shared/dialogs/dialog.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService,
		        private router: Router,
				private dialogService: DialogService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		if (!this.authService.authModel?.isAuth) {
			this.router.navigateByUrl('/login');
			// return of();
		}
		request = request.clone({
			withCredentials: true,
		});

		return next.handle(request)
			.pipe(
				map((event: HttpEvent<any>) => {
					return event;
				}),
				catchError(error => {
					// if (error || error.status === 401 || error.status === 200) {
					if (error.status === 401 || error.status === 200) {
						// this.authService.setCurrentUser(null);
						this.dialogService.error('登入逾時或權限不足，請重新登入');
						this.router.navigateByUrl('/login');
					}
					return throwError(error);
				})
			);
	}

} // end class
