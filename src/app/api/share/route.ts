import { EndpointItem } from "@/interfaces";
import EndpointsRepositoryImpl from "@/repositories/endpoint_repositories_impl";
import { HttpMethod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const endpointId = searchParams.get("endpointId");

    if (endpointId) {
      const result = await new EndpointsRepositoryImpl().getEndpoint(
        endpointId!
      );

      const json = await (await fetch(result.jsonResponseUrl)).json();
      result.jsonResponse = json;

      return NextResponse.json({
        data: result,
      });
    }
    throw Error("No endpoint id!");
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
