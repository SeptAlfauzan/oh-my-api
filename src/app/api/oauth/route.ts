import AuthRepositoriesImpl from "@/repositories/auth_repositories_impl";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWT_TOKEN_KEY } from "@/constanta";
import { User } from "firebase/auth";

export async function GET() {
  return NextResponse.json({
    hello: "this is auth endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { firebaseUser, token } = await req.json();
    const user = await new AuthRepositoriesImpl().oAuthFindOrCreateNewUser(
      firebaseUser
    );
    cookies().set(JWT_TOKEN_KEY, token.toString(), { secure: true });
    return NextResponse.json({ data: token });
  } catch (e) {
    const result = (e as Error).message;
    console.log(e);
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
