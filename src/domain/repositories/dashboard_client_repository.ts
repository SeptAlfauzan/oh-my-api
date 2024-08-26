import { DashboardClientItem, WorkspaceItem } from "@/interfaces";
import { Workspace } from "@prisma/client";

export default abstract class DashboardClientRepository {
  abstract getDashboardData(authorId: string): Promise<DashboardClientItem>;
}
