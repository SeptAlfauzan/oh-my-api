import { ReactNode } from "react";

export interface SidebarItem {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  isSeparator: boolean;
}

export interface WorkspaceItem {
  id: string;
  userId: string;
  name: string;
  lasEdited: string;
  numberEndpoints: number;
  isActive: boolean;
}

export interface EndpointItem {
  id: string;
  workspaceId: string;
  desc: string;
  name: string;
  lastEdited: string;
  requestType: RequestType;
}

export enum RequestType {
  GET,
  POST,
  PUT,
  DELETE,
}
