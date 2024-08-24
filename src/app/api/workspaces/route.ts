import { JWT_TOKEN_KEY } from "@/constanta";
import ImageKitHelper from "@/helper/imagekit_helper";
import { verifyIDToken } from "@/helper/verify_token";
import WorkspaceRepositoriesImpl from "@/repositories/workspace_repositories_impl";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "welcome to workspace endpoint" });
}

export async function POST(req: NextRequest, res: Response) {
  try {
    const tokenFromHeader =
      req.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    const tokenFromCookies = req.cookies.get(JWT_TOKEN_KEY)?.value;
    const token = tokenFromCookies ?? tokenFromHeader;
    const decodedToken = await verifyIDToken(token);

    const { name } = await req.json();

    const result = await new WorkspaceRepositoriesImpl().create(
      name,
      decodedToken.uid
    );
    return NextResponse.json({ message: "success", data: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
