// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // production: true,
  // baseUrl: "http://192.168.1.56:9090/api"
	baseUrl: "http://localhost:8080/mtl-pre-issu/api",  
  loginUrl: "http://localhost:8080/mtl-pre-issu/login"
	// baseUrl: "http://192.168.1.112:8080/mtl-pre-issu/api",  
  // loginUrl: "http://192.168.1.112:8080/mtl-pre-issu/login"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
