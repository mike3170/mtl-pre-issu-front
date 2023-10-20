export type CrudAction = "insert" | "update" | "delete" | "query";

export interface  CrudPair<T> {
  action: CrudAction,
  data: T;
}
