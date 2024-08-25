import { EndpointItem } from "@/interfaces";
import EndpointsRepositoriesImpl from "@/repositories/endpoint_repositories_impl";
import { HttpMethod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const workspaceId = searchParams.get("workspaceId");

    const result = await new EndpointsRepositoriesImpl().getEndpoints(
      workspaceId!
    );
    return NextResponse.json({
      data: result,
    });
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const { jsonstr, workspaceId, desc, name, requestType } = await req.json();
    const uuid = v4();

    const httpMethod =
      HttpMethod[
        `${requestType}`.toLocaleUpperCase() as keyof typeof HttpMethod
      ];
    console.log(jsonstr, workspaceId, desc, name);
    if (httpMethod != HttpMethod.GET)
      throw Error("Currently Oh-My-API only support for GET request method 😢");

    const endpointItem: EndpointItem = {
      id: uuid,
      workspaceId: workspaceId,
      desc: desc,
      name: name,
      jsonResponseUrl: jsonstr,
      lastEdited: "",
      requestType: httpMethod,
    };
    console.log(endpointItem);

    const result = await new EndpointsRepositoriesImpl().createEndpoint(
      endpointItem,
      jsonstr
    );
    return NextResponse.json({ data: result });
  } catch (error) {
    const result = (error as Error).message;
    console.log(result);
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
