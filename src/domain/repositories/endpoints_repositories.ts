import { EndpointItem } from "@/interfaces";
import { ApiEndpoint, RequestBodyRule } from "@prisma/client";

export default abstract class EndpointsRepositories {
  abstract getEndpoints(workspaceId: string): Promise<ApiEndpoint[]>;
  abstract deleteEndpoint(endpointId: string): Promise<ApiEndpoint>;
  abstract updateEndpoint(endpoint: ApiEndpoint): Promise<ApiEndpoint>;
  abstract createEndpoint(
    endpointItem: EndpointItem,
    jsonResponseStr: string,
    requestBodyRules?: RequestBodyRule[]
  ): Promise<ApiEndpoint>;
}
