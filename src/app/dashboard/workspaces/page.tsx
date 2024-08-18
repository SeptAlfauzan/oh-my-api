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
import CreateCard from "./widgets/create_card";
import WorkSpaceCard from "./widgets/workspace_card";
import DashboardSidebar from "../dashboard_sidebar";
import Dialog from "@/widgets/dialog";
export default function WorkspacePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <SimpleGrid columns={3} spacing={4}>
          <WorkSpaceCard />
          <CreateCard onClick={onOpen} />
        </SimpleGrid>
      </DashboardContainer>

      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>Error when signin</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
          >
            <Input placeholder="Input workspace name" />
          </AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button onClick={onClose}>Close</Button>
            <Button backgroundColor="teal.200">Create Workspace</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </Box>
  );
}
