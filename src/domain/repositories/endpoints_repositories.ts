import { EndpointItem } from "@/interfaces";
import { ApiEndpoint, HttpMethod, RequestBodyRule } from "@prisma/client";

export default abstract class EndpointsRepositories {
  abstract getEndpointsJsonResponse(
    endpointId: string,
    requsetType: HttpMethod
  ): Promise<string>;
  abstract getEndpoints(workspaceId: string): Promise<EndpointItem[]>;
  abstract deleteEndpoint(endpointId: string): Promise<ApiEndpoint>;
  abstract updateEndpoint(endpoint: ApiEndpoint): Promise<ApiEndpoint>;
  abstract createEndpoint(
    endpointItem: EndpointItem,
    jsonResponseStr: string,
    requestBodyRules?: RequestBodyRule[]
  ): Promise<ApiEndpoint>;
}
