import { signoutDeleteCookies } from "@/app/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await signoutDeleteCookies();
    return NextResponse.json({ status: "success" });
  } catch (e) {
    const result = (e as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
