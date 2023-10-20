import { GridApi, RowDataTransaction } from "ag-grid-community";

// import { cloneDeep } from "lodash";
import * as _ from 'lodash';


export class AgUtils {
	static deepCopy2<T>(target: T) {
		if (target === null) {
			return target;
		}

		if (target instanceof Date) {
			return new Date(target.getTime()) as any;
		}

		if (target instanceof Array) {
			const cp = [] as any[];
			(target as any[]).forEach((v) => { cp.push(v); });
			return cp.map((n: any) => AgUtils.deepCopy2<any>(n)) as any;
		}

		if (typeof target === 'object' && target !== {}) {
			const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
			Object.keys(cp).forEach(k => {
				cp[k] = AgUtils.deepCopy2<any>(cp[k]);
			});
			return cp as T;
		}

		//console.log(target, typeof target);
		return target;
	}

	static cloneDeep(target: any) {
		return _.cloneDeep(target);
	}

	/**
	 * compare 2 array, get add/update/remove list 
	 * @param arrOrg 
	 * @param gridApi 
	 * @param idFun 
	 * @returns 
	 */
	static getTransaction(arrOrg: any[], gridApi: GridApi, idFun: Function) {
		const transaction: RowDataTransaction = {
			add: [],
			update: [],
			remove: [],
		};

		// get existing row data
		const arrCurr = [];
		gridApi.forEachNode(node => {
			arrCurr.push(node.data);
		});

		// 修改
		arrCurr.forEach(curr => {
			arrOrg.forEach(org => {
				if (idFun(curr) == idFun(org)) {
					if (JSON.stringify(curr) !== JSON.stringify(org)) {
						transaction.update.push(curr);
					}
				}
			});
		});

		// 新增
		arrCurr.forEach(curr => {
			const index = arrOrg.findIndex(org => idFun(org) == idFun(curr));
			if (index == -1) {
				transaction.add.push(curr);
			}
		});
		//console.log(addList);

		// 刪除 
		arrOrg.forEach(org => {
			const index = arrCurr.findIndex(curr => idFun(curr) == idFun(org));
			if (index === -1) {
				transaction.remove.push(org);
			}
		});

		return transaction;

	}

	static hasTrans(trans: RowDataTransaction): boolean {
		return (trans.add.length + trans.update.length + trans.remove.length) > 0;
	}

} // end class

