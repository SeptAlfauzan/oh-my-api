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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  filter,
} from "@chakra-ui/react";
import WorkspaceEndpointItem from "./widgets/workspace_endpoint_item";
import useSWR from "swr";
import Fetch from "@/helper/fetch";
import Dialog from "@/widgets/dialog";
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { CloseIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { HttpMethod } from "@prisma/client";
import { MdCheck } from "react-icons/md";

export default function Page({ params }: { params: { slug: string } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterMethodType, setFilterMethodType] = useState<HttpMethod[]>([]);

  const toast = useToast();

  const [endpointToDelete, setEndpointToDelete] = useState<EndpointItem | null>(
    null
  );
  const { data, error, isLoading, mutate } = useSWR<EndpointItem[], Error, any>(
    `/api/endpoints?workspaceId=${params.slug}`,
    Fetch.getData
  );
  const [filteredItems, setFilteredItems] = useState<EndpointItem[]>([]);


  useEffect(() => {
    if (data) {
      const filtered =
        search || filterMethodType.length > 0
          ? data.filter((item) => {
              const findExact = item.name
                .toLowerCase()
                .includes(search.toLowerCase());

              if (filterMethodType.length > 0)
                return findExact && filterMethodType.includes(item.requestType);

              return findExact;
            })
          : data;

      setFilteredItems(filtered);
    }
  }, [search, data, filterMethodType]);

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading...</Text>;

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
        <Box display={"flex"} flex={1} flexDir={"column"} mb="8">
          <InputGroup width={{ lg: "55%", base: "100%" }} mb={4}>
            <InputRightElement>
              {search ? (
                <CloseIcon
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => setSearch("")}
                />
              ) : (
                <SearchIcon color="black" />
              )}
            </InputRightElement>
            <Input
              bg={"white"}
              value={search}
              placeholder="Search endpoint name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
 
          <Text>Filter by</Text>
          <Box display={"flex"} flex={1} gap={2}>
            {Object.values(HttpMethod).map((httpMethod) => (
              <Button
                key={httpMethod}
                onClick={() => {
                  const index = filterMethodType.indexOf(httpMethod);
                  const filtered = [...filterMethodType];
                  filterMethodType.includes(httpMethod)
                    ? filtered.splice(index, 1)
                    : filtered.push(httpMethod);
                  setFilterMethodType(filtered);
                  console.log(filterMethodType);
                }}
                rightIcon={
                  filterMethodType.includes(httpMethod) ? <MdCheck /> : <Box />
                }
                colorScheme="blue"
                bg={filterMethodType.includes(httpMethod) ? "blue.50" : "white"}
                variant="outline"
                rounded={"xl"}
              >
                {httpMethod}
              </Button>
            ))}
          </Box>
        </Box>

      <List spacing={3} mb={12}>
        {filteredItems.length == 0 ? (
          <Text>No API endpoint :(</Text>
        ) : (
          filteredItems.map((item, i) => (
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
            textColor: "bgray.700",
            background: "gray.200",
          }}
          background={"black"}
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
