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

export interface RequestBodyRuleOutput {
  id: string;
  field_name: string;
  field_type: FieldType;
  is_required: boolean;
  min_length?: number | null;
  max_length?: number | null;
  pattern?: string | null;
}

export interface ApiEndpointOutput {
  id: string;
  name: string;
  desc?: string | null;
  httpMethod: HttpMethod;
  jsonResponseFileId: string;
  jsonResponseUrl: string;
  useAuthorization: boolean;
  jsonResponse: string | null;
  createdAt: Date;
  requestBodyRules: RequestBodyRuleOutput[];
}
