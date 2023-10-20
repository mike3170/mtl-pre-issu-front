import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginGuard } from './core/auth/login.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { TestComponent } from './test/test.component';
import { MtlPreIssuComponent } from './mtl-pre-issu/mtl-pre-issu.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },  
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [LoginGuard] },
  { path: "menu", component: MenuComponent, canActivate: [LoginGuard] },  
  { path: "mtlpreissu", component: MtlPreIssuComponent, canActivate: [LoginGuard] },
  { path: "test", component: TestComponent},
  { path: "**", component: NotFoundComponent},

  // { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },  
  // {
  //   path: "main", component: MainComponent, canActivateChild: [
  //     LoginGuard
  //   ],
  //   children: [
  //     { path: "mtlmast", component: MtlmastComponent },
  //     { path: "basvenmast", component: BasvenmastComponent },
  //     { path: "test", component: TestComponent },
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
