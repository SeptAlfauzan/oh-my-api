"use client";
import Fetch from "@/helper/fetch";
import { ApiEndpointOutput } from "@/interfaces";
import { copyToClipboard } from "@/utils/copy_clipboard";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { HttpMethod } from "@prisma/client";
import { useState } from "react";
import { MdCopyAll } from "react-icons/md";
import useSWR from "swr";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const toast = useToast();
  const { data, error, isLoading } = useSWR<ApiEndpointOutput, Error, any>(
    `/api/endpoints?endpointId=${params.id}`,
    Fetch.getData
  );
  const [editorData, setEditorData] = useState<string | null | undefined>(null);
  const [onLoadingExecute, setonLoadingExecute] = useState(false);

  async function handleCopyClipBoard() {
    try {
      await copyToClipboard({
        message: "-",
        value: `http://localhost:3000/api/end-to-end?id=${params.id}`,
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

  if (error) return <Text>Failed to load {error.message}</Text>;
  if (isLoading) return <Text>Loading endpoint details...</Text>;

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
          http://localhost:3000/api/end-to-end?id={params.id}
        </Text>
        <Button
          rightIcon={<MdCopyAll />}
          marginLeft={"auto"}
          onClick={async (_) => await handleCopyClipBoard()}
        >
          <Text display={{ base: "none", md: "block" }}>Copy URL</Text>
        </Button>
      </Box>

      <Box display={"flex"} gap={4} flexDir={{ base: "column", md: "row" }}>
        <Box>
          <Text>Status Code</Text>
          <Text fontWeight={"bold"}>200</Text>
        </Box>

        <Box height={300} flex={1}>
          <Text>Response</Text>
          <Box rounded={"lg"} width={"100%"} height={"100%"} overflow={"clip"}>
            <Editor
              // theme="vs-dark"
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
        mt={10}
        onClick={async () => {
          setonLoadingExecute(true);
          try {
            let result;
            switch (data?.httpMethod) {
              case HttpMethod.GET:
                result = await Fetch.getDataRaw(
                  `http://localhost:3000/api/end-to-end?id=${params.id}`
                );
                break;
              default:
                throw new Error("Other HTTP method is not implementaed yet :(");
            }
            if (result) setEditorData(JSON.stringify(result));
          } catch (error) {
            toast({
              title: "Executing request failed.",
              description: "Request fail!",
              status: "error",
              position: "top-right",
              duration: 2000,
              isClosable: true,
            });
          } finally {
            setonLoadingExecute(false);
          }
        }}
        disabled={onLoadingExecute}
      >
        {onLoadingExecute ? "Loading..." : "Execute endpoint"}
      </Button>
    </Box>
  );
}
