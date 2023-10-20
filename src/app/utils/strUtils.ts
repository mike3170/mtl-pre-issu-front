import { DecimalPipe } from "@angular/common";

export class StrUtils {
	private static decPipe = new DecimalPipe("en-Us");

	static isEmpty(v: string | number | undefined | null): boolean {
		if (v == undefined || v == null) {
			return true;
		}

		if (typeof v == "string") {
			return (v.replace(/\s/g, "").length > 0 ? false : true);
		} else {
			return isNaN(v) ? true : false;
		}
	}


	static isEmptyObject(obj: object) {
		if (obj == undefined || obj == null) {
			return true;
		}

		return Object.keys(obj).length == 0 ? true : false;

	}



	static camel2Snake(input: string): string {
		let ret = '';
		let prevLowercase = false;

		for (let s of input) {
			const isUppercase = (s.toUpperCase() === s);
			if (isUppercase && prevLowercase) {
				ret += '_';
			}

			ret += s;
			prevLowercase = !isUppercase;
		}

		return ret.replace(/_+/g, '_').toLowerCase();
	}

	static snake2Camel(str: string): string {
		return str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
	}

} // end class



