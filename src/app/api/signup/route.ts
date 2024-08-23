import FirebaseHelper from "@/helper/firebase_helper";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "this is signup endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const firebaseApp = FirebaseHelper.getInstance();
    const { email, password, username } = await req.json();
    const token = await firebaseApp.registerEmailPassword(email, password);
    return NextResponse.json({ status: "success", data: token });
  } catch (e) {
    const result = (e as Error).message;
    console.log(e);
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
