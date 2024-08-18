// import { initializeApp as initializeAppAdmin } from "firebase-admin";
// import * as admin from "firebase-admin";
// import { App } from "firebase-admin/app";

// export default class FirebaseAdminHelper {
//   private static instance: FirebaseAdminHelper;
//   private app: App;

//   private constructor() {
//     const firebaseAdminServiceStr = process.env["FIREBASE_ADMIN_SERVICE_JSON"];
//     const firebaseAdminServiceJson = JSON.parse(firebaseAdminServiceStr ?? "");
//     const app = initializeAppAdmin({
//       credential: admin.credential.cert(firebaseAdminServiceJson),
//     });
//     this.app = app;
//   }

//   public static getInstance(): FirebaseAdminHelper {
//     if (!FirebaseAdminHelper.instance)
//       FirebaseAdminHelper.instance = new FirebaseAdminHelper();
//     return FirebaseAdminHelper.instance;
//   }
// }
