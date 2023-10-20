import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './material/app-material.module';
import { NumericDirective } from './directives/numeric.directive';
import { WidthDirective } from './directives/width.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './dialogs/info/info.component';
import { WarnComponent } from './dialogs/warn/warn.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { DeleteConfirmComponent } from './dialogs/deleteConfirm/deleteConfirm.component';

import { DialogService } from './dialogs/dialog.service';
import { CodeNameDialogComponent } from './codeName/codeNameDialog.component';
import { SqlService } from './services/sql.service';
import { DirtyConfirmComponent } from './dialogs/dirtyConfirm/dirtyConfirm.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { UppercaseDirective } from './directives/strupper.directive';
import { HeightDirective} from './directives/height.directive';
 
const comps = [
  InfoComponent,
  WarnComponent,
  ErrorComponent,
  ConfirmComponent,
	DirtyConfirmComponent,
  DeleteConfirmComponent,
	CodeNameDialogComponent
];

const directives = [
  NumericDirective,
  WidthDirective,
  HeightDirective,
  UppercaseDirective
];

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  AppMaterialModule,
	ContextMenuModule
  
];


@NgModule({
  declarations: [
    ...comps,
    ...directives,
  ],
  imports: [ ...modules ],
  exports: [
    ...comps,
    ...modules,
    ...directives,
  ],
  providers: [
    DialogService,
		SqlService,
  ]
})
export class SharedModule { }
