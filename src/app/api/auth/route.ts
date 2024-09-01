import AuthRepositoryImpl from "@/repositories/auth_repositories_impl";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_TOKEN_KEY } from "@/constanta";

export async function GET() {
  return NextResponse.json({
    hello: "this is auth endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { email, password } = await req.json();
    const user = await new AuthRepositoryImpl().signin(email, password);
    const token = await user.getIdToken();
    cookies().set(JWT_TOKEN_KEY, token.toString(), { secure: true });

    return NextResponse.json({ data: token });
  } catch (e) {
    console.log(e);
    const result = (e as Error).message;

    return NextResponse.json({ error: result }, { status: 500 });
  }
}
