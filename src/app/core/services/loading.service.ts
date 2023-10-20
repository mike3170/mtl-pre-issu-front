import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LoadingService {

  httpLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  httpProcess(): Observable<boolean> {
    return this.httpLoading$.asObservable();
  }

  setHttpProcessStatus(loading: boolean) {
    if (loading) {
      setTimeout(() => {
        this.httpLoading$.next(loading);
      }, 0);
    } else {
      setTimeout(() => {
        this.httpLoading$.next(loading);
      }, 200);
    }

  }

}
