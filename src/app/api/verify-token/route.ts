import { v4 } from "uuid";
import { NextResponse } from "next/server";
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
initializeFirebaseApp();

export async function GET() {
  return NextResponse.json({
    hello: "this is verify token endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { token } = await req.json();
    console.log("DECODE TOKEN", token);
    const decodeToken = await verifyIDToken(token);
    return NextResponse.json({ data: decodeToken });
  } catch (e) {
    console.log("ERROR NIH", e);
    return NextResponse.json({ status: "fail", message: e }, { status: 401 });
  }
}

async function verifyIDToken(token: string): Promise<DecodedIdToken> {
  try {
    const result = await getAuth().verifyIdToken(token);
    return result;
  } catch (error) {
    throw error;
  }
}
