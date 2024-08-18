"use client";

import DashboardContainer from "@/app/widgets/dashboard_container";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DashboardSidebar from "./dashboard_sidebar";
export default function Dashboard() {
  return (
    <Box
      display={"flex"}
      background={"gray.50"}
      minHeight={"100vh"}
      paddingTop={4}
      gap={10}
    >
      <DashboardSidebar />
      <DashboardContainer>
        <SimpleGrid columns={3} spacing={4}></SimpleGrid>
      </DashboardContainer>
    </Box>
  );
}
