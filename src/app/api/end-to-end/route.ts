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

    checkUseHeaderAuthorization(result, req);

    const json = await (await fetch(result.jsonResponseUrl)).json();
    return NextResponse.json(json);
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const endpointId = searchParams.get("id");
    if (endpointId == null) throw Error("Query id must be filled!");
    const result = await new EndpointsRepositoryImpl().getEndpointsJsonResponse(
      endpointId,
      HttpMethod.POST
    );
    checkUseHeaderAuthorization(result, req);

    const requestFields = result.requestBodyRules;
    const request = await req.json();

    console.log(requestFields);

    requestFields.forEach((requestField) => {
      console.log(request[requestField.field_name]);
      const requestBodyField = request[requestField.field_name];
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
          console.log("integer");
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
  } catch (error) {
    const result = (error as Error).message;
    return NextResponse.json({ error: result }, { status: 500 });
  }
}

function isBoolean(value?: string | number | boolean | null) {
  value = value?.toString().toLowerCase();
  return (
    value === "true" || value === "1" || value === "false" || value === "2"
  );
}

function checkUseHeaderAuthorization(api: ApiEndpointOutput, req: NextRequest) {
  console.log("use header authorization", api.useAuthorization);
  if (api.useAuthorization) {
    const tokenAuthorization = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    if (!tokenAuthorization)
      throw new Error("Must be pass header authorization!");
  }
}
