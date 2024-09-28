import { ApiEndpointOutput } from "@/interfaces";
import { Box, Button, Text } from "@chakra-ui/react";
import { MdCopyAll } from "react-icons/md";

type PropsEndpointUrl = {
  handleCopyClipBoard: () => void;
  colorRequestMethod: string;
  data: ApiEndpointOutput | undefined;
  id: string;
};
export default function EndpointUrl({
  handleCopyClipBoard,
  colorRequestMethod,
  id,
  data,
}: PropsEndpointUrl) {
  return (
    <Box my={8}>
      <Text mb={2}>Endpoint Url</Text>
      <Box
        background={"gray.50"}
        border="1px"
        px={4}
        py={2}
        rounded={"lg"}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <Text fontWeight={"bold"} color={colorRequestMethod}>
          {data?.httpMethod}
        </Text>
        <Text flex={1} textOverflow={"ellipsis"} noOfLines={1}>
          {window.location.origin}/api/end-to-end?id={id}
        </Text>
        <Button
          rightIcon={<MdCopyAll />}
          marginLeft={"auto"}
          onClick={handleCopyClipBoard}
        >
          <Text display={{ base: "none", md: "block" }}>Copy URL</Text>
        </Button>
      </Box>
    </Box>
  );
}
