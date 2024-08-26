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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import CreateCard from "./widgets/create_card";
import WorkSpaceCard from "./widgets/workspace_card";
import { useRouter } from "next/navigation";
import Fetch from "@/helper/fetch";
import { useState } from "react";
import { Workspace } from "@prisma/client";

import useSWR from "swr";

export default function Page() {
  const { data, error, isLoading } = useSWR<WorkspaceItem[], Error, any>(
    "/api/workspaces",
    Fetch.getData
  );

  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [workspaceName, setWorkspaceName] = useState("");

  async function createWorkSpace() {
    try {
      const workspace = await Fetch.postData<Workspace>("/api/workspaces", {
        name: workspaceName,
      });
      onClose();
      toast({
        title: `New workspace ${workspaceName} is created!.`,
        description: "Successfully create new workspace!",
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      setWorkspaceName("");
    } catch (error) {
      const result = (error as Error).message;

      onClose();
      toast({
        title: `New workspace ${workspaceName} failed to created!.`,
        description: `Error: ${result}`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      setWorkspaceName("");
    }
  }

  if (error) return <Text>failed to load {error.message}</Text>;
  if (isLoading) return <Text>loading...</Text>;
  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        <CreateCard onClick={onOpen} />
        {(data ?? []).map((item, i) => (
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
          <AlertDialogHeader>Create new workspace</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
          >
            <Input
              placeholder="Input workspace name"
              onChange={(el) => setWorkspaceName(el.target.value)}
            />
          </AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button onClick={onClose}>Close</Button>
            <Button backgroundColor="teal.200" onClick={createWorkSpace}>
              Create Workspace
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </>
  );
}
