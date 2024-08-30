import { ApiEndpointOutput } from "@/interfaces";
import { copyToClipboard } from "@/utils/copy_clipboard";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { HttpMethod } from "@prisma/client";
import { useState } from "react";
import { MdCopyAll } from "react-icons/md";

type Props = {
  id: string;
  data: ApiEndpointOutput | undefined;
  editorData: string | null | undefined;
  onLoadingExecute: boolean;
  handleCopyClipBoard: () => Promise<void>;
  handleExecuteEndpoint: () => Promise<void>;
};

const DetailEndpointComponent: React.FC<Props> = ({
  id,
  data,
  editorData,
  onLoadingExecute,
  handleCopyClipBoard,
  handleExecuteEndpoint,
}) => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={4}>
      <Box
        background={"gray.50"}
        border="1px"
        px={4}
        py={2}
        rounded={"lg"}
        display={"flex"}
        alignItems={"center"}
      >
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

      <Box
        display={"flex"}
        gap={4}
        flex={1}
        position={"relative"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box>
          <Text>Status Code</Text>
          <Text fontWeight={"bold"}>200</Text>
        </Box>

        <Box height={300} flex={1}>
          <Text>Response</Text>
          <Box
            rounded={"lg"}
            width={"100%"}
            height={{ base: 300, md: "100%" }}
            overflow={"clip"}
          >
            <Editor
              theme="vs-dark"
              options={{
                readOnly: true,
              }}
              value={editorData || JSON.stringify(data?.jsonResponse)}
              defaultLanguage="json"
            />
          </Box>
        </Box>
      </Box>

      <Button
        width={{ md: 320, base: "auto" }}
        mt={10}
        onClick={handleExecuteEndpoint}
        disabled={onLoadingExecute}
        background={"black"}
        color={"white"}
        _hover={{
          color: "black",
          background: "gray.100",
        }}
      >
        {onLoadingExecute ? "Loading..." : "Execute endpoint"}
      </Button>
    </Box>
  );
};

export default DetailEndpointComponent;
