import WorkspaceRepositories from "@/domain/repositories/workspace_repositories";
import { prisma } from "@/helper/prisma";
import { Workspace } from "@prisma/client";
import { getAuth } from "firebase/auth";

export default class WorkspaceRepositoriesImpl
  implements WorkspaceRepositories
{
  async getAllFromAuthor(authorId: string): Promise<Workspace[]> {
    try {
      if (authorId == null) throw new Error("User id is null!");
      const workspaces = await prisma.workspace.findMany({
        where: {
          author_id: authorId,
        },
      });
      return workspaces;
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
  delete(workspace: Workspace): Promise<Workspace> {
    throw new Error("Method not implemented.");
  }
}
