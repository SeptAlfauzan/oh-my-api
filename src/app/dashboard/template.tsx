// "use client";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import DashboardContainer from "../widgets/dashboard_container";
import DashboardSidebar from "./dashboard_sidebar";
import { cookies } from "next/headers";

type Props = {
  children: ReactNode;
};
export default function DashboardTemplate({ children }: Props) {
  // const setCookies = async (key: string, value: string) => {
  //   "use server"; // mark function as a server action (fixes the error)
  //   const token = value;
  //   cookies().set("jwt-token", token, { secure: true });
  // };
  return (
    <Box display={"flex"} background={"gray.50"} minHeight={"100vh"} gap={10}>
      <DashboardSidebar />
      <DashboardContainer>{children}</DashboardContainer>
    </Box>
  );
}
