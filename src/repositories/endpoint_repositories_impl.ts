import EndpointsRepository from "@/domain/repositories/endpoints_repository";
import ImageKitHelper from "@/helper/imagekit_helper";
import { prisma } from "@/helper/prisma";
import {
  ApiEndpointOutput,
  EndpointItem,
  RequestBodyFieldRule,
} from "@/interfaces";
import {
  ApiEndpoint,
  FieldType,
  HttpMethod,
  RequestBodyRule,
} from "@prisma/client";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { v4 } from "uuid";

export default class EndpointsRepositoryImpl implements EndpointsRepository {
  async getEndpoint(endpointId: string): Promise<ApiEndpointOutput> {
    try {
      const result = await prisma.apiEndpoint.findFirst({
        where: {
          id: endpointId,
        },
        include: {
          requestBodyRules: true,
        },
      });

      if (result == null) throw Error("Invalid endpoint id!");

      return result;
    } catch (error) {
      throw error;
    }
  }
  async getEndpointsJsonResponse(
    workspaceId: string,
    requsetType: HttpMethod
  ): Promise<ApiEndpointOutput> {
    try {
      const result = await prisma.apiEndpoint.findFirst({
        where: {
          id: workspaceId,
          httpMethod: requsetType,
        },
        include: {
          requestBodyRules: true,
        },
      });
      const jsonUrl = result?.jsonResponseUrl;
      if (jsonUrl == null) throw Error("Invalid json response");
      return result!;
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
    requestBodyRules?: RequestBodyFieldRule[]
  ): Promise<ApiEndpoint> {
    let resultImagekit: UploadResponse;
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
          useAuthorization: true,
          httpMethod: endpointItem.requestType,
        },
      });

      console.log("requestBodyRules", requestBodyRules);
      if (requestBodyRules) {
        const requestBodyRulesPrisma: RequestBodyRule[] = requestBodyRules.map(
          (e) => {
            return {
              api_endpoint_id: uuid,
              field_name: e.name,
              field_type: e.dataType,
              is_required: true,
            } as RequestBodyRule;
          }
        );
        await prisma.requestBodyRule.createMany({
          data: requestBodyRulesPrisma,
        });
      }

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
