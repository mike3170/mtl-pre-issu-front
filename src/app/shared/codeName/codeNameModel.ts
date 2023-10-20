export interface ColumnDef {
  headerName: string;
  field : string;
}

export interface CodeNameInfo {
	title: string,
  sql: string,
  columnDefs: ColumnDef[];
  mapFn: Function;
}