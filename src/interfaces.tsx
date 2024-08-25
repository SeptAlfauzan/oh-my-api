import { HttpMethod } from "@prisma/client";
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
  requestType: HttpMethod;
};
