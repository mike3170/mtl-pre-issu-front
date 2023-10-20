import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { catchError, filter, tap } from 'rxjs/operators';

/**
 * register in root module providers
 * needs to handle error condition, or spinner alwayse
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setHttpProcessStatus(true);

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = "";
          if (error.error instanceof ErrorEvent) {
             errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.loadingService.setHttpProcessStatus(false);
          return throwError(errorMessage);
        }),
        filter(evt => evt instanceof HttpResponse),
        tap(evt => {
            this.loadingService.setHttpProcessStatus(false);
        })
      );

  }

} // class
