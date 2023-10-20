export enum ApiStatus {
  OK = "OK",
  ERROR = "ERROR"
};

export interface Api {
  status: ApiStatus;
  data: any;
  error: { code: number, desc: string }
}

export interface ApiResponse {
  status: ApiStatus;
  data: any;
  error: { code: number, desc: string };
}

export function isHttpOK(api: Api): boolean {
  return api.status === ApiStatus.OK;
}