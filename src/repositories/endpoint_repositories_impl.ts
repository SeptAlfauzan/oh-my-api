import EndpointsRepository from "@/domain/repositories/endpoints_repository";
import ImageKitHelper from "@/helper/imagekit_helper";
import { prisma } from "@/helper/prisma";
import { EndpointItem } from "@/interfaces";
import { ApiEndpoint, HttpMethod, RequestBodyRule } from "@prisma/client";
import { v4 } from "uuid";

export default class EndpointsRepositoryImpl implements EndpointsRepository {
  async getEndpointsJsonResponse(
    workspaceId: string,
    requsetType: HttpMethod
  ): Promise<string> {
    try {
      const result = await prisma.apiEndpoint.findFirst({
        where: {
          id: workspaceId,
          httpMethod: requsetType,
        },
      });
      const jsonUrl = result?.jsonResponseUrl;
      if (jsonUrl == null) throw Error("Invalid json response");
      return jsonUrl;
    } catch (error) {
      throw error;
    }
  }
  async getEndpoints(workspaceId: string): Promise<EndpointItem[]> {
    try {
      const result = await prisma.apiEndpoint.findMany({
        where: {
          workspace_id: workspaceId,
        },
      });
      return result.map((item) => {
        return {
          id: item.id,
          workspaceId: item.workspace_id,
          desc: item.desc,
          name: item.name,
          jsonResponseUrl: item.jsonResponseUrl,
          lastEdited: item.createdAt.toString(),
          requestType: item.httpMethod,
        } as EndpointItem;
      });
    } catch (error) {
      throw error;
    }
  }
  deleteEndpoint(endpointId: string): Promise<ApiEndpoint> {
    throw new Error("Method not implemented.");
  }
  updateEndpoint(endpoint: ApiEndpoint): Promise<ApiEndpoint> {
    throw new Error("Method not implemented.");
  }
  async createEndpoint(
    endpointItem: EndpointItem,
    jsonResponseStr: string,
    requestBodyRules?: RequestBodyRule[]
  ): Promise<ApiEndpoint> {
    try {
      const uuid = v4();
      const fileName = `${uuid}.json`;
      const imageKitHelper = ImageKitHelper.getInstance();

      const resultImagekit = await imageKitHelper.uploadJsonString(
        jsonResponseStr,
        fileName
      );

      endpointItem.jsonResponseUrl = resultImagekit.url;

      const result = await prisma.apiEndpoint.create({
        data: {
          id: uuid,
          name: endpointItem.name,
          desc: endpointItem.desc,
          workspace_id: endpointItem.workspaceId,
          jsonResponseUrl: resultImagekit.url,
          httpMethod: endpointItem.requestType,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
