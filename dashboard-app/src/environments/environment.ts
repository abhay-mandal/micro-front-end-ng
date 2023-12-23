// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_URL: 'http://192.168.1.55:8280',
  firebase: {
    apiKey: "AIzaSyBKiqwJ3Rmw636mQuv0KuPBT6tN8uumBkA",
    authDomain: "appzillon-dashboard-app.firebaseapp.com",
    databaseURL: "https://appzillon-dashboard-app.firebaseio.com",
    projectId: "appzillon-dashboard-app",
    storageBucket: "appzillon-dashboard-app.appspot.com",
    messagingSenderId: "385764817937",
    appId: "1:385764817937:web:03e3522f962166e64e05b0",
    measurementId: "G-WGZ8PV7382",
    minimumFetchIntervalMillis: 0
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
