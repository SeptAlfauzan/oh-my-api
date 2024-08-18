import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/auth", request.url));
  return await verifyToken(request);
}

async function verifyToken(request: NextRequest) {
  try {
    const token = request.cookies.get("jwt-token")?.value ?? "";
    // Instead of verifying the token here, we'll call an API route
    const response = await fetch(`${request.nextUrl.origin}/api/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    // console.log("NGENTOT", response);
    // return NextResponse.redirect(new URL("/auth", request.url));
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
