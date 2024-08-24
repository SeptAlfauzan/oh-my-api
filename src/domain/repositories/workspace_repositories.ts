import { Workspace } from "@prisma/client";

export default abstract class WorkspaceRepositories {
  abstract create(name: string, authorId: string): Promise<Workspace>;
  abstract delete(workspace: Workspace, authorId: string): Promise<Workspace>;
  abstract getAllFromAuthor(authorId: string): Promise<Workspace[]>;
}
