import DashboardClientRepository from "@/domain/repositories/dashboard_client_repository";
import { verifyIDTokenFromRequestCookies } from "@/helper/verify_token";
import DashboardClientRepositoryImpl from "@/repositories/dashborad_client_repository_impl";
import WorkspaceRepositoryImpl from "@/repositories/workspace_repositories_impl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await verifyIDTokenFromRequestCookies(req);
    const result = await new DashboardClientRepositoryImpl().getDashboardData(
      decodedToken.uid
    );
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
