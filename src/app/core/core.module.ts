import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const components = [
  NotFoundComponent,
  SpinnerComponent,
];

const modules = [
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
      ...components,
  ],
  imports: [ 
    //CommonModule,
    ...modules,
  ],
  exports: [
    ...components, 
    //...modules,
  ],
  providers: [
  ]

})
export class CoreModule { }
