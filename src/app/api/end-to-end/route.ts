import { ApiEndpointOutput } from "@/interfaces";
import EndpointsRepositoryImpl from "@/repositories/endpoint_repositories_impl";
import { FieldType, HttpMethod } from "@prisma/client";
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

    if (result.useAuthorization) {
      const tokenAuthorization = req.headers
        .get("Authorization")
        ?.replace("Bearer ", "");
      if (!tokenAuthorization) {
        return NextResponse.json(
          { statusText: "Must be use header authorization" },
          { status: 401 }
        );
      }
      if (!req.headers.get("Authorization")?.includes("Bearer"))
        return NextResponse.json(
          { statusText: "Token authorization is in invalid format!" },
          {
            status: 401,
            statusText: "Token authorization is in invalid format!",
          }
        );
    }

    const json = await (await fetch(result.jsonResponseUrl)).json();
    return NextResponse.json(json);
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handleApiWithRequestBody(req);
  } catch (error) {
    console.log("===== ERROR =====", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { statusText: error.message },
        { status: 500, statusText: error.message }
      );
    }
    return NextResponse.json({ statusText: error }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try{
    console.log(req);
    return await handleApiWithRequestBody(req);
  } catch (error) {
    console.log("===== ERROR =====", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { statusText: error.message },
        { status: 500, statusText: error.message }
      );
    }
    return NextResponse.json({ statusText: error }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  try{
    console.log(req);
    return await handleApiWithRequestBody(req);
  } catch (error) {
    console.log("===== ERROR =====", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { statusText: error.message },
        { status: 500, statusText: error.message }
      );
    }
    return NextResponse.json({ statusText: error }, { status: 500 });
  }
}

async function handleApiWithRequestBody(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const endpointId = searchParams.get("id");
    if (endpointId == null) throw Error("Query id must be filled!");
    
    let requestMethod;
    switch (req.method) {
      case 'POST':
        requestMethod = HttpMethod.POST;
        break;
      case 'PUT':
        requestMethod = HttpMethod.PUT;
        break;
      case 'PATCH':
        requestMethod = HttpMethod.PATCH;
        break;
      default:
        throw Error("Invalid http request method!");
    }

    const result = await new EndpointsRepositoryImpl().getEndpointsJsonResponse(
      endpointId,
      requestMethod
    );

    if (result.useAuthorization) {
      const tokenAuthorization = req.headers
        .get("Authorization")
        ?.replace("Bearer ", "");
      if (!tokenAuthorization) {
        return NextResponse.json(
          { statusText: "Must be use header authorization" },
          { status: 401 }
        );
      }
      if (!req.headers.get("Authorization")?.includes("Bearer"))
        return NextResponse.json(
          { statusText: "Token authorization is in invalid format!" },
          { status: 401 }
        );
    }

    const requestFields = result.requestBodyRules;

    const containTypeFile =
      requestFields.filter((item) => item.field_type == FieldType.FILE).length >
      0;

    const request: FormData | any = containTypeFile
      ? await req.formData()
      : await req.json();

    requestFields.forEach((requestField) => {
      const requestBodyField = containTypeFile
        ? request.get(requestField.field_name)
        : request[requestField.field_name];

      if (requestBodyField == undefined)
        throw new Error(`Field '${requestField.field_name}' is required!`);
      switch (requestField.field_type) {
        case FieldType.BOOLEAN:
          if (!isBoolean(requestBodyField))
            throw new Error(
              `Field '${requestField.field_name}' value must be a boolean`
            );
          break;
        case FieldType.INTEGER:
          if (isNaN(Number(requestBodyField)))
            throw new Error(
              `Field '${requestField.field_name}' value must be a integer`
            );
          break;
        case FieldType.DOUBLE:
          if (isNaN(Number(requestBodyField)))
            throw new Error(
              `Field '${requestField.field_name}' value must be a double`
            );
          break;
        case FieldType.FILE:
          if ((requestBodyField as File).name == "")
            throw new Error(
              `Field '${requestField.field_name}' value must be a file`
            );
          break;
        case FieldType.TEXT:
          if (
            !(
              typeof requestBodyField === "string" ||
              requestBodyField instanceof String
            )
          )
            throw new Error(
              `Field '${requestField.field_name}' value must be a string`
            );
          break;
        default:
          break;
      }
    });
    const json = await (await fetch(result.jsonResponseUrl)).json();
    return NextResponse.json(json);
}


function isBoolean(value?: string | number | boolean | null) {
  value = value?.toString().toLowerCase();
  return (
    value === "true" || value === "1" || value === "false" || value === "2"
  );
}

function checkUseHeaderAuthorization(
  api: ApiEndpointOutput,
  req: NextRequest
): NextResponse | undefined {
  if (api.useAuthorization) {
    const tokenAuthorization = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    if (!tokenAuthorization) {
      return NextResponse.json(
        { statusText: "Must be use header authorization" },
        { status: 401 }
      );
    }
  }
}
