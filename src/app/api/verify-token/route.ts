import { verifyIDToken } from "@/helper/verify_token";
import { NextResponse } from "next/server";

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
