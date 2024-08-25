import { WorkspaceItem } from "@/interfaces";
import { Workspace } from "@prisma/client";

export default abstract class WorkspaceRepositories {
  abstract create(name: string, authorId: string): Promise<Workspace>;
  abstract delete(
    workspace: WorkspaceItem,
    authorId: string
  ): Promise<Workspace>;
  abstract getAllFromAuthor(authorId: string): Promise<WorkspaceItem[]>;
}
