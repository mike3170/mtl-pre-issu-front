import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { AgGridModule } from 'ag-grid-angular';
import { MtlPreIssuComponent } from './mtl-pre-issu/mtl-pre-issu.component';
import { AgBottonComponent } from './mtl-pre-issu/ag-botton/ag-botton.component';
import { MtlPreIssuTableComponent } from './mtl-pre-issu-table/mtl-pre-issu-table.component';
import { ModiChkComponent } from './mtl-pre-issu-table/modi-chk/modi-chk.component';
import { MtlSeqListComponent } from './mtl-pre-issu-table/mtl-seq-list/mtl-seq-list.component';
import { NewOldListComponent } from './mtl-pre-issu-table/new-old-list/new-old-list.component';
import { LocationListComponent } from './mtl-pre-issu-table/location-list/location-list.component';
import { toThousandPipe } from './mtl-pre-issu-table/toThousand.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolBarComponent,
    FooterBarComponent,
    TestComponent,
    MainComponent,
    MenuComponent,
    MtlPreIssuComponent,
    AgBottonComponent,
    MtlPreIssuTableComponent,
    ModiChkComponent,
    MtlSeqListComponent,
    NewOldListComponent,
    LocationListComponent,
    toThousandPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    AgGridModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
