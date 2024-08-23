import { v4 } from "uuid";
import { NextResponse } from "next/server";

import { DecodedIdToken, getAuth } from "firebase-admin/auth";
// import FirebaseAdminHelper from "@/helper/firebase_admin_helper";
// FirebaseAdminHelper.getInstance();

import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
const alreadyCreatedAps = getApps();

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
    const firebaseAdminServiceStr = process.env["FIREBASE_ADMIN_SERVICE_JSON"];
    const firebaseAdminServiceJson = JSON.parse(firebaseAdminServiceStr ?? "");

    alreadyCreatedAps.length === 0
      ? admin.initializeApp(
          {
            credential: admin.credential.cert(firebaseAdminServiceJson),
          },
          v4()
        )
      : alreadyCreatedAps[0];

    const result = await getAuth().verifyIdToken(token);
    return result;
  } catch (error) {
    throw error;
  }
}
