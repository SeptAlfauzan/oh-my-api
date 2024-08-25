import { v4 } from "uuid";
import * as admin from "firebase-admin";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { App, getApps, initializeApp } from "firebase-admin/app";
import { JWT_TOKEN_KEY } from "@/constanta";
import { NextRequest } from "next/server";

// Initialize Firebase app
let app: App | undefined;

export const initializeFirebaseApp = () => {
  if (getApps().length === 0) {
    const firebaseAdminServiceStr = process.env.FIREBASE_ADMIN_SERVICE_JSON;
    if (!firebaseAdminServiceStr) {
      throw new Error(
        "FIREBASE_ADMIN_SERVICE_JSON is not set in environment variables"
      );
    }

    const firebaseAdminServiceJson = JSON.parse(firebaseAdminServiceStr);

    app = initializeApp({
      credential: admin.credential.cert(firebaseAdminServiceJson),
    });
  } else {
    app = getApps()[0];
  }
  return app;
};

export async function verifyIDToken(token: string): Promise<DecodedIdToken> {
  const firebaseApp = initializeFirebaseApp();
  try {
    const result = await getAuth(firebaseApp).verifyIdToken(token);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function verifyIDTokenFromRequestCookies(
  req: NextRequest
): Promise<DecodedIdToken> {
  try {
    const tokenFromHeader =
      req.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    const tokenFromCookies = req.cookies.get(JWT_TOKEN_KEY)?.value;
    const token = tokenFromCookies ?? tokenFromHeader;
    const decodedToken = await verifyIDToken(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
}
