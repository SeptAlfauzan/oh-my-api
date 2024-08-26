import DashboardClientRepository from "@/domain/repositories/dashboard_client_repository";
import { prisma } from "@/helper/prisma";
import { DashboardClientItem } from "@/interfaces";

export default class DashboardClientRepositoryImpl
  implements DashboardClientRepository
{
  async getDashboardData(authorId: string): Promise<DashboardClientItem> {
    try {
      const workspaces = await prisma.workspace.findMany({
        where: {
          author_id: authorId,
        },
        select: {
          id: true,
          name: true,
          last_edited: true,
          api_endpoints: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            select: {
              createdAt: true,
            },
          },
          _count: {
            select: {
              api_endpoints: true,
            },
          },
        },
        orderBy: {
          last_edited: "desc",
        },
      });
      const processedWorkspaces = workspaces.map((workspace) => ({
        workspace_name: workspace.name,
        last_endpoint_created:
          workspace.api_endpoints[0]?.createdAt.toString() ||
          "No endpoint is created yet!",
        last_workspace_created: workspace.last_edited.toString(),
        endpoints_count: workspace._count.api_endpoints,
        workspaces_count: 0,
      }));

      const finalProcessedWorkspace = processedWorkspaces.reduce(
        (acc, workspace) => {
          acc.workspaces_count++;

          if (workspace.last_endpoint_created > acc.last_endpoint_created) {
            (acc.last_endpoint_created = workspace.last_endpoint_created),
              toString();
          }
          if (workspace.last_workspace_created > acc.last_workspace_created) {
            acc.last_workspace_created = workspace.last_workspace_created;
          }
          // Add to total endpoints count
          acc.endpoints_count += workspace.endpoints_count;
          return acc;
        },
        {
          workspaces_count: 0,
          last_workspace_created: "",
          endpoints_count: 0,
          last_endpoint_created: "",
        }
      );
      console.log(processedWorkspaces);
      console.log("PROCESS FINAL");
      console.log(finalProcessedWorkspace);

      return finalProcessedWorkspace as DashboardClientItem;
    } catch (error) {
      throw error;
    }
  }
}
