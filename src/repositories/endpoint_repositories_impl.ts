import EndpointsRepositories from "@/domain/repositories/endpoints_repositories";
import ImageKitHelper from "@/helper/imagekit_helper";
import { prisma } from "@/helper/prisma";
import { EndpointItem } from "@/interfaces";
import { ApiEndpoint, RequestBodyRule } from "@prisma/client";
import { v4 } from "uuid";

export default class EndpointsRepositoriesImpl
  implements EndpointsRepositories
{
  async getEndpoints(workspaceId: string): Promise<ApiEndpoint[]> {
    try {
      return await prisma.apiEndpoint.findMany({
        where: {
          workspace_id: workspaceId,
        },
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

      endpointItem.url = resultImagekit.url;

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
