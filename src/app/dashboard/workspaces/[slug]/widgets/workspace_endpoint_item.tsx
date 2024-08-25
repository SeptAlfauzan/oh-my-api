import { EndpointItem } from "@/interfaces";
import { Box, Button, Link, ListItem, Text } from "@chakra-ui/react";
import { HttpMethod } from "@prisma/client";
import { MdCopyAll } from "react-icons/md";

type Props = {
  item: EndpointItem;
};

export default function WorkspaceEndpointItem({ item }: Props) {
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

  return (
    <ListItem
      display={"flex"}
      alignItems={"center"}
      gap={4}
      background={"white"}
      padding={2}
      borderRadius={8}
    >
      <Link href={item.url} width={"100%"}>
        <Box display={"flex"} width={"100%"} alignItems={"center"} gap={4}>
          <Text width={20} color={colorType} fontWeight={"bold"}>
            {typeRequest}
          </Text>
          <Box>
            <Text noOfLines={1} textOverflow={"ellipsis"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Text>
            <Text
              fontSize={12}
              color={"gray.400"}
              noOfLines={1}
              textOverflow={"ellipsis"}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Text>
          </Box>
        </Box>
      </Link>
      <Button rightIcon={<MdCopyAll />} marginLeft={"auto"}>
        <Text display={{ base: "none", md: "block" }}>Copy URL</Text>
      </Button>
    </ListItem>
  );
}
