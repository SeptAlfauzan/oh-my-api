import EndpointsRepositoryImpl from "@/repositories/endpoint_repositories_impl";
import { HttpMethod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const endpointId = searchParams.get("id");
    if (endpointId == null) throw Error("Query id must be filled!");
    const result = await new EndpointsRepositoryImpl().getEndpointsJsonResponse(
      endpointId,
      HttpMethod.GET
    );
    const json = await (await fetch(result)).json();
    return NextResponse.json(json);
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
