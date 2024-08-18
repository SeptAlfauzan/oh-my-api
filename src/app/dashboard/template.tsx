"use client";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import DashboardContainer from "../widgets/dashboard_container";
import DashboardSidebar from "./dashboard_sidebar";

type Props = {
  children: ReactNode;
};
export default function DashboardTemplate({ children }: Props) {
  return (
    <Box display={"flex"} background={"gray.50"} minHeight={"100vh"} gap={10}>
      <DashboardSidebar />
      <DashboardContainer>{children}</DashboardContainer>
    </Box>
  );
}
