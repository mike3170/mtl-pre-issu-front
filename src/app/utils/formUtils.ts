import { UntypedFormGroup } from "@angular/forms";
import * as moment from 'moment';
import { StrUtils } from "./strUtils";

export class FormUtils {
	/**
	 * 檢查 form 是否有資料, 使用於 query form
	 * @param form 
	 */
	static isEmpty(fg: UntypedFormGroup): boolean {
		const notEmpty =
			Object.values(fg.value)
				.some((v: any) => ! StrUtils.isEmpty(v));

		return !notEmpty;
	}

	/**
	 * 查詢
	 * moment issue
	 */
	static getMartixVariables(fg: UntypedFormGroup): string {
		const matrix =
			Object.keys(fg.controls)
				.filter(k => !StrUtils.isEmpty(fg.controls[k].value))  // ignore empty
				.map(k => {
					let keyvalue: string = ""; 
					if (moment.isMoment(fg.controls[k].value)) {
						keyvalue = `;${k}=${fg.controls[k].value.format("YYYY-MM-DD")}`;
					} else {
						keyvalue = `;${k}=${fg.controls[k].value}`;
					}
					return encodeURI(keyvalue);
				})
				.reduce((acc, e) => {
					return acc + e;
				}, "");

		return matrix;
	}

	static getMartixVariables2(obj: {[key: string]: any}): string {
		const matrix =
			Object.keys(obj)
				.filter(k => ! StrUtils.isEmpty(obj[k]))  // ignore empty
				.map(k => {
					let keyvalue: string = ""; 
					if (moment.isMoment(obj[k])) {
						keyvalue = `;${k}=${obj[k].format("YYYY-MM-DD")}`;
					} else {
						keyvalue = `;${k}=${obj[k]}`;
					}
					return encodeURI(keyvalue);
				})
				.reduce((acc, e) => {
					return acc + e;
				}, "");

		return matrix;
	}

} // class




