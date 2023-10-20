import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const intRegex = /^-?[0-9]+$/;

//yyyy-MM-dd
const y4mdRegex = /^(19|20)\d\d[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/;

function isEmptyInputValue(value: any): boolean {
	return value == null || value.length === 0;
}

export class MyValidators {
	static negativeChk(control: AbstractControl) : ValidationErrors | null {
		if (!control.value) {
			return null;			
		}
		if (control.value <= 0) {
			// this.dialogService.error('不可小於0');
			return {"nagtivChk": "數值不可小於0"};
		}
		return null;
	}
	
	// date validate
	static date(ctrl: AbstractControl): ValidationErrors | null {
		const val = ctrl.value;
		if (!val) return null;
		if (val instanceof Date) return null;

		if (typeof val === "string" && y4mdRegex.test(val)) {
			return null;
		} else {
			return { date: true };
		}
	}

	/**
	* 比較運篹子, 使用於 query
	* only for numeric field
	* >, >= , <, <=,  :
	*/
	static numberComparator(ctrl: AbstractControl): ValidationErrors | null {
		const val = ctrl.value;

		if (!val) return null;

		const numberRegex = /^\s*\d+\s*$/;
		const gteRegex = /^\s*>=?\s*\d+$/;
		const lteRegex = /^\s*<=?\s*\d+$/;
		const rangeRegex = /^\s*\d+\s*:\s*\d+$/;

		if (numberRegex.test(val)
			|| lteRegex.test(val)
			|| rangeRegex.test(val)
			|| gteRegex.test(val)) {

			console.log("aaa");
			return null;
		} else {
			console.log("bbb");
			return { comparator: true };
		}
	}
}

export class Mia {
	static getName() {
		return "mia";
	}
}
