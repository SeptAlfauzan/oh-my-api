"use client";

import { WorkspaceItem } from "@/interfaces";
import Dialog from "@/widgets/dialog";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Input,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardTemplate from "../template";
import CreateCard from "./widgets/create_card";
import WorkSpaceCard from "./widgets/workspace_card";
import { useRouter } from "next/navigation";
export default function WorkspacePage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dummy: WorkspaceItem[] = [
    {
      id: "asdasdas",
      userId: "-",
      name: "Percobaan",
      lasEdited: "kemarin",
      numberEndpoints: 1,
      isActive: true,
    },
    {
      id: "asds",
      userId: "-",
      name: "Percobaan",
      lasEdited: "kemarin",
      numberEndpoints: 2,
      isActive: false,
    },
  ];

  return (
    <>
      <SimpleGrid columns={3} spacing={4}>
        <CreateCard onClick={onOpen} />
        {dummy.map((item, i) => (
          <WorkSpaceCard
            key={i}
            item={item}
            props={{
              _hover: { cursor: "pointer", background: "teal.100" },
              onClick: () => router.push(`/dashboard/workspaces/${item.id}`),
            }}
          />
        ))}
      </SimpleGrid>
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
    </>
  );
}
