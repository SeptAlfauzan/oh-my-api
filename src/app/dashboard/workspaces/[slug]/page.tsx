"use client";
import { EndpointItem } from "@/interfaces";
import {
  Box,
  Button,
  List,
  Link,
  Text,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  Input,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import WorkspaceEndpointItem from "./widgets/workspace_endpoint_item";
import useSWR from "swr";
import Fetch from "@/helper/fetch";
import Dialog from "@/widgets/dialog";
import { useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [endpointToDelete, setEndpointToDelete] = useState<EndpointItem | null>(
    null
  );
  const { data, error, isLoading, mutate } = useSWR<EndpointItem[], Error, any>(
    `/api/endpoints?workspaceId=${params.slug}`,
    Fetch.getData
  );

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading...</Text>;

  const items = data ?? [];
  const handleTriggerDeleteDialog = (endpoint: EndpointItem) => {
    setEndpointToDelete(endpoint);
    onOpen();
  };
  const handleDeleteEndpoint = async (id: string) => {
    setLoading(true);
    try {
      await Fetch.delete(`/api/endpoints?id=${id}`);
      toast({
        title: `Delete endpoint success.`,
        description: "Successfully delete endpoint!",
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Delete endpoint fail.`,
        description: `Error: ${error}`,
        status: "info",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      onClose();
      setLoading(false);
      mutate();
    }
  };

  return (
    <Box>
      <List spacing={3} mb={12}>
        {items.length == 0 ? (
          <Text>No API endpoint has created yet</Text>
        ) : (
          items.map((item, i) => (
            <WorkspaceEndpointItem
              key={i}
              item={item}
              url={`/dashboard/workspaces/${params.slug}/endpoints/${item.id}`}
              openDeleteDialog={(endpoint) =>
                handleTriggerDeleteDialog(endpoint)
              }
            />
          ))
        )}
      </List>
      <Link
        href={`/dashboard/workspaces/${params.slug}/new`}
        position={"absolute"}
        bottom={4}
        right={4}
      >
        <Button
          color={"white"}
          _hover={{
            textColor: "black",
            background: "gray.200",
          }}
          background={"gray.700"}
          position={"fixed"}
          zIndex={2}
          bottom={4}
          right={4}
        >
          <Text>Create New Endpoint</Text>
        </Button>
      </Link>
      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            Hapus endpoint: {endpointToDelete?.name ?? "-"}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display="flex"
            flexDir="column"
            alignItems={"center"}
            py={4}
          >
            <Text fontWeight={"bold"}>
              Apakah anda yakin ingin menghapus endpoint:{" "}
              {endpointToDelete?.name ?? "-"}?
            </Text>
            <Text>
              Endpoint yang telah dihapus tidak akan bisa dikembalikan lagi
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button onClick={onClose}>Close</Button>
            <Button
              backgroundColor="black"
              color="white"
              _hover={{
                backgroundColor: "gray.100",
                color: "black",
              }}
              onClick={() => {
                handleDeleteEndpoint(endpointToDelete?.id ?? "-");
              }}
            >
              {loading ? "Deleting API..." : "Delete API"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </Box>
  );
}
