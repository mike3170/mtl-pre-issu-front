import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './context-menu.service';
import { AppMaterialModule } from '../material/app-material.module';



@NgModule({
    declarations: [
        ContextMenuComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    exports: [
        ContextMenuComponent
    ],
    providers: [
        ContextMenuService,
    ]
})
export class ContextMenuModule { }
