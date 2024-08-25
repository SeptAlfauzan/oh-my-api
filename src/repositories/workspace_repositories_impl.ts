import WorkspaceRepositories from "@/domain/repositories/workspace_repositories";
import { prisma } from "@/helper/prisma";
import { WorkspaceItem } from "@/interfaces";
import { Workspace } from "@prisma/client";

export default class WorkspaceRepositoriesImpl
  implements WorkspaceRepositories
{
  delete(workspace: WorkspaceItem, authorId: string): Promise<Workspace> {
    throw new Error("Method not implemented.");
  }
  async getAllFromAuthor(authorId: string): Promise<WorkspaceItem[]> {
    try {
      if (authorId == null) throw new Error("User id is null!");
      const workspaces = await prisma.workspace.findMany({
        where: {
          author_id: authorId,
        },
        include: {
          _count: {
            select: { api_endpoints: true },
          },
        },
      });

      const workspaceItems: WorkspaceItem[] = workspaces.map((item) => {
        return {
          id: item.id,
          name: item.name,
          numberEndpoints: item._count.api_endpoints,
          lasEdited: item.last_edited.toString(),
        };
      });
      return workspaceItems;
    } catch (error) {
      throw error;
    }
  }
  async create(name: string, authorId: string): Promise<Workspace> {
    try {
      if (authorId == null) throw new Error("User id is null!");
      const workspace = await prisma.workspace.create({
        data: {
          name: name,
          author_id: authorId,
        },
      });
      return workspace;
    } catch (error) {
      throw error;
    }
  }
}
