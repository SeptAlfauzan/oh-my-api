import { HttpMethod, FieldType } from "@prisma/client";
import { ReactNode } from "react";

export interface SidebarItem {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  isSeparator: boolean;
}

export type WorkspaceItem = {
  id: string;
  name: string;
  lasEdited: string;
  numberEndpoints: number;
};

export type EndpointItem = {
  id: string;
  workspaceId: string;
  desc: string;
  name: string;
  jsonResponseUrl: string;
  lastEdited: string;
  useHeaderAuthorization: boolean;
  requestType: HttpMethod;
};

export type DashboardClientItem = {
  workspaces_count: number;
  endpoints_count: number;
  last_workspace_created: string;
  last_endpoint_created: string;
};

export type RequestBodyFieldRule = {
  name: string | undefined;
  dataType: FieldType | undefined;
};
