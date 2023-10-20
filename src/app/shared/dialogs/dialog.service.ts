import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ComponentType } from '@angular/cdk/overlay';
import { InfoComponent } from './info/info.component';
import { WarnComponent } from './warn/warn.component';
import { ErrorComponent } from './error/error.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DeleteConfirmComponent } from './deleteConfirm/deleteConfirm.component';
import { DirtyConfirmComponent } from './dirtyConfirm/dirtyConfirm.component';


@Injectable()
/**
 * register is providers sharedModule
 * 常常用的對話視窗  
 * info, confirm, warn, error, deleteConfirm
 * open
 * getDialogById
 * snack
 */
export class DialogService {
	dialog: MatDialog;
	snackBar: MatSnackBar;

	defaultConfig: MatDialogConfig = {
		disableClose: false,
		position: { top: "100px" },
		minWidth: "320px",
		panelClass: "myapp-no-padding-dialog"
	};

	snackBarConfig: MatSnackBarConfig = {
		duration: 3000,
		data: "",
		panelClass: ["green-snackbar"],
	};

	constructor(private injector: Injector) {
		this.dialog = this.injector.get(MatDialog);
		this.snackBar = this.injector.get(MatSnackBar);
	}
	//constructor(
	//  private dialog: MatDialog,
	//  private snackBar: MatSnackBar) { 
	//}

	info(msg: string, config?: MatDialogConfig): MatDialogRef<InfoComponent> {
		const _config = { ...this.getConfig(config), data: msg };
		return this.dialog.open(InfoComponent, _config);
	}

	warn(msg: string | undefined, config?: MatDialogConfig): MatDialogRef<WarnComponent> {
		const _config = { ...this.getConfig(config), data: msg };
		return this.dialog.open(WarnComponent, _config);
	}

	error(msg: string, config?: MatDialogConfig): MatDialogRef<ErrorComponent> {
		const _config = { ...this.getConfig(config), data: msg };
		return this.dialog.open(ErrorComponent, _config);
	}

	confirm(msg: string, config?: MatDialogConfig): MatDialogRef<ConfirmComponent> {
		const _config = { ...this.getConfig(config), data: msg };
		return this.dialog.open(ConfirmComponent, _config);
	}

	dirtyConfirm(msg?: string, config?: MatDialogConfig): MatDialogRef<DeleteConfirmComponent> {		
		msg = msg ? msg : "資料有異動, 是否要離開此筆資料?";

		const _config: MatDialogConfig = { ...this.getConfig(config), data: msg };
		return this.dialog.open(DirtyConfirmComponent, _config);
	}


	deleteConfirm(msg?: string, config?: MatDialogConfig): MatDialogRef<DeleteConfirmComponent> {
		msg = msg ? msg : "確定刪除此筆資料嗎?";

		let _config: MatDialogConfig = {};
		_config = { ...this.getConfig(config), data: msg };
		return this.dialog.open(DeleteConfirmComponent, _config);
	}

	// accept component, TemplateRef
	open<T>(component: ComponentType<T> | TemplateRef<any>, config?: MatDialogConfig): MatDialogRef<T> {
		const _config = { ...this.getConfig(config) };
		return this.dialog.open(component, _config);
	}

	getDialogById(id: string): MatDialogRef<any, any> | undefined {
		return this.dialog.getDialogById(id);
	}

	snack(msg: string, action?: string, duration?: number) {
		let _config = null;
		let _action = null;

		if (duration) {
			_config = { ...this.snackBarConfig, duration: duration, };
		} else {
			_config = { ...this.snackBarConfig, duration: 3000 };
		}

		_action = action ? action : "";

		this.snackBar.open(msg, action, _config);
	}

	private getConfig(config: any): MatDialogConfig {
		let _config: MatDialogConfig;
		if (config) {
			_config = { ...this.defaultConfig, ...config };
		} else {
			_config = { ...this.defaultConfig };
		}

		return _config;
	}

}