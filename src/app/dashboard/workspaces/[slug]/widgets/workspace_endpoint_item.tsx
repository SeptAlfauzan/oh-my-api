import { EndpointItem } from "@/interfaces";
import { copyToClipboard } from "@/utils/copy_clipboard";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HttpMethod } from "@prisma/client";
import Link from "next/link";
import { MdCopyAll, MdDelete, MdShare } from "react-icons/md";

type Props = {
  item: EndpointItem;
  openDeleteDialog: (endpoint: EndpointItem) => void;
  url: string;
};

export default function WorkspaceEndpointItem({
  item,
  url,
  openDeleteDialog,
}: Props) {
  const toast = useToast();

  let typeRequest = "";
  let colorType = "gray.200";
  switch (item.requestType) {
    case HttpMethod.GET:
      typeRequest = "GET";
      colorType = "green.400";
      break;
    case HttpMethod.POST:
      typeRequest = "POST";
      colorType = "orange.400";
      break;
    case HttpMethod.PUT:
      typeRequest = "PUT";
      colorType = "blue.400";
      break;
    case HttpMethod.DELETE:
      typeRequest = "DELETE";
      colorType = "red.400";
      break;
    default:
      break;
  }

  const handleCopyUrl = async () => {
    {
      try {
        await copyToClipboard({
          message: "-",
          value: `${window.location.origin}/api/end-to-end?id=${item.id}`,
        });
        toast({
          title: "End to end endpoint url is copied!.",
          description: "Copy success!!",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "End to end endpoint url failed to copy!.",
          description: "Copy fail!!",
          status: "error",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };
  const handleCopyShareUrl = async () => {
    {
      try {
        await copyToClipboard({
          message: "-",
          value: `${window.location.origin}/share/${item.id}`,
        });
        toast({
          title: "Share url from en to end endpoint is copied!.",
          description: "Copy success!!",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Share url from en to end endpoint is failed to copy!.",
          description: "Copy fail!!",
          status: "error",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <ListItem
      display={"flex"}
      alignItems={"center"}
      gap={2}
      background={"white"}
      padding={2}
      borderRadius={8}
    >
      <Box width={"100%"}>
        <Link href={url}>
          <Box display={"flex"} width={"100%"} alignItems={"center"} gap={4}>
            <Text width={20} color={colorType} fontWeight={"bold"}>
              {typeRequest}
            </Text>
            <Box>
              <Text noOfLines={1} textOverflow={"ellipsis"}>
                {item.name}
              </Text>
              <Text
                fontSize={12}
                color={"gray.400"}
                noOfLines={1}
                textOverflow={"ellipsis"}
              >
                {item.desc}
              </Text>
            </Box>
          </Box>
        </Link>
      </Box>
      <IconButton
        onClick={() => {
          openDeleteDialog(item);
        }}
        icon={<MdDelete color="red" />}
        aria-label={""}
      />
      <IconButton
        onClick={() => {
          handleCopyShareUrl();
        }}
        icon={<MdShare color="black" />}
        aria-label={""}
      />
      <Button
        rightIcon={<MdCopyAll />}
        marginLeft={"auto"}
        onClick={handleCopyUrl}
      >
        <Text display={{ base: "none", md: "block" }} fontSize="8">
          Copy API URL
        </Text>
      </Button>
    </ListItem>
  );
}
