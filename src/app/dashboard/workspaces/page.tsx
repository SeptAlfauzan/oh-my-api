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
import { WorkspaceItem } from "@/interfaces";
export default function WorkspacePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dummy: WorkspaceItem[] = [
    {
      id: "asdasdas",
      name: "Percobaan",
      lasEdited: "kemarin",
      numberEndpoints: 1,
      isActive: true,
    },
    {
      id: "asdasdas",
      name: "Percobaan",
      lasEdited: "kemarin",
      numberEndpoints: 2,
      isActive: false,
    },
  ];

  return (
    <Box display={"flex"} background={"gray.50"} minHeight={"100vh"} gap={10}>
      <DashboardSidebar />
      <DashboardContainer>
        <SimpleGrid columns={3} spacing={4}>
          <CreateCard onClick={onOpen} />
          {dummy.map((item, i) => (
            <WorkSpaceCard
              key={i}
              item={item}
              props={{
                _hover: { cursor: "pointer", background: "teal.100" },
              }}
            />
          ))}
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
