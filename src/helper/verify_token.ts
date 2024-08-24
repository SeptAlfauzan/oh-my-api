import { v4 } from "uuid";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";

// Initialize Firebase app

const initializeFirebaseApp = () => {
  const firebaseAdminServiceStr = process.env.FIREBASE_ADMIN_SERVICE_JSON;
  if (!firebaseAdminServiceStr) {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_JSON is not set in environment variables"
    );
  }

  const firebaseAdminServiceJson = JSON.parse(firebaseAdminServiceStr);

  initializeApp(
    {
      credential: admin.credential.cert(firebaseAdminServiceJson),
    },
    v4()
  );
  // if (getApps().length === 0) {
  // }
};

// Initialize Firebase app

export async function verifyIDToken(token: string): Promise<DecodedIdToken> {
  try {
    initializeFirebaseApp();
    const result = await getAuth().verifyIdToken(token);
    return result;
  } catch (error) {
    throw error;
  }
}
