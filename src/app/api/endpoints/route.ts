import { EndpointItem } from "@/interfaces";
import EndpointsRepositoryImpl from "@/repositories/endpoint_repositories_impl";
import { HttpMethod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const workspaceId = searchParams.get("workspaceId");
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

    const result = await new EndpointsRepositoryImpl().getEndpoints(
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
    const {
      jsonstr,
      workspaceId,
      desc,
      name,
      requestType,
      requestbodyFields,
      useHeaderAuthorization,
    } = await req.json();
    const uuid = v4();

    const httpMethod =
      HttpMethod[
        `${requestType}`.toLocaleUpperCase() as keyof typeof HttpMethod
      ];
    // console.log(jsonstr, workspaceId, desc, name);
    // if (httpMethod != HttpMethod.GET)
    //   console.log("useHeaderAuthorization", useHeaderAuthorization);
    // return NextResponse.json(
    //   { error: "Currently Oh-My-API only support for GET request method 😢" },
    //   { status: 500 }
    // );

    const endpointItem: EndpointItem = {
      id: uuid,
      workspaceId: workspaceId,
      desc: desc,
      name: name,
      jsonResponseUrl: jsonstr,
      lastEdited: "",
      requestType: httpMethod,
      useHeaderAuthorization: useHeaderAuthorization,
    };

    console.log("REQUEST", endpointItem);
    const result = await new EndpointsRepositoryImpl().createEndpoint(
      endpointItem,
      jsonstr,
      requestbodyFields
    );
    return NextResponse.json({ data: result });
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}
