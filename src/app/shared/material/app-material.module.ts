import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { DateAdapter, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

//const ISO_8601_REGEX =
//    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;




const modules = [
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatTooltipModule,
	MatSidenavModule,
	MatListModule,
	MatDialogModule,
	MatSnackBarModule,
	MatExpansionModule,
	MatGridListModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatDividerModule,
	MatRippleModule,
	MatCheckboxModule,

	MatDatepickerModule,
	MatMomentDateModule,

	MatSliderModule,
	MatSelectModule,

	MatMenuModule
] as any[]

export const TW_FORMATS = {
	parse: {
		dateInput: 'YYYY-MM-DD'
	},
	display: {
		dateInput: 'YYYY-MM-DD',
		monthYearLabel: 'YYYY MMM',
		dateA11yLabel: 'YYYY-MM-DD',
		monthYearA11yLabel: 'YYYY MMM'
	}
};


@NgModule({
	imports: [...modules],
	exports: [...modules],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'zh-tw' },
		{ provide: DateAdapter, useClass: MomentDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: TW_FORMATS },
	],
})
export class AppMaterialModule { }
