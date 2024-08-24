import { v4 } from "uuid";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";
import { JWT_TOKEN_KEY } from "@/constanta";
import { NextRequest } from "next/server";

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
