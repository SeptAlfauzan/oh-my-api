import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_TOKEN_KEY } from "./constanta";

export async function middleware(request: NextRequest) {
  return await verifyToken(request);
}

async function verifyToken(request: NextRequest) {
  try {
    const tokenFromHeader =
      request.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    const tokenFromCookies = request.cookies.get(JWT_TOKEN_KEY)?.value;
    const token = tokenFromCookies ?? tokenFromHeader;
    // Instead of verifying the token here, we'll call an API route
    const response = await fetch(`${request.nextUrl.origin}/api/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token.toString() }),
    });

    if (response.status === 401) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    if (!response.ok) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    // In case of error, redirect to login
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/endpoints/:path",
    "/api/projects/:path",
    "/api/workspace/:path",
  ],
};
