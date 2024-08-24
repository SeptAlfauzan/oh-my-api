import AuthRepositoriesImpl from "@/repositories/auth_repositories_impl";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "this is signup endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { email, password, username } = await req.json();
    const user = await new AuthRepositoriesImpl().signup(
      username,
      email,
      password
    );
    const token = await user.getIdToken();
    return NextResponse.json({ status: "success", data: token });
  } catch (e) {
    const result = (e as Error).message;
    console.log(e);
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
