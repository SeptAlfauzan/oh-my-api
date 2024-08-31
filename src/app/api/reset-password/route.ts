import AuthRepositoryImpl from "@/repositories/auth_repositories_impl";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_TOKEN_KEY } from "@/constanta";

export async function GET() {
  return NextResponse.json({
    hello: "this is reset password endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { email } = await req.json();
    await new AuthRepositoryImpl().resetPassword(email);
    return NextResponse.json({ data: "success send reset password email!" });
  } catch (e) {
    const result = (e as Error).message;

    return NextResponse.json({ error: result }, { status: 500 });
  }
}
