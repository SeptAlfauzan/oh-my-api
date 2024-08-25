import { verifyIDTokenFromRequestCookies } from "@/helper/verify_token";
import WorkspaceRepositoriesImpl from "@/repositories/workspace_repositories_impl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await verifyIDTokenFromRequestCookies(req);
    const result = await new WorkspaceRepositoriesImpl().getAllFromAuthor(
      decodedToken.uid
    );
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: Response) {
  try {
    const decodedToken = await verifyIDTokenFromRequestCookies(req);
    const { name } = await req.json();

    const result = await new WorkspaceRepositoriesImpl().create(
      name,
      decodedToken.uid
    );
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
