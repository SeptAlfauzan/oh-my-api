import { ReactNode } from "react";

export interface SidebarItem {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  isSeparator: boolean;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  lasEdited: string;
  numberEndpoints: number;
  isActive: boolean;
}
