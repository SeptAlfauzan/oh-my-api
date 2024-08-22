import { signoutDeleteCookies } from "@/app/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await signoutDeleteCookies();
  return NextResponse.redirect(new URL("/auth", request.url));
}
