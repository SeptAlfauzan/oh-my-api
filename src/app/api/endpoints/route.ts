import ImageKitHelper from "@/helper/imagekit_helper";
import { EndpointItem } from "@/interfaces";
import EndpointsRepositoriesImpl from "@/repositories/endpoint_repositories_impl";
import { HttpMethod } from "@prisma/client";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { v4 } from "uuid";

export async function GET() {
  return NextResponse.json({
    hello: "this is endpoint",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { jsonstr, workspaceId, desc, name, requestType } = await req.json();
    const uuid = v4();

    const httpMethod =
      HttpMethod[
        `${requestType}`.toLocaleUpperCase() as keyof typeof HttpMethod
      ];
    const endpointItem: EndpointItem = {
      id: uuid,
      workspaceId: workspaceId,
      desc: desc,
      name: name,
      url: jsonstr,
      lastEdited: "",
      requestType: httpMethod,
    };
    const result = await new EndpointsRepositoriesImpl().createEndpoint(
      endpointItem,
      jsonstr
    );
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
