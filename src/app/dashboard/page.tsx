"use client";

import DashboardContainer from "@/app/widgets/dashboard_container";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd, MdCreate, MdNewReleases, MdWarning } from "react-icons/md";
import Dialog from "@/widgets/dialog";
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
